const fs = require('fs');
const childProcess = require('child_process');
const serverUtil = require('./serverUtil');

const usrDirMgr = serverUtil.usrDirMgr;
const removeDir = serverUtil.removeDir;
const dateTime = serverUtil.dateTime;

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                    Globals
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

let runChildProcess = "";
let preRunChildProcess = "";
let timeoutHandle = "";
const serverTimeout = 60000;        //  in milliseconds

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
exports.reqToRes = function(dirname){
    return function(req, res, next){
        const reqType = req.body.reqType;
        if(reqType === "usrConnect"){
            usrConnect(req, res, next, dirname)
        } else if (reqType === "run" || reqType === "preDownloadRun"){
            runDownload(req, res, next, dirname);
        }else if(reqType === "abort"){
            abort(req, res, next, dirname, timeoutHandle);
        }else if(reqType === "ping"){
            ping(req, res, next, dirname)
        }
    }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                 usrConnect
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const usrConnect = function(req, res, next, dirname){
    const dest = usrDirMgr(req, dirname);
    const usrDir = dest.usrAbsDirPath;
    if (fs.existsSync(usrDir)){
        removeDir(usrDir);
    }
    fs.mkdirSync(usrDir);
    
    const dateAndTime = dateTime();
    const rawData = {
      usrIP: req.connection.remoteAddress,
      usrDir: dest.usrDirName,
      date: dateAndTime.date,
      time: dateAndTime.time,
    };

    const dataJSON = JSON.stringify(rawData) + "\n";
    const logFilePath = dirname + "/logs/log";
    fs.appendFile(logFilePath, dataJSON, (err) =>{
        if (err) {
            console.log("error in writing log file");
        }
    })
    res.send("UDIC");
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                       ping
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const ping = function(req, res, next, dirname){
    const dest = usrDirMgr(req, dirname);
    let date = new Date();
    var pingArrivedTime = Math.floor(date.getTime() / 1000).toString() + "\n";
    const pingFilePath = dest.usrAbsDirPath + "/ping";
    fs.writeFile(pingFilePath, pingArrivedTime, (err) => {
        if(err){
            console.log("error in writing ping file");
        }
    });
    res.send("");
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                      abort
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const abort = function(req, res, next, dirname, timeoutHandle){
    clearTimeout(timeoutHandle);
    if (req.body.abortRequestFor === "Run"){
        runChildProcess.kill()
    } else if (req.body.abortRequestFor === "preRun") {
        preRunChildProcess.kill();
    }
    const ajaxRes = {
        responseType: "ERROR" ,
        errorType: ERR.PROCESS_TERMINATED,
        errorText: "Process was terminated.",
        errorCode: null,
        errorContent: null,
        stdin: "",
        stdout: "",
        stderr: "",
        entryExists: false,
    }
    res.send(ajaxRes);
}
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                runDownload
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const runDownload = function(req, res, next, dirname){

    const dest = usrDirMgr(req, dirname);
    const reqType = req.body.reqType;
    const workspaceId = req.body.workspaceId;
    const workspaceName = req.body.workspaceName;
    const codeOption = req.body.codeOption.checked;
    const codeText = req.body.codeText;
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
    let ajaxRes = {
        responseType: "",
        errorType: null,
        errorText: null,
        errorCode: null,
        errorContent: null,
        stdin: "",
        stdout: "",
        stderr: "",
        entryExists: false,
        isUpdated: isUpdated,
        path: "",
    }    

    const asyArgs = function (format, file) {
        return ['-noV', '-outpipe', '2', '-f', format, file];
    }

    // ----------------------------------------------------------------------
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                      run request
    // ----------------------------------------------------------------------
    if (reqType === "run") {
        if (fs.existsSync(htmlFileToRemove)){
            fs.unlinkSync(htmlFileToRemove);
        }
        fs.writeFile(codeFilePath, codeText, (err) => {
            if (err) {
                ajaxRes.responseType = "ERROR";
                ajaxRes.errorType = ERR.ASY_WRITE;
                ajaxRes.errorText = "An error occurred inside the server while writing the asy file.";
                ajaxRes.errorCode = err.code;
                ajaxRes.errorContent = err.toString();
                res.send(ajaxRes);
            } else {
                const runChildProcessOption = {
                    cwd: dest.usrAbsDirPath,
                }
                runChildProcess = childProcess.spawn('asy', asyArgs('html', codeFile), runChildProcessOption);
                timeoutHandle = processKillManager(res, ajaxRes, runChildProcess, serverTimeout);;

                runChildProcess.on('error', function (error) {
                    clearTimeout(timeoutHandle);
                    ajaxRes.responseType = "ERROR";
                    ajaxRes.errorType = ERR.CH_PROC;
                    ajaxRes.errorText = "Server child process internal error.";
                    ajaxRes.errorCode = error.code;
                    ajaxRes.errorContent = error.toString();
                    res.send(ajaxRes);
                })

                runChildProcess.stdout.on('data', function (chunk) {
                    ajaxRes.stdout += chunk.toString();
                })

                runChildProcess.stderr.on('data', function (chunk) {
                    clearTimeout(timeoutHandle);
                    ajaxRes.responseType = "ERROR";
                    ajaxRes.stderr += chunk.toString();
                })

                runChildProcess.on('exit', function (code) {
                    clearTimeout(timeoutHandle);
                    if (code === 0) {
                        const outputFilePath = dest.usrAbsDirPath + "/" + codeFilename + ".html";
                        if (fs.existsSync(outputFilePath)) {
                            ajaxRes.responseType = OUT.OUTPUT_FILE;
                            ajaxRes.path = dest.usrRelDirPath + "/" + codeFilename + ".html";
                            ajaxRes.isUpdated = !isUpdated;
                            res.send(ajaxRes);
                        } else {
                            ajaxRes.responseType = OUT.NO_OUTPUT_FILE;
                            ajaxRes.isUpdated = false;
                            res.send(ajaxRes);
                        }
                    } else {
                        ajaxRes.responseType = "ERROR";
                        ajaxRes.errorType = ERR.ASY_CODE;
                        ajaxRes.errorText = "Asymptote run error";
                        ajaxRes.errorCode = code;
                        res.send(ajaxRes);
                    }
                })
            }
        });

    // ----------------------------------------------------------------------
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%           preDownloadRun request
    // ----------------------------------------------------------------------
    } else if (reqType === "preDownloadRun") {
        if (onlyCodeChecked) {
            console.log("Here");
            fs.writeFile(codeFilePath, codeText, (err) => {
                if (err) {
                    ajaxRes.responseType = "ERROR";
                    ajaxRes.errorType = ERR.ASY_WRITE;
                    ajaxRes.errorText = "An error occurred inside the server while writing the asy file.";
                    ajaxRes.errorCode = err.code;
                    ajaxRes.errorContent = err.toString();
                    res.send(ajaxRes);
                } else {
                    ajaxRes.responseType = OUT.ASY_FILE;
                    res.send(ajaxRes);
                }
            })
        } else {
            if (requestedOutformat === "html" && htmlFileFlag) {
                ajaxRes.responseType = OUT.OUTPUT_FILE;
                res.send(ajaxRes);
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
                        res.send(ajaxRes);
                    } else {
                        const preRunChildProcessOption = {
                            cwd: dest.usrAbsDirPath
                        }
                        preRunChildProcess = childProcess.spawn('asy', asyArgs(requestedOutformat, codeFile), preRunChildProcessOption);
                        timeoutHandle = processKillManager(res, ajaxRes, preRunChildProcess, serverTimeout);

                        preRunChildProcess.on('error', function (error) {
                            clearTimeout(timeoutHandle);
                            ajaxRes.responseType = "ERROR";
                            ajaxRes.errorType = ERR.CH_PROC;
                            ajaxRes.errorText = "Server child process internal error.";
                            ajaxRes.errorCode = error.code;
                            ajaxRes.errorContent = error.toString();
                            res.send(ajaxRes);
                        })

                        preRunChildProcess.stdout.on('data', function (chunk) {
                            ajaxRes.stdout += chunk.toString();
                        })

                        preRunChildProcess.stderr.on('data', function (chunk) {
                            clearTimeout(timeoutHandle);
                            ajaxRes.responseType = "ERROR";
                            ajaxRes.stderr += chunk.toString();
                        })

                        preRunChildProcess.on('exit', function (code) {
                            clearTimeout(timeoutHandle);
                            if (code === 0) {
                                const outputFilePath = dest.usrAbsDirPath + "/" + codeFilename + "." + requestedOutformat;
                                if (fs.existsSync(outputFilePath)) {
                                    ajaxRes.responseType = OUT.OUTPUT_FILE;
                                    res.send(ajaxRes);
                                } else {
                                    ajaxRes.responseType = OUT.NO_OUTPUT_FILE;
                                    ajaxRes.isUpdated = false;
                                    res.send(ajaxRes);
                                }
                            } else if (code !== null) {
                                ajaxRes.responseType = "ERROR";
                                ajaxRes.errorType = ERR.ASY_CODE;
                                ajaxRes.errorText = "Asymptote run error";
                                ajaxRes.errorCode = code;
                                res.send(ajaxRes);
                            }
                        })
                    }
                });
            }
        }

    } 
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                downloadReq
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
exports.downloadReq = function(dirname){
    return function(req, res, next){
        const dest = usrDirMgr(req, dirname);
        const workspaceId = req.body.workspaceId;
        const workspaceName = req.body.workspaceName;
        const codeOption = req.body.codeOption;
        const outputOption = req.body.outputOption;        
        const codeFilename = workspaceName + "_" + workspaceId;
        const codeFile = codeFilename + ".asy";
        const codeFilePath = dest.usrAbsDirPath + "/" + codeFile;
        const requestedOutformat= req.body.requestedOutformat;
        const outputFile = codeFilename + "." + requestedOutformat;

        if(codeOption){
            // console.log("server: here in only code");
            if(fs.existsSync(codeFilePath)){
                res.download(codeFilePath);
            }
        }
        if(outputOption){
            const outputFilePath = dest.usrAbsDirPath + "/" + outputFile;
            // console.log("server: here in only output");
            if(fs.existsSync(outputFilePath)){
                res.download(outputFilePath);
            }
        }
    }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%         processKillManager
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const processKillManager = function (res, ajaxRes, processHandle, serverTimeout) {
    return setTimeout(() => {
        processHandle.kill();
        ajaxRes.responseType = "ERROR";
        ajaxRes.errorType = ERR.PROCESS_TERMINATED;
        ajaxRes.errorText = "Process terminated due to server timeout.";
        res.send(ajaxRes);
    }, serverTimeout)
}
