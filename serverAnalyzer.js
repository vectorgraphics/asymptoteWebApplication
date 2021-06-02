import { readFile, writeFile, appendFile } from "fs/promises";
import { existsSync } from "fs";
import {spawn, execSync} from "child_process";
import { usrDirMgr, makeDir, removeDir, dateTime } from "./serverUtil.js";


// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                    Globals
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const serverTimeout = 60000;

const FLAGS = {
  ASY_WRITE_FILE_ERR:           "An error occurred inside the server while writing the asy file.",
  ASY_CODE_COMPILE_ERR:         "Asymptote runtime error.",
  CHILD_PROCESS_SPAWN_ERR:      "An error occurred inside the server while spawning child process.",
  CHILD_PROCESS_UNCAUGHT_ERR:   "Process uncaught error.",
  CHILD_PROCESS_TERMINATED_ERR: "Child process was terminated via a signal.",
  ASY_FILE_CREATED:             "Asymptote code file created successfully.",
  ASY_OUTPUT_CREATED:           "Asymptote output file created successfully.",
  NO_ASY_FILE_EXISTS:           "Requested Asymptote code file does not exist.",
  NO_ASY_OUTPUT_EXISTS:         "Requested Asymptote output file does not exist.",
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
      codeFilePath: reqDest.usrAbsDirPath + "/" + codeFilename,
      asyFileToRemove: reqDest.usrAbsDirPath + "/" + codeFilename + ".asy",
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
    console.log("filePath:", filePath);
    console.log("fileContent:", fileContent);
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
      // console.log("server: here in only code");
      if (existsSync(codeFilePath)) {
        res.download(codeFilePath);
      }
    }
    if (outputOption) {
      const outputFilePath = dest.usrAbsDirPath + "/" + outputFile;
      // console.log("server: here in only output");
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
function asyRunManager(res, next, option){
  const asyArgs = ['-noV', '-outpipe', '2', '-noglobalread', '-f', option.outformat, option.codeFile];
  const chProcOption = {
    cwd: option.cwd,
    timeout: serverTimeout
  }
  let stderrData = "";
  let stdoutData = "";
  console.log("option:", option);
  console.log("chProcOption:", chProcOption);
  const chProcHndlr = spawn("asy", [...asyArgs], chProcOption);

  chProcHndlr.on("error", (err) => {
    const errResObject = errResCreator("CHILD_PROCESS_SPAWN_ERR", err)
    res.send(errResObject);
  });
  chProcHndlr.stderr.on("data", (chunk) => {stderrData += chunk.toString()}).on('end', () => console.log(stderrData));
  chProcHndlr.stdout.on("data", (chunk) => {stdoutData += chunk.toString()}).on('end', () => console.log(stdoutData));
  chProcHndlr.on("close", () => {console.log("All stdio got closed.")});
  chProcHndlr.on("exit", (code, signal) => {console.log(`Code: ${code}\nSignal: ${signal}`)});
}