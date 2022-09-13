import fs from "fs";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { customAlphabet } from 'nanoid'
const require = createRequire(import.meta.url);
const SHA1 = require("crypto-js/sha1");
const SHA256 = require("crypto-js/sha256");
const https = require("https");


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                      Flags
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const FLAGS = {
  SUCCESS: {
    ASY_FILE_CREATED:       ["ASY_FILE_CREATED",   "Asy text file was created successfully."],
    ASY_OUTPUT_CREATED:     ["ASY_OUTPUT_CREATED", "Asy output file was created successfully."],
    ASY_RUN_NO_OUTPUT:      ["ASY_RUN_NO_OUTPUT",  "Asy code ran but no output was created."],
  },
  FAILURE: {
    ASY_WRITE_FILE_ERR:     ["ASY_WRITE_FILE_ERR",     "An error occurred inside the server while writing the asy file."],
    ASY_CODE_COMPILE_ERR:   ["ASY_CODE_COMPILE_ERR",   "Asymptote code compile error."],
    PROCESS_SPAWN_ERR:      ["PROCESS_SPAWN_ERR",      "An error occurred inside the server while spawning child process."],
    PROCESS_TIMEOUT_ERR:    ["PROCESS_TIMEOUT_ERR", "Process timed out."],
    PROCESS_TERMINATED_ERR: ["PROCESS_TERMINATED_ERR", "Process terminated."],
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                      usrID
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const uAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lAlphabets = "abcdefghijklmnopqrstuvwxyz";
const digits = "0123456789"
const nanoid = customAlphabet(digits + lAlphabets + uAlphabets, 4);

export const createUCID = (ip) => {
  let count = 0;
  const relativeIPBasedPath = SHA1(ip).toString();
  const clientsPath = __dirname + "/clients";
  const files = fs.readdirSync(clientsPath);
  files.forEach((element) => (element.includes(relativeIPBasedPath))? count++ : null);
  return (count >= 50)? "-1": nanoid();
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                  usrDirMgr
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const usrDirMgr = (req, serverDir, UCID) => {
  const usrDirName = SHA1(req.ip).toString() + UCID;
   return {
    serverDir: serverDir,
    usrDirName: usrDirName,
    usrDirPath: "/" + usrDirName,
    usrRelDirPath: "/clients/" + usrDirName,
    usrAbsDirPath: serverDir + "/clients/" + usrDirName,
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                  writePing
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const writePing = (dir) => {
  const pingFilePath = dir + "/ping";
  fs.writeFile(pingFilePath, "", (err) => {
    if (err) {
      console.log("error in writing ping file!");
    }
  });
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                    makeDir
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const makeDir = (dir) => {
  fs.mkdirSync(dir);
  writePing(dir);
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                   dateTime
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const dateTime = () => {
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
    time: time,
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                  removeDir
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const removeDir = (path) => {
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path)
    if (files.length > 0) {
      files.forEach(function(filename) {
        if (fs.statSync(path + "/" + filename).isDirectory()) {
          removeDir(path + "/" + filename);
        } else {
          fs.unlinkSync(path + "/" + filename);
        }
      })
      fs.rmdirSync(path);
    } else {
      fs.rmdirSync(path);
    }
  } else {
      console.log("Directory path not found!");
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                 getRequest
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const getRequest = (ip) => {
  const options = {
    hostname: 'ipxapi.com',
    path: `/api/ip?ip=${ip}`,
    port: 443,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer 3685|AT6f69e0k4dkfIN9P4CSqdLQgbEg918I7Fuljb30",
      "cache-control": "no-cache"
    },
  };
  let userInfoObj = {
    ip: ip,
  };
  let dataChunks = "";

  if (ip !== "::1") {
    const req = https.get(options, res => {
      console.log(`statusCode: ${res.statusCode}`);

      res.on('data', chunk => {
        dataChunks += chunk;
        // process.stdout.write(d);
      });
      res.on('end', () => userInfoObj = JSON.parse(dataChunks));
    });

    req.on('error', error => {
      console.error(error);
    });

    req.end();
  } else {
    return userInfoObj
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       drop root permission
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const dropRootPermission = (port) => {
  let uid = parseInt(process.env.ASYMPTOTE_UID);
  let gid = parseInt(process.env.ASYMPTOTE_GID);

  if (uid === 0 || gid === 0) {
    const user = process.env.ASYMPTOTE_USER;
    console.log(`Cannot run as uid 0 or gid 0; please first adduser`, user);
    process.exit(-1);
  }

  const home = process.env.ASYMPTOTE_HOME;
  process.env.HOME = home;
  process.env.ASYMPTOTE_HOME = home+"/.asy";

  process.setgid(gid);
  process.setuid(uid);
  console.log(`\nAsymptote Web Application started on port ${port} with uid ${uid} and gid ${gid}`);
  console.log("Using home directory",home);
};
