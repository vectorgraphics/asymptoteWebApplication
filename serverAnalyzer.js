import { writeFile, appendFile } from "fs/promises";
import { existsSync, unlinkSync } from "fs";
import { spawn, execSync } from "child_process";
import express from "express";
import { createUCID, usrDirMgr, makeDir, removeDir, dateTime, writePing, getRequest, FLAGS } from "./serverUtil.js";

const serverTimeout = 60000;
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%          Set of Middleware
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function reqTypeRouter() {
  return (req, res, next) => {
    if (req.is("application/json") === "application/json") {
      return express.json()(req, res, next);
    } else if (req.get("Content-Type").includes("application/x-www-form-urlencoded")) {
      return express.urlencoded({extended: true})(req, res, next);
    }
  }
}
// ------------------------------------------------
export const usrConnect = (serverDir) => {
  return (req, res, next) => {
    if (req.body.reqType === "usrConnect") {
      let ucid = createUCID(req.ip);
      // getRequest(req.ip);
      if (ucid !== "-1") {
        var reqDest = usrDirMgr(req, serverDir, ucid);
        makeDir(reqDest.usrAbsDirPath);
      } else {
        reqDest = usrDirMgr(req, serverDir, "");
      }
      const asyVersion = execSync("asy -c VERSION", {
        timeout: 500,
        encoding: "ascii"
      })
      const dateAndTime = dateTime();
      const rawData = {
        usrIP: req.ip,
        usrDir: reqDest.usrDirName,
        date: dateAndTime.date,
        time: dateAndTime.time,
      };

      const logFilePath = serverDir + "/logs/log";
      appendFile(logFilePath, JSON.stringify(rawData, null, "\n") + "\n")
      .then(() => console.log("log file successfully created."))
      .catch((err) => console.log(`An error occurred while writing log file!\n ${err.toString()}`));

      const data = {
        uniqueClientID: ucid,
        usrConnectStatus: "UDIC",
        asyVersion: asyVersion,
      }

      res.send(data);
    } else {
      next();
    }
  }
};
// ------------------------------------------------
export const reqAnalyzer = (serverDir) => {
  return (req, res, next) => {
    const reqDest = usrDirMgr(req, serverDir, req.body.UCID);
    const codeFilename = `${req.body.workspaceName}_${req.body.workspaceId}-${req.body.parentModule}`;
    const codeFile = codeFilename + ".asy";
    req.body = {
      ...req.body,
      ...reqDest,
      codeFilename: codeFilename,
      codeFile: codeFile,
      codeFilePath: reqDest.usrAbsDirPath + "/" + codeFile,
      htmlFile: reqDest.usrAbsDirPath + "/" + codeFilename + ".html",
    };

    if (req.body.argv !== undefined) {
      req.body.argv = JSON.parse('{"' + decodeURI(req.body.argv).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') +'"}');
    }

    // console.log("modified req.body:\n", req.body);
    next();
  };
};
// ------------------------------------------------
export const delAnalyzer = (serverDir) => {
  return (req, res, next) => {
    let requestAndId = /(\w+)&(\w+)/gi.exec(req.body);
    if (requestAndId[1] === "deleteReq") {
      const reqDest = usrDirMgr(req, serverDir, requestAndId[2]);
      if (existsSync(reqDest.usrAbsDirPath)) {
        removeDir(reqDest.usrAbsDirPath);
      } else {
        res.send(null);
      }
    } else {
      res.send(null);
    }
  };
};
// ------------------------------------------------
export const writeAsyFile = () => {
  return (req, res, next) => {
    const filePath = req.body.codeFilePath;
    const fileContent = req.body.currentCode;
    if (req.body.reqType === "run") {
      writeFile(filePath, fileContent).then(() => {
        next();
      }).catch((err) => res.send(outputMaker("FAILURE", "ASY_WRITE_FILE_ERR", FLAGS)(err, true)));
    } else {
      next();
    }
  }
};
// ------------------------------------------------
export const requestResolver = () => {
  return (req, res, next) => {
    const option = {
      cwd: req.body.usrAbsDirPath,
      serverDir: req.body.serverDir,
      codeFile: req.body.codeFile,
      codeFilename: req.body.codeFile,
      outFormat: (req.body.outFormat === "prev")? "html": req.body.outFormat,
    }
    switch (req.body.reqType) {
      case "ping":
        writePing(req.body.usrAbsDirPath);
        next();
        break;
      case "run":
      case "compile":
        asyRunManager(req, res, next, option);
        break;
      case "download":
        if (req.body.outFormat === "asy") {
          const outputFilePath = `${req.body.usrAbsDirPath}/${req.body.codeFilename}.${req.body.outFormat}`;
          res.send(outputMaker("SUCCESS", "ASY_FILE_CREATED", FLAGS)(outputFilePath, true));
          break;
        } else {
          asyRunManager(req, res, next, option, "download");
          break;
        }
      default:
        break;
    }
  }
};
// ------------------------------------------------
export const downloadReq = dirname => {
  return function (req, res, next) {
    if (req.body.outFormat === "asy") {
      if (existsSync(req.body.codeFilePath)) {
        res.download(req.body.codeFilePath);
      }
    } else {
      const outputFilePath = `${req.body.usrAbsDirPath}/${req.body.codeFilename}.${req.body.outFormat}`;
      if (existsSync(outputFilePath)) {
        res.download(outputFilePath);
      }
    }
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%    Resolver core function
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const asyRunManager = (req, res, next, option) => {
  let asyArgs = "";
  const commonArgs = ["-noV", "-outpipe", "2", "-noglobalread", "-f"];

  if (req.body.reqType === "compile") {
    const SORFile = `${option.serverDir}/thirdPartyCode/SOR.asy`;
    const compileArgs = argvMaker(req.body.argv);
    asyArgs = [...commonArgs, "html", ...compileArgs, SORFile, "-o", option.codeFilename];
  } else {
    asyArgs = [...commonArgs, option.outFormat, option.codeFile];
  }
  const chProcOption = {
    cwd: option.cwd,
  };
  // const htmlFileExists = existsSync(req.body.htmlFile);
  // if (req.body.reqType === "download" && option.outFormat === "html" && htmlFileExists) {
  // if (req.body.reqType === "download") {
  //   res.send({
  //     responseType: FLAGS.SUCCESS.ASY_OUTPUT_CREATED,
  //     isUpdated: !req.body.isUpdated
  //   });
  //   return;
  // }
  // if (htmlFileExists) {
  //   unlinkSync(req.body.htmlFile);
  // }
  let stderrData = "", stdoutData = "";
  const chProcHandler = spawn('asy', asyArgs, chProcOption);
  setTimeout(() => chProcHandler.kill("SIGTERM"), serverTimeout);
  // ------------------------------- onError
  chProcHandler.on('error', (err) => {
    chProcHandler.kill();
    res.send(outputMaker("FAILURE", "PROCESS_SPAWN_ERR", FLAGS)(err, null, true));
  });
  // ------------------------------- onData
  chProcHandler.stderr.on('data', (chunk) => {stderrData += chunk.toString()});
  chProcHandler.stdout.on('data', (chunk) => {stdoutData += chunk.toString()});
  // ------------------------------- onClose
  chProcHandler.on('close', () => {});
  // ------------------------------- onExit
  chProcHandler.on('exit', (code, signal) => {
    if (code === null) {
      (signal === "SIGTERM")?
        res.send(outputMaker("FAILURE", "PROCESS_TIMEOUT_ERR", FLAGS)(null, true, stderrData, stdoutData)):
        res.send(outputMaker("FAILURE", "PROCESS_TERMINATED_ERR", FLAGS)(null, true, stderrData, stdoutData));
      } else if (code !== 0) {
      res.send(outputMaker("FAILURE", "ASY_CODE_COMPILE_ERR", FLAGS)({errCode: code, errContent: ""}, true, stderrData, stdoutData));
    } else {
      process.nextTick(() => {
        const outputFilePath = `${req.body.usrAbsDirPath}/${req.body.codeFilename}.${option.outFormat}`;
        if (existsSync(outputFilePath)) {
          const resUrl = (option.outFormat === "html")? `${req.body.usrRelDirPath}/${req.body.codeFilename}.${option.outFormat}`: "";
          // console.log("inside processTick", outputMaker("SUCCESS", "ASY_OUTPUT_CREATED", FLAGS)(resUrl, true, stderrData, stdoutData));
          res.send(outputMaker("SUCCESS", "ASY_OUTPUT_CREATED", FLAGS)(resUrl, true, stderrData, stdoutData));
        } else {
          res.send(outputMaker("SUCCESS", "ASY_RUN_NO_OUTPUT", FLAGS)(null, true, stderrData, stdoutData));
        }
      });
    }
    // console.log(`Code: ${code}\nSignal: ${signal}`);
  });
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%   Core internal functions
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const outputMaker = (resStatus="", flagCategory, FLAGS) => {
  const serverRes = {
    resStatus: resStatus,
    resType: FLAGS[resStatus][flagCategory][0],
    resText: FLAGS[resStatus][flagCategory][1],
    errCode: null,
    errContent: null,
    resUrl: null,
  };
  if (resStatus === "SUCCESS") {
    return (resUrl=null, shouldUpdate=true, stderr=null, stdout=null) => {
      return {
        serverRes: {
          ...serverRes,
          resUrl: resUrl,
        },
        stdout: stderr,
        stderr: stdout,
        shouldUpdate: shouldUpdate,
      }
    }
  } else if (resStatus === "FAILURE") {
    const tempErrObj = {
      code: null,
      content: "null",
    };
    return (errObj=tempErrObj, shouldUpdate=true, stderr=null, stdout=null) => {
      return {
        serverRes: {
          ...serverRes,
          errCode: errObj.code,
          errContent: errObj.content,
        },
        stdout: stderr,
        stderr: stdout,
        shouldUpdate: shouldUpdate,
      }
    }
  }
}

const argvMaker = (obj={}) => {
  const argvArr = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      argvArr.push("-u");
      switch (key) {
        case "fFormula":
          argvArr.push(`f="${obj[key]}"`);
          break;
        case "gFormula":
          argvArr.push(`g="${obj[key]}"`);
          break;
        case "xMin":
          argvArr.push(`xmin=${obj[key]}`);
          break;
        case "xMax":
          argvArr.push(`xmax=${obj[key]}`);
          break;
        case "revAxisType":
          argvArr.push(`vertical=${(obj[key] === "Vertical")? true: false}`);
          break;
        case "revAxisPos":
          argvArr.push(`about=${obj[key]}`);
          break;
        default:
          break;
      }
    }
  }
  return argvArr;
}

