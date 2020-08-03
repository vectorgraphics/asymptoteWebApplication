const fs = require('fs');
const SHA1 = require("crypto-js/sha1");

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                  usrDirMgr
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const usrDirMgr = function(req, serverDir){
    const usrDirName = SHA1(req.connection.remoteAddress);
     return {
        usrDirName: usrDirName + "",
        usrDirPath: '/' + usrDirName,
        usrRelDirPath: '/clients/' + usrDirName,
        usrAbsDirPath: serverDir + '/clients/' + usrDirName,
    }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                  writePing
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const writePing = function(dir) {
    const pingFilePath = dir + "/ping";
    fs.writeFileSync(pingFilePath, "", (err) => {
        if(err) {
            console.log("error in writing ping file");
        }
    });
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                    makeDir
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const makeDir = function(dir) {
  fs.mkdirSync(dir);
  writePing(dir);
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                   dirCheck
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const dirCheck = function(req, dirname) {
    const dest = usrDirMgr(req, dirname);
    if(!fs.existsSync(dest.usrAbsDirPath)) {
        makeDir(dest.usrAbsDirPath);
    }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                   dateTime
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const dateTime = function(){
    const dateObject = new Date();

    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();

    const hour = dateObject.getHours();
    const minute = dateObject.getMinutes();
    const second = dateObject.getSeconds();

    const date = year + "/" + month + "/" + day;
    const time = hour + ":" + minute + ":" + second;

    return {
        date: date,
        time: time
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

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                     encode
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const encode = function (r) {
  const esc = function (s) {
    return (s+"").toString().replace(/:/g,":|")+"::";
  }

  return Object.values(r).map(esc).reduce((sum, x) => sum+x);
}

module.exports = {
    usrDirMgr: usrDirMgr,
    dirCheck: dirCheck,
    removeDir: removeDir,
    makeDir: makeDir,
    writePing: writePing,
    dateTime: dateTime,
    encode:encode
}

