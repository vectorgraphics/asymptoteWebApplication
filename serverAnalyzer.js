import { readFile, writeFile, appendFile } from "fs/promises";
import { existsSync } from "fs";
import {spawn, execSync} from "child_process";
import { usrDirMgr, makeDir, removeDir, dateTime } from "./serverUtil.js";


// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                    Globals
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const serverTimeout = 60000;

const FLAGS = {
  ASY_WRITE_FILE_ERR:     ["ASY_WRITE_FILE_ERR",     "An error occurred inside the server while writing the asy file."],
  ASY_CODE_COMPILE_ERR:   ["ASY_CODE_COMPILE_ERR",   "Asymptote runtime error."],
  PROCESS_SPAWN_ERR:      ["PROCESS_SPAWN_ERR",      "An error occurred inside the server while spawning child process."],
  PROCESS_TERMINATED_ERR: ["PROCESS_TERMINATED_ERR", "Process terminated"],
  PROCESS_RUNTIME_ERR:    ["PROCESS_RUNTIME_ERR",    "Process runtime error."],
  ASY_FILE_CREATED:       ["ASY_FILE_CREATED",       "Asymptote code file created successfully."],
  ASY_OUTPUT_CREATED:     ["ASY_OUTPUT_CREATED",     "Asymptote output file created successfully."],
  NO_ASY_FILE_EXISTS:     ["NO_ASY_FILE_EXISTS",     "Requested Asymptote code file does not exist."],
  NO_ASY_OUTPUT_EXISTS:   ["NO_ASY_OUTPUT_EXISTS",   "Requested Asymptote output file does not exist."],
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%          Set of Middleware
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const reqAnalyzer = (serverDir) => {
  return (req, res, next) => {
    const reqDest = usrDirMgr(req, serverDir);
    const codeFilename = req.body.workspaceName + "_" + req.body.workspaceId;
    const codeFile = codeFilename + ".asy";
    req.processedPayload = {
      ...req.body,
      ...reqDest,
      codeFilename: codeFilename,
      codeFile: codeFile,
      codeFilePath: reqDest.usrAbsDirPath + "/" + codeFile,
      asyFileToRemove: reqDest.usrAbsDirPath + "/" + codeFile,
      htmlFileToRemove: reqDest.usrAbsDirPath + "/" + codeFilename + ".html",
      outputFileToRemove: reqDest.usrAbsDirPath + "/" + codeFilename + "." + req.body.requestedOutformat,
    }
    console.log("processed payload", req.processedPayload);
    next();
    // onlyCodeChecked: codeOption && !outputOption,
    // const existingHtmlFile = htmlFileToRemove;
  }
}
// ------------------------------------------------
export const usrConnect = (serverDir) => {
  return (req, res, next) => {
    if (req.processedPayload.reqType === "usrConnect"){
      const usrDir = req.processedPayload.usrAbsDirPath;
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
        usrDir: req.processedPayload.usrDirName,
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
    const filePath = req.processedPayload.codeFilePath;
    const fileContent = req.processedPayload.codeText;
    // console.log("filePath:", filePath);
    // console.log("fileContent:", fileContent);
    appendFile(filePath, fileContent).then(() => {
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
      cwd: req.processedPayload.usrAbsDirPath,
      codeFile: req.processedPayload.codeFile
    }
    switch (req.processedPayload.reqType) {
      case "run":
        option.outformat = "html"
        asyRunManager(res, next, option);
        break;
      case "download":
        option.outformat = req.processedPayload.requestedOutformat
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
    const dest = usrDirMgr(req, dirname);
    const workspaceId = req.body.workspaceId;
    const workspaceName = req.body.workspaceName;
    const codeOption = req.body.codeOption;
    const outputOption = req.body.outputOption;
    const codeFilename = workspaceName + "_" + workspaceId;
    const codeFile = codeFilename + ".asy";
    const codeFilePath = dest.usrAbsDirPath + "/" + codeFile;
    const requestedOutformat = req.body.requestedOutformat;
    const outputFile = codeFilename + "." + requestedOutformat;

    if (codeOption) {
      if (existsSync(codeFilePath)) {
        res.download(codeFilePath);
      }
    }
    if (outputOption) {
      const outputFilePath = dest.usrAbsDirPath + "/" + outputFile;
      if (existsSync(outputFilePath)) {
        res.download(outputFilePath);
      }
    }
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%        Internal functions
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function errResCreator(flag, errObject = null, errorCode = null) {
  const errResponse = {
    responseType: "ERROR",
    errorType: flag,
    errorText: FLAGS[flag]
  }
  if (errObject === Object(errObject)){
    errResponse.errorCode = errObject.code;
    errResponse.errorContent = errObject.toString();
  } else {
    errResponse.errorCode = errorCode;
  }
  return errResponse;
}
// ------------------------------------------------
function asyRunManager(req,res, next, option){
  const asyArgs = ['-noV', '-outpipe', '2', '-noglobalread', '-f', option.outformat, option.codeFile];
  const chProcOption = {
    cwd: option.cwd,
    timeout: serverTimeout
  }
  let stderrData = "", stdoutData = "", stdioClosed = false;
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
    stdioClosed = true;
    writeFile(req.processedPayload.usrAbsDirPath + "/" + stdout.txt, stdoutData, (err) => console.log("Error:", err));
  });
  // ------------------------------- onExit
  chProcHandler.on('exit', (code, signal) => {
    if (code === null){
      res.send(errResCreator(FLAGS.PROCESS_TERMINATED_ERR))
    } else if (code !== 0){
      res.send({
        ...errResCreator(FLAGS.PROCESS_RUNTIME_ERR),
        stderr: stderrData,
        stdout: stdoutData,
        isUpdated: false
      });
    } else {
      if (stdioClosed){
        const outputFilePath = req.processedPayload.usrAbsDirPath + "/" + req.processedPayload.codeFilename + ".html";
        if (existsSync(outputFilePath)){
          res.send({
            responseType: FLAGS.ASY_OUTPUT_CREATED[0],
            path: req.processedPayload.usrRelDirPath + "/" + req.processedPayload.codeFilename + ".html",
            stdout: stdoutData,
            stderr: stderrData,
            isUpdated: !req.processedPayload.isUpdated,
          });
        } else {
          res.send({
            ...errResCreator(FLAGS.ASY_CODE_COMPILE_ERR),
            stderr: stderrData,
            stdout: stdoutData,
            isUpdated: false
          });
        }
      } else {
        process.nextTick(() => {
          const outputFilePath = req.processedPayload.usrAbsDirPath + "/" + req.processedPayload.codeFilename + ".html";
          if (existsSync(outputFilePath)){
            res.send({
              responseType: FLAGS.ASY_OUTPUT_CREATED[0],
              path: req.processedPayload.usrRelDirPath + "/" + req.processedPayload.codeFilename + ".html",
              stdout: stdoutData,
              stderr: stderrData,
              isUpdated: !req.processedPayload.isUpdated,
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
    }
    // console.log(`Code: ${code}\nSignal: ${signal}`);
  });
}