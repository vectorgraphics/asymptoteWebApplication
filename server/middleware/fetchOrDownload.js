import path from "path";
import { propagateErr } from "./../serverUtils.js";

export const fetchOrDownload = () => {
  return (req, res, next) => {
    const {action = null, filename = null, fileFormat = "html", distFilename = "output"} = req.query;
    const filePath = path.resolve(req.appPaths.user, `${filename}.${fileFormat}`);
    switch (action) {
      case "fetch":
        res.sendFile(filePath, (err) => propagateErr(err, {code: 560, text: "sending result"}, next));
        break;
        case "download":
        res.download(filePath, `${distFilename}.${fileFormat}`, (err) => propagateErr(err, {code: 561, text: "downloading result"}, next));
        break;
      default:
        next();
        break;
    }
  }
}