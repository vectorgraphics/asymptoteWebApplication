const fs = require('fs');
const SHA1 = require("crypto-js/sha1");

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                  usrDirMgr
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const usrDirMgr = function(req, serverDir){
    const usrDirName = SHA1(req.connection.remoteAddress); 
     return {
        usrDirName: usrDirName,
        usrDirPath: '/' + usrDirName,
        usrRelDirPath: '/clients/' + usrDirName,
        usrAbsDirPath: serverDir + '/clients/' + usrDirName,
    }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                   dirCheck
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const dirCheck = function(req, dirname){
    const dest = usrDirMgr(req, dirname);
    if(!fs.existsSync(dest.usrAbsDirPath)){
        fs.mkdirSync(dest.usrAbsDirPath);
    }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                  removeDir
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const removeDir = function(path){
    if (fs.existsSync(path)){
        const files = fs.readdirSync(path)
        if (files.length > 0){
            files.forEach(function(filename){
                if (fs.statSync(path + "/" + filename).isDirectory()){
                    removeDir(path + "/" + filename)
                } else {
                    fs.unlinkSync(path + "/" + filename)
                }
            })
            fs.rmdirSync(path)
        }else{
            fs.rmdirSync(path)
        }
    } else {
        console.log("Directory path not found.")
    }
}

const processKillManager = function(res, processHandel, serverTimeout){
    return setTimeout(() => {
        processHandel.kill();
        const result = {
            responseType: "Process_Terminated",
            errorType: null,
            errorCode: null,
            response: "Process terminated by the server because of server timeout.",
            status: "No-Retry",
        }
        res.send(result);
    }, serverTimeout)
}


module.exports = {
    usrDirMgr: usrDirMgr,
    dirCheck: dirCheck,
    removeDir: removeDir,
    processKillManager: processKillManager
}

