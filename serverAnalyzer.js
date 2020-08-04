const fs = require('fs');
const childProcess = require('child_process');
const serverUtil = require('./serverUtil');

const usrDirMgr = serverUtil.usrDirMgr;
const removeDir = serverUtil.removeDir;
const dateTime = serverUtil.dateTime;
const makeDir = serverUtil.makeDir;
const writePing = serverUtil.writePing;
const encode = serverUtil.encode;

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                    Globals
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
let runChildProcess = "";
let preRunChildProcess = "";
let timeoutHandle = "";
const serverTimeout = 60000;                    //  in milliseconds

const ERR = {
  ASY_WRITE: "ASY_WRITE_ERR",
  ASY_CODE: "ASY_CODE_ERR",
  CH_PROC: "CH_PROC_ERR",
  CH_PROC_UNCAUGHT: "CH_PROC_UNCAUGHT_ERR",
  PROCESS_TERMINATED: "PROCESSS_TERMINATED"
}

const OUT = {
  ASY_FILE: "ASY_FILE",
  NO_ASY_FILE: "NO_ASY_FILE",
  OUTPUT_FILE: "OUTPUT_FILE",
  NO_OUTPUT_FILE: "NO_OUTPUT_FILE",
}


// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                   reqToRes
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
exports.reqToRes = function (dirname) {
  return function (req, res, next) {
    const reqType = req.body.reqType;
    if (reqType === "usrConnect") {
      usrConnect(req, res, next, dirname)
    } else if (reqType === "run" || reqType === "preDownloadRun") {
      runDownload(req, res, next, dirname);
    } else if (reqType === "abort") {
      abort(req, res, next, dirname, timeoutHandle);
    } else if (reqType === "ping") {
      ping(req, res, next, dirname)
    }
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                 usrConnect
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const usrConnect = function (req, res, next, dirname) {
  const dest = usrDirMgr(req, dirname);
  const usrDir = dest.usrAbsDirPath;
  if (fs.existsSync(usrDir)) {
    removeDir(usrDir);
  }
  makeDir(usrDir);

  const dateAndTime = dateTime();
  const rawData = {
    usrIP: req.connection.remoteAddress,
    usrDir: dest.usrDirName,
    date: dateAndTime.date,
    time: dateAndTime.time,
  };

  const dataJSON = JSON.stringify(rawData) + "\n";
  const logFilePath = dirname + "/logs/log";
  fs.appendFile(logFilePath, dataJSON, (err) => {
    if (err) {
      console.log("error in writing log file");
    }
  })
  res.json("UDIC");
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                       ping
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const ping = function (req, res, next, dirname) {
  const dest = usrDirMgr(req, dirname);
  if (fs.existsSync(dest.usrAbsDirPath)) {
    writePing(dest.usrAbsDirPath);
  } else {
    makeDir(dest.usrAbsDirPath);
  }
  res.json("");
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                      abort
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const abort = function (req, res, next, dirname, timeoutHandle) {
  clearTimeout(timeoutHandle);
  if (req.body.abortRequestFor === "Run") {
    runChildProcess.kill("SIGKILL");
  } else if (req.body.abortRequestFor === "preRun") {
    preRunChildProcess.kill("SIGKILL");
  }
  const ajaxRes = {
    responseType: "ERROR",
    errorType: ERR.PROCESS_TERMINATED,
    errorText: "Process was terminated.",
    errorCode: null,
    errorContent: null,
    stdin: "",
    stdout: "",
    stderr: "",
    entryExists: false
  }
  res.json(ajaxRes);
}
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                runDownload
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// ==========================       Internal module
// ================================================
const asyArgs = function (format, file) {
  return ['-noV', '-outpipe', '2', '-noglobalread', '-f', format, file];
}

const onErrorHandler = function (res, ajaxRes) {
  return function (error) {
    clearTimeout(timeoutHandle);
    ajaxRes.responseType = "ERROR";
    ajaxRes.errorType = ERR.CH_PROC;
    ajaxRes.errorText = "Server child process internal error.";
    ajaxRes.errorCode = error.code;
    ajaxRes.errorContent = error.toString();
    res.send(encode(ajaxRes));
  }
}

const onStdoutHandler = function (res, ajaxRes) {
  return function (chunk) {
    ajaxRes.stdout = chunk.toString();
  }
}
const onStderrHandler = function (res, ajaxRes) {
  return function (chunk) {
    clearTimeout(timeoutHandle);
    ajaxRes.responseType = "ERROR";
    ajaxRes.stderr = chunk.toString();
  }
}
const onExitHandler = function (childProcessType, res, dest, codeFilename, isUpdated, ajaxRes) {
  return function (code, signal) {
    clearTimeout(timeoutHandle);
    if (signal === "SIGTERM") {
      ajaxRes.responseType = "ERROR";
      ajaxRes.errorType = ERR.PROCESS_TERMINATED;
      ajaxRes.errorText = "Process terminated due to the server timeout.";
      res.send(encode(ajaxRes));
    } else if (signal !== "SIGKILL") {
      if (code === 0) {
        const outputFilePath = dest.usrAbsDirPath + "/" + codeFilename + ".html";
        if (fs.existsSync(outputFilePath)) {
          ajaxRes.responseType = OUT.OUTPUT_FILE;
          if (childProcessType === "run") {
            ajaxRes.path = dest.usrRelDirPath + "/" + codeFilename + ".html";
            ajaxRes.isUpdated = !isUpdated;
          }
          res.send(encode(ajaxRes));
        } else {
          ajaxRes.responseType = OUT.NO_OUTPUT_FILE;
          ajaxRes.isUpdated = false;
          res.send(encode(ajaxRes));
        }
      } else {
        ajaxRes.responseType = "ERROR";
        ajaxRes.errorType = ERR.ASY_CODE;
        ajaxRes.errorText = "Asymptote run error";
        ajaxRes.errorCode = code;
        res.send(encode(ajaxRes));
      }
    }
  }
}
const processKillManager = function (processHandle, serverTimeout) {
  return setTimeout(() => {
    processHandle.kill();
  }, serverTimeout)
}

function childProcessManager(dest, childProcessType, res, ajaxRes, requestedOutformat, isUpdated, codeFile, codeFilename) {
  const childProcessOption = {
    cwd: dest.usrAbsDirPath
  }
  const localOutformat = (childProcessType === "run")? "html" : requestedOutformat;
  const childProcessAtRun = childProcess.spawn('asy', asyArgs(localOutformat, codeFile), childProcessOption);
  timeoutHandle = processKillManager(childProcessAtRun, serverTimeout);

  childProcessAtRun.on('error', onErrorHandler(res, ajaxRes));
  childProcessAtRun.stdout.on('data', onStdoutHandler(res, ajaxRes));
  childProcessAtRun.stderr.on('data', onStderrHandler(res, ajaxRes))
  childProcessAtRun.on('exit', onExitHandler(childProcessType, res, dest, codeFilename, isUpdated, ajaxRes));

  if (childProcessType === "run"){
    runChildProcess = childProcessAtRun;
  } else {
    preRunChildProcess = childProcessAtRun;
  }
}

// ==========================       The middleware
// ===============================================
const runDownload = function (req, res, next, dirname) {

  const dest = usrDirMgr(req, dirname);
  const reqType = req.body.reqType;
  const workspaceId = req.body.workspaceId;
  const workspaceName = req.body.workspaceName;
  const codeOption = req.body.codeOption.checked;
  let codeText = req.body.codeText;
  if (codeText[codeText.length - 1] !== "\n")
    codeText += "\n";
  const outputOption = req.body.outputOption.checked;
  const requestedOutformat = req.body.requestedOutformat;
  const isUpdated = req.body.isUpdated;

  const codeFilename = workspaceName + "_" + workspaceId;
  const codeFile = codeFilename + ".asy";
  const codeFilePath = dest.usrAbsDirPath + "/" + codeFile;
  const onlyCodeChecked = codeOption && !outputOption;

  const asyFileToRemove = dest.usrAbsDirPath + "/" + codeFilename + ".asy";
  const htmlFileToRemove = dest.usrAbsDirPath + "/" + codeFilename + ".html";
  const existingHtmlFile = htmlFileToRemove;
  const outputFileToRemove = dest.usrAbsDirPath + "/" + codeFilename + "." + requestedOutformat;

  let htmlFileFlag = (fs.existsSync(existingHtmlFile)) ? true : false;
  let ajaxRes = { // Keep these entries synchronized with decode in Util/util.js
    responseType: null,
    errorType: null,
    errorText: null,
    errorCode: null,
    errorContent: null,
    stdin: "",
    stdout: "",
    stderr: "",
    entryExists: false,
    isUpdated: isUpdated,
    path: ""
  }

  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                      run request

  if (reqType === "run") {
    if (fs.existsSync(htmlFileToRemove)) {
      fs.unlinkSync(htmlFileToRemove);
    }
    fs.writeFile(codeFilePath, codeText, (err) => {
      if (err) {
        ajaxRes.responseType = "ERROR";
        ajaxRes.errorType = ERR.ASY_WRITE;
        ajaxRes.errorText = "An error occurred inside the server while writing the asy file.";
        ajaxRes.errorCode = err.code;
        ajaxRes.errorContent = err.toString();
        res.send(encode(ajaxRes));
      } else {
        childProcessManager(dest, "run", res, ajaxRes, requestedOutformat, isUpdated, codeFile, codeFilename)
      }
    });

    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%           preDownloadRun request

  } else if (reqType === "preDownloadRun") {
    if (onlyCodeChecked) {
      fs.writeFile(codeFilePath, codeText, (err) => {
        if (err) {
          ajaxRes.responseType = "ERROR";
          ajaxRes.errorType = ERR.ASY_WRITE;
          ajaxRes.errorText = "An error occurred inside the server while writing the asy file.";
          ajaxRes.errorCode = err.code;
          ajaxRes.errorContent = err.toString();
          res.send(encode(ajaxRes));
        } else {
          ajaxRes.responseType = OUT.ASY_FILE;
          res.send(encode(ajaxRes));
        }
      })
    } else {
      if (requestedOutformat === "html" && htmlFileFlag) {
        ajaxRes.responseType = OUT.OUTPUT_FILE;
        res.send(encode(ajaxRes));
      } else {
        if (fs.existsSync(asyFileToRemove)) {
          fs.unlinkSync(asyFileToRemove);
        }
        if (fs.existsSync(outputFileToRemove)) {
          fs.unlinkSync(outputFileToRemove);
        }

        fs.writeFile(codeFilePath, codeText, (err) => {
          if (err) {
            ajaxRes.responseType = "ERROR";
            ajaxRes.errorType = ERR.ASY_WRITE;
            ajaxRes.errorText = "An error occurred inside the server while writing the asy file.";
            ajaxRes.errorCode = err.code;
            ajaxRes.errorContent = err.toString();
            res.send(encode(ajaxRes));
          } else {
            childProcessManager(dest, "preRun", res, ajaxRes, requestedOutformat, isUpdated, codeFile, codeFilename)
          }
        });
      }
    }
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                downloadReq
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
exports.downloadReq = function (dirname) {
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
      if (fs.existsSync(codeFilePath)) {
        res.download(codeFilePath);
      }
    }
    if (outputOption) {
      const outputFilePath = dest.usrAbsDirPath + "/" + outputFile;
      // console.log("server: here in only output");
      if (fs.existsSync(outputFilePath)) {
        res.download(outputFilePath);
      }
    }
  }
}
