import fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const SHA1 = require("crypto-js/sha1");

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                  usrDirMgr
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const usrDirMgr = function(req, serverDir){
    const usrDirName = SHA1(req.ip);
     return {
        usrDirName: usrDirName,
        usrDirPath: "/" + usrDirName,
        usrRelDirPath: "/clients/" + usrDirName,
        usrAbsDirPath: serverDir + "/clients/" + usrDirName,
    }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                  writePing
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const writePing = function(dir) {
    const pingFilePath = dir + "/ping";
    fs.writeFile(pingFilePath, "", (err) => {
        if(err) {
            console.log("error in writing ping file");
        }
    });
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                    makeDir
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const makeDir = function(dir) {
  fs.mkdirSync(dir);
  writePing(dir);
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                   dirCheck
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const dirCheck = function(req, dirname) {
    const dest = usrDirMgr(req, dirname);
    if(!fs.existsSync(dest.usrAbsDirPath)) {
        makeDir(dest.usrAbsDirPath);
    }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                   dateTime
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const dateTime = function(){
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
export const removeDir = function(path){
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

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       drop root permission
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const dropRootPermission = (port) => {
  let uid = parseInt(process.env.ASYMPTOTE_UID);
  let gid = parseInt(process.env.ASYMPTOTE_GID);

  if (uid === 0 || gid === 0) {
      const user = process.env.ASYMPTOTE_USER;
      console.log(`Cannot run as uid 0 or gid 0; please first adduser`,user);
      process.exit(-1);
  }

  const home = process.env.ASYMPTOTE_HOME;
  process.env.HOME = home;
  process.env.ASYMPTOTE_HOME = home+"/.asy";

  process.setgid(gid);
  process.setuid(uid);
  console.log(`\nAsymptote Web Application started on port ${port} with uid ${uid} and gid ${gid}`);
  console.log("Using home directory",home);
}
