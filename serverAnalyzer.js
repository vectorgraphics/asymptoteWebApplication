import { writeFile, appendFile } from "fs/promises";
import { existsSync } from "fs";
import {spawn, execSync} from "child_process";
import { usrDirMgr, makeDir, removeDir, dateTime, FLAGS} from "./serverUtil.js";

const serverTimeout = 60000;
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%          Set of Middleware
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const reqAnalyzer = (serverDir) => {
  return (req, res, next) => {
    const reqDest = usrDirMgr(req, serverDir);
    const codeFilename = req.body.workspaceName + "_" + req.body.workspaceId;
    const codeFile = codeFilename + ".asy";
    req.body = {
      ...req.body,
      ...reqDest,
      codeFilename: codeFilename,
      codeFile: codeFile,
      codeFilePath: reqDest.usrAbsDirPath + "/" + codeFile,
      asyFileToRemove: reqDest.usrAbsDirPath + "/" + codeFile,
      htmlFileToRemove: reqDest.usrAbsDirPath + "/" + codeFilename + ".html",
      outputFileToRemove: reqDest.usrAbsDirPath + "/" + codeFilename + "." + req.body.requestedOutformat,
    }
    // console.log("processed payload", req.processedPayload);
    next();
  }
}
// ------------------------------------------------
export const usrConnect = (serverDir) => {
  return (req, res, next) => {
    if (req.body.reqType === "usrConnect"){
      const usrDir = req.body.usrAbsDirPath;
      if (existsSync(usrDir)) {
        removeDir(usrDir);
      }
      makeDir(usrDir);
      const asyVersion = execSync('asy -c VERSION', {
        timeout: 500,
        encoding:"ascii"
      })
      const dateAndTime = dateTime();
      const rawData = {
        usrIP: req.ip,
        usrDir: req.body.usrDirName,
        date: dateAndTime.date,
        time: dateAndTime.time,
      };

      const logFilePath = serverDir + "/logs/log";
      appendFile(logFilePath, JSON.stringify(rawData, null, "\n"))
      .then(() => console.log(`log file created successfully.`))
      .catch((err) => console.log(`An error ocurred while writing log file!\n ${err.toString()}`));

      const data = {
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
export const writeAsyFile = () => {
  return (req, res, next) => {
    const filePath = req.body.codeFilePath;
    const fileContent = req.body.codeText;
    // console.log("filePath:", filePath);
    // console.log("fileContent:", fileContent);
    writeFile(filePath, fileContent).then(() => {
      next();
    }).catch((err) => {
      const responseObject = errResCreator("ASY_WRITE_FILE_ERR", err);
      res.send(responseObject);
    })
  }
}
// ------------------------------------------------
export const requestResolver = () => {
  return (req, res, next) => {
    const option = {
      cwd: req.body.usrAbsDirPath,
      codeFile: req.body.codeFile
    }
    switch (req.body.reqType) {
      case "run":
        option.outformat = "html"
        asyRunManager(req, res, next, option);
        break;
      case "download":
        option.outformat = req.body.requestedOutformat
        asyRunManager(res, next, option);
        break;
      default:
        break;
    }
  }
}
// ------------------------------------------------
export const downloadReq =  (dirname) => {
  return function (req, res, next) {
    if (req.body.codeOption) {
      if (existsSync(req.body.codeFilePath)) {
        res.download(req.body.codeFilePath);
      }
    }
    if (req.body.outputOption) {
      const outputFilePath = req.body.usrAbsDirPath + "/" + req.body.codeFilename + "." + req.body.requestedOutformat;
      if (existsSync(outputFilePath)) {
        res.download(outputFilePath);
      }
    }
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%    Resolver core function
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function asyRunManager(req, res, next, option){
  const asyArgs = ['-noV', '-outpipe', '2', '-noglobalread', '-f', option.outformat, option.codeFile];
  const chProcOption = {
    cwd: option.cwd,
    timeout: serverTimeout
  }
  let stderrData = "", stdoutData = "";
  const chProcHandler = spawn("asy", asyArgs, chProcOption);
  // ------------------------------- onERROR
  chProcHandler.on('error', (err) => {
    const errResObject = errResCreator(FLAGS.CHILD_PROCESS_SPAWN_ERR, err)
    chProcHandler.kill();
    res.send(errResObject);
  });
  // ------------------------------- onData
  chProcHandler.stderr.on('data', (chunk) => {stderrData += chunk.toString()});
  chProcHandler.stdout.on('data', (chunk) => {stdoutData += chunk.toString()});
  // ------------------------------- onClose
  chProcHandler.on('close', () => {
    // writeFile(req.body.usrAbsDirPath + "/" + "stdout.txt", stdoutData, (err) => console.log("Error:", err));
  });
  // ------------------------------- onExit
  chProcHandler.on('exit', (code, signal) => {
    if (code === null){
      res.send(errResCreator(FLAGS.PROCESS_TERMINATED_ERR))
    } else if (code !== 0){
      const resObject = {
        ...errResCreator(FLAGS.PROCESS_RUNTIME_ERR),
        stderr: stderrData,
        stdout: stdoutData,
        isUpdated: false
      }
      res.send(resObject);
    } else {
      process.nextTick(() => {
        const outputFilePath = req.body.usrAbsDirPath + "/" + req.body.codeFilename + ".html";
        if (existsSync(outputFilePath)){
          res.send({
            responseType: FLAGS.ASY_OUTPUT_CREATED[0],
            path: req.body.usrRelDirPath + "/" + req.body.codeFilename + ".html",
            stderr: stderrData,
            stdout: stdoutData,
            isUpdated: !req.body.isUpdated,
          });
        } else {
          res.send({
            ...errResCreator(FLAGS.ASY_CODE_COMPILE_ERR),
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
  if (errObject === Object(errObject)){
    errResponse.errorCode = errObject.code;
    errResponse.errorContent = errObject.toString();
  } else {
    errResponse.errorCode = errorCode;
  }
  return errResponse;
}

