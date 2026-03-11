import path from "path";
import fs from "fs/promises";
import { customAlphabet } from "nanoid";
import { propagateErr } from "../serverUtils.js";

const alphaNumerics = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_123456789";
const nanoid = customAlphabet(alphaNumerics, 10);

export const createUser = () => {
  return (req, res, next) => {
    if (!req.signedCookies.UUID) {
      const UUID = nanoid();
      const userPath = path.resolve(req.appPaths.clients, `./user_${UUID}`);
      const userLogPath = path.resolve(req.appPaths.clients, `./user_${UUID}/log.txt`);
      req.appPaths.user = userPath;
      fs.mkdir(userPath, {recursive: true})
        .then(
          fs.writeFile(userLogPath, "", "utf8").catch((err) => propagateErr(err, {code: 551, text: "log.txt"}, next))
        ).catch((err) => propagateErr(err, {code: 550, text: "user directory"}, next));
      res.cookie("UUID", UUID, {maxAge: 43200000, httpOnly: true, signed: true});
      next();
    } else {
      next();
    }
  }
}