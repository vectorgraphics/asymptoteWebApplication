import fs from "fs/promises";
import path from "path";
import { propagateErr, objectToText } from "../serverUtils.js";

export const registerUser = () => {
  return (req, res, next) => {
    const logPath = path.resolve(req.appPaths.server, "./logs/IPs.txt");
    fs.appendFile(logPath, objectToText(req.body))
      .then(() => console.log("Writing to IPs.txt was successful"))
      .catch((err) => propagateErr(err, {code: 554, text: "Error in appending to Log file!"}, next));
  }
}