import { createRequire } from 'module'
import { writeFile, appendFile } from "fs/promises";
import { existsSync, unlinkSync } from "fs";
import { spawn, execSync } from "child_process";
import { createUCID, usrDirMgr, makeDir, removeDir, dateTime, writePing, hashCode, FLAGS } from "./serverUtil.js";
import express from "express";
const require = createRequire(import.meta.url);

const serverTimeout = 60000;
let codeContentSHA256 = "";
let isUpdatedFlag = false;
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%          Set of Middleware
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function reqTypeRouter() {
  return (req, res, next) => {
    if (req.is("application/json") === "application/json") {
      return express.json()(req, res, next);
    } else if (req.get('Content-Type').includes("application/x-www")) {
      return express.urlencoded({extended: true})(req, res, next);
    }
  }
}
// ------------------------------------------------
export function usrConnect(serverDir) {
  return (req, res, next) => {
    console.log(req.body);
    if (req.body.reqType === "usrConnect") {
      let ucid = createUCID(req.ip);
      if (ucid !== "-1") {
        var reqDest = usrDirMgr(req, serverDir, ucid);
        makeDir(reqDest.usrAbsDirPath);
      } else {
        reqDest = usrDirMgr(req, serverDir, "");
      }
      const asyVersion = execSync('asy -c VERSION', {
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
      appendFile(logFilePath, JSON.stringify(rawData, null, `\n`))
      .then(() => console.log(`log file created successfully.`))
      .catch((err) => console.log(`An error occurred while writing log file!\n ${err.toString()}`));

      const data = {
        uniqueClientID: ucid,
        usrConnectStatus: "UDIC",
        asyVersion: asyVersion
      }
      res.send(data);
    } else {
      next();
    }
  }
}
// ------------------------------------------------
export function reqAnalyzer(serverDir) {
  return (req, res, next) => {
    const reqDest = usrDirMgr(req, serverDir, req.body.id);
    const codeFilename = `${req.body.workspaceName}_${req.body.workspaceId}`;
    const codeFile = codeFilename + ".asy";
    req.body = {
      ...req.body,
      ...reqDest,
      codeFilename: codeFilename,
      codeFile: codeFile,
      codeFilePath: reqDest.usrAbsDirPath + "/" + codeFile,
      htmlFile: reqDest.usrAbsDirPath + "/" + codeFilename + ".html",
    }
    if (typeof req.body.isUpdated === "string") {
      req.body.isUpdated =  req.body.isUpdated.includes("true");
    }
    if (req.body.codeOption !== undefined && typeof req.body.codeOption === "string") {
      req.body.codeOption =  req.body.codeOption.includes("true");
    }
    if (req.body.outputOption !== undefined && typeof req.body.outputOption === "string") {
      req.body.outputOption =  req.body.outputOption.includes("true");
    }
    // console.log("modified req.body:\n", req.body);
    next();
  }
}
// ------------------------------------------------
export function delAnalyzer(serverDir) {
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
  }
}
// ------------------------------------------------
export function writeAsyFile(serverDir) {
  return (req, res, next) => {
    const filePath = req.body.codeFilePath;
    const fileContent = req.body.codeContent;
    writeFile(filePath, fileContent).then(() => {
      next();
    }).catch((err) => {
      res.send(errResCreator(FLAGS.FAILURE.ASY_WRITE_FILE_ERR, err));
    })
  }
}
// ------------------------------------------------
export function requestResolver() {
  return (req, res, next) => {
    const option = {
      cwd: req.body.usrAbsDirPath,
      codeFile: req.body.codeFile,
      outformat: req.body.outformat,
    }
    switch (req.body.reqType) {
      case "ping":
        writePing(req.body.usrAbsDirPath);
        next();
        break;
      case "run":
        option.outformat = "html"
        asyRunManager(req, res, next, option);
        break;
      case "download":
        if (req.body.outformat === "asy") {
          res.send({
            responseType: FLAGS.SUCCESS.ASY_FILE_CREATED,
            isUpdated: !req.body.isUpdated
          })
          break;
        } else {
          asyRunManager(req, res, next, option);
          break;
        }
      default:
        break;
    }
  }
}
// ------------------------------------------------
export function downloadReq(dirname) {
  return function (req, res, next) {
    if (req.body.outformat === "prev") {
      if (existsSync(req.body.codeFilePath)) {
        res.download(req.body.codeFilePath);
      }
    } else {
      const outputFilePath = req.body.usrAbsDirPath + "/" + req.body.codeFilename + "." + req.body.outformat;
      if (existsSync(outputFilePath)) {
        res.download(outputFilePath);
      }
    }
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%    Resolver core function
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function asyRunManager(req, res, next, option) {
  const asyArgs = ['-noV', '-outpipe', '2', '-noglobalread', '-once', '-f', option.outformat, option.codeFile];
  const chProcOption = {
    cwd: option.cwd,
  }
  const htmlFileExists = existsSync(req.body.htmlFile);
  if (req.body.reqType === "download" && option.outformat === "html" && htmlFileExists) {
    res.send({
      responseType: FLAGS.SUCCESS.ASY_OUTPUT_CREATED,
      isUpdated: !req.body.isUpdated
    });
    return;
  }
  if (htmlFileExists) {
    unlinkSync(req.body.htmlFile);
  }
  let stderrData = "", stdoutData = "";
  const chProcHandler = spawn('asy', asyArgs, chProcOption);
  setTimeout(() => {
    chProcHandler.kill("SIGTERM");
  }, serverTimeout)
  // ------------------------------- onError
  chProcHandler.on('error', (err) => {
    const errResObject = errResCreator(FLAGS.FAILURE.PROCESS_SPAWN_ERR, err);
    chProcHandler.kill();
    res.send(errResObject);
  });
  // ------------------------------- onData
  chProcHandler.stderr.on('data', (chunk) => {stderrData += chunk.toString()});
  chProcHandler.stdout.on('data', (chunk) => {stdoutData += chunk.toString()});
  // ------------------------------- onClose
  chProcHandler.on('close', () => {});
  // ------------------------------- onExit
  chProcHandler.on('exit', (code, signal) => {
    if (code === null) {
      (signal === "SIGTERM") ? res.send(errResCreator(FLAGS.FAILURE.PROCESS_TIMEDOUT_ERR)) :
          res.send(errResCreator(FLAGS.FAILURE.PROCESS_TERMINATED_ERR));
    } else if (code !== 0) {
      res.send({
        ...errResCreator(FLAGS.FAILURE.ASY_CODE_COMPILE_ERR),
        stderr: stderrData,
        stdout: stdoutData,
        isUpdated: false
      });
    } else {
      process.nextTick(() => {
        const outputFilePath = req.body.usrAbsDirPath + "/" + req.body.codeFilename + "." + option.outformat;
        if (existsSync(outputFilePath)) {
          res.send({
            responseType: FLAGS.SUCCESS.ASY_OUTPUT_CREATED,
            stderr: stderrData,
            stdout: stdoutData,
            isUpdated: !req.body.isUpdated,
            path: (option.outformat === "html")? req.body.usrRelDirPath
                + "/" + req.body.codeFilename + "." + option.outformat: ""
          });
        } else {
          res.send({
            responseType: FLAGS.SUCCESS.ASY_RUN_NO_OUTPUT,
            stderr: stderrData,
            stdout: stdoutData,
            isUpdated: false
          });
        }
      });
    }
    // console.log(`Code: ${code}\nSignal: ${signal}`);
  });
}
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%   Core internal functions
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function errResCreator(flag, errObject = null, errorCode = null) {
  const errResponse = {
    responseType: "ERROR",
    errorType: flag[0],
    errorText: flag[1]
  }
  if (errObject === Object(errObject)) {
    errResponse.errorCode = errObject.code;
    errResponse.errorContent = errObject.toString();
  } else {
    errResponse.errorCode = errorCode;
  }
  return errResponse;
}

