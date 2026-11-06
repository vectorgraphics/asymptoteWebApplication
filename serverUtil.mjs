import fs from "fs";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import { dirname, sep } from "path";
import { customAlphabet } from 'nanoid'
const require = createRequire(import.meta.url);
const SHA1 = require("crypto-js/sha1")

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                      Flags
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const FLAGS = {
  SUCCESS: {
    ASY_FILE_CREATED:       "ASY_FILE_CREATED",
    ASY_OUTPUT_CREATED:     "ASY_OUTPUT_CREATED",
    ASY_RUN_NO_OUTPUT:      "ASY_RUN_NO_OUTPUT"
  },
  FAILURE: {
    INVALID_PATH_ERR:       ["INVALID_PATH_ERR",       "The request references a path outside the client workspace."],
    ASY_WRITE_FILE_ERR:     ["ASY_WRITE_FILE_ERR",     "An error occurred inside the server while writing the asy file."],
    ASY_CODE_COMPILE_ERR:   ["ASY_CODE_COMPILE_ERR",   "Asymptote code compile error."],
    PROCESS_SPAWN_ERR:      ["PROCESS_SPAWN_ERR",      "An error occurred inside the server while spawning child process."],
    PROCESS_TIMEDOUT_ERR:   ["PROCESS_TIMEDOUT_ERR", "Process timed out."],
    PROCESS_TERMINATED_ERR: ["PROCESS_TERMINATED_ERR", "Process terminated."],
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%      Path containment checks
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// True when `target` lies strictly inside `root`; both must be resolved.
export function isWithinRoot(target, root) {
  return target.startsWith(root + sep);
}
// Resolves `file` through symlinks and, when the result lies strictly
// inside `baseDir` (itself resolved through symlinks), returns it.
// Returns null when the entry is missing or escapes `baseDir`.
export function containedRealPath(file, baseDir) {
  try {
    const base = fs.realpathSync(baseDir, { throwIfNoEntry: false });
    const real = fs.realpathSync(file, { throwIfNoEntry: false });
    if (base !== undefined && real !== undefined && isWithinRoot(real, base)) {
      return real;
    }
  } catch {
    // Unresolvable paths fail closed.
  }
  return null;
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                      usrID
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const uAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lAlphabets = "abcdefghijklmnopqrstuvwxyz";
const digits = "0123456789"
const nanoid = customAlphabet(digits + lAlphabets + uAlphabets, 4);
export function usrID(ip) {
  let count = 0;
  const relativeIPBasedPath = SHA1(ip).toString();
  const clientsPath = __dirname + "/clients";
  const files = fs.readdirSync(clientsPath);
  files.forEach((element) => {
    (element.includes(relativeIPBasedPath))? count++ : null;
  });
  return (count >= 50)? "-1": nanoid();
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                  usrDirMgr
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function usrDirMgr(req, serverDir, id) {
  const usrDirName = SHA1(req.ip).toString() + id;
   return {
    usrDirName: usrDirName,
    usrDirPath: "/" + usrDirName,
    usrRelDirPath: "/clients/" + usrDirName,
    usrAbsDirPath: serverDir + "/clients/" + usrDirName,
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                  writePing
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function writePing(dir) {
  const pingFilePath = dir + "/ping";
  fs.writeFile(pingFilePath, "", (err) => {
    if (err) {
      console.log("error in writing ping file!");
    }
  });
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                    makeDir
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function makeDir(dir) {
  fs.mkdirSync(dir);
  writePing(dir);
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                   dateTime
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function dateTime() {
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
export function removeDir(path) {
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
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       drop root permission
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function dropRootPermission(port) {
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
}
