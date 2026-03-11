import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import { spawn } from "child_process";
import { propagateErr } from "../serverUtils.js";
import { customAlphabet } from "nanoid";

const alphaNumerics = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
const nanoid = customAlphabet(alphaNumerics, 3);

export const writeAndCompile = () => {
  return (req, res, next) => {
    const {action = null, filename = null, fileFormat = "html"} = req.query;
    const data = req.body.codeText;
    const asyFilePath = path.resolve(req.appPaths.user, `${filename}.asy`);
    if (action === "compile") {
      fs.writeFile(asyFilePath, data)
        .then(() => runAsy(req, res, next, asyFilePath)).then(() => {})
        .catch((err) => propagateErr(err, {code: 551, text: "writing asy file"}, next));
    } else {
      const err = Error("Unknown action!");
      propagateErr(err, {code: 552, text: "Asy write file error!"}, next);
    }
  }
}

const runAsy = (req, res, next, asyFilePath) => {
  const stdObj = {
    stdout: "",
    stderr: ""
  }
  const timeout = 600000;
  const {filename, fileFormat} = req.query;
  const asyOptions = ["-noV", "-outpipe", "2", "-noglobalread", "-f", fileFormat, asyFilePath];
  // const oldFile = path.resolve(req.appPaths.user, `${filename}.${fileFormat}`);
  let childProcess = "";
  childProcess = spawn("asy", asyOptions, {cwd: req.appPaths.user});
  setTimeout(() => childProcess.kill("SIGTERM"), timeout);
  childProcess.stderr.on("data", (chunk) => stdObj.stderr += chunk);
  childProcess.stdout.on("readable", () => {
    let chunk = "";
    while ((chunk = childProcess.stdout.read()) !== null) {
      const chunkStr = chunk.toString();
      stdObj.stdout += chunkStr;
    }
  });
  childProcess.on("error", (err) => {
    propagateErr(err, {code: 553, text: "Childprocess spawning error!"}, next);
    childProcess.kill();
  });
  childProcess.on("close", (code, signal) => {
    if (code === 0 && signal === null) {
      const {action, filename, fileFormat} = req.query;
      const fileHandle = `${filename}.${fileFormat}`;
      const expectedFilePath = path.resolve(req.appPaths.user, fileHandle);
      // try {
      //   fsSync.accessSync(htmlExpectedFilePath);
      //   genHtml = htmlFileHandle;
      // } catch (err) {
      //   genHtml = undefined;
      // } 
      fs.access(expectedFilePath)
        .then(() => res.json(resCreator(action, `success-${nanoid()}`, fileHandle, null, stdObj)))
        .catch(() => res.json(resCreator(action, `success-${nanoid()}`, null, null, stdObj)))
    } else if (code && !signal) {
      const err = Error(`Child process exited with ${code} code!`);
      err.extra = true;
      err.stdObj = stdObj;
      propagateErr(err, {code: 591, text: "Non-zero exit code"}, next);
    } else if (!code && signal) {
      const err = Error("Child process terminated by SIGTERM!");
      err.extra = true;
      err.stdObj = stdObj;
      propagateErr(err, {code: 590, text: "SIGTERM signal"}, next);
    }
  })
}
  // fs.access(oldFile).then(() => fs.unlink(oldFile)).finally(() => {
  //   childProcess = spawn("asy", asyOptions, {cwd: req.appPaths.user});
  //   setTimeout(() => childProcess.kill("SIGTERM"), timeout);
  //   childProcess.stderr.on("data", (chunk) => stdObj.stderr += chunk);
  //   childProcess.stdout.on("readable", () => {
  //     let chunk = "";
  //     while ((chunk = childProcess.stdout.read()) !== null) {
  //       const chunkStr = chunk.toString();
  //       stdObj.stdout += chunkStr;
  //     }
  //   });
  //   childProcess.on("error", (err) => {
  //     propagateErr(err, {code: 553, text: "Childprocess spawning error!"}, next);
  //     childProcess.kill();
  //   });
  //   childProcess.on("close", (code, signal) => {
  //     if (code === 0 && signal === null) {
  //       const {action, filename, fileFormat} = req.query;
  //       const fileHandle = `${filename}.${fileFormat}`;
  //       const expectedFilePath = path.resolve(req.appPaths.user, fileHandle);
  //       fs.access(expectedFilePath)
  //         .then(() => res.json(resCreator(action, `success-${nanoid()}`, fileHandle, null, stdObj)))
  //         .catch(() => res.json(resCreator(action, `success-${nanoid()}`, null, null, stdObj)))
  //     } else if (code && !signal) {
  //       const err = Error(`Child process exited with ${code} code!`);
  //       err.extra = true;
  //       err.stdObj = stdObj;
  //       propagateErr(err, {code: 591, text: "Non-zero exit code"}, next);
  //     } else if (!code && signal) {
  //       const err = Error("Child process terminated by SIGTERM!");
  //       err.extra = true;
  //       err.stdObj = stdObj;
  //       propagateErr(err, {code: 590, text: "SIGTERM signal"}, next);
  //     }
  //   })
  // }).catch(() => { });
// }

const resCreator = (action, status, fileHandle, errObj, stdObj) => {
  return {
    recentOperation: `${action}-${nanoid()}`,
    operationStatus: status,
    generatedFile: fileHandle,
    serverResponse: {
      error: errObj,
      stdObj: stdObj,
    },
  }
}