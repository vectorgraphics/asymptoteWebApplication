import { existsSync, createReadStream, appendFile } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";
import expressStaticGzip from "express-static-gzip";
import { dateTime, dropRootPermission } from "./serverUtil.js";
import { reqTypeRouter, reqAnalyzer, delAnalyzer, usrConnect, requestResolver, writeAsyFile, downloadReq } from "./serverAnalyzer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const defaultPort = 80;
const port = (process.env.ASYMPTOTE_PORT == undefined)? defaultPort: parseInt(process.env.ASYMPTOTE_PORT);

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Express Application
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const app = express();

// Serving Static html File & Running Major Requests
// -------------------------------------------------
app.route("/")
.get(express.static(__dirname + "/build"))
.post(reqTypeRouter(), usrConnect(__dirname), reqAnalyzer(__dirname), writeAsyFile(__dirname), requestResolver())
.post(reqTypeRouter(), (req, res, next) => {
  console.log(req.body);
  next();
})


app.route("/delete")
.post(express.text(), delAnalyzer(__dirname));

// Serving Static Logo html File
// ----------------------------------------
app.route("/logo3d.html")
.get(expressStaticGzip(__dirname + "/build"));

// Serving Other Static Files
// ----------------------------------------
app.use("/static/", function(req, res, next) {
  if (/\/(?:css|js|media)\//.test(req.originalUrl)) {
    let urlMatched = /^\/static\/(?:css|js|media)\/(.+\.(?:css|js|map|svg)$)/g.exec(req.originalUrl);
    if (urlMatched !== null && urlMatched[1] !== undefined) {
      res.sendFile(__dirname + "/build" + urlMatched[0]);
    }
  }
})

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%    Iframe Request
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
app.use("/clients", (req, res, next) => {
  if(req.method === "GET"){
    const fileToServe = __dirname + req.originalUrl;
    if (existsSync(fileToServe)) {
      createReadStream(fileToServe).pipe(res);
    }
  } else {
    next();
  }
});

app.route("/clients")
.post(express.json(), reqAnalyzer(__dirname))
.post(express.json(), downloadReq(__dirname));
app.listen(port);
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%    Drop Root Permissions
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
dropRootPermission(port);

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%    Error Handling
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
process.on("uncaughtException", (err) => {
  const diagnose = {
    errorType: "An uncaught error moved to the top of the stack!",
    registerTime: dateTime().time,
    exception: err,
    errorStack: err.stack,
  },
  diagnoseJSON = JSON.stringify(diagnose).replace(/\\n/g,'\n') + '\n';
  const dest = __dirname + "/logs/uncaughtExceptions"
  if (err) {
    appendFile(dest, diagnoseJSON, (err) => {
      if (err) {
          console.log("An error occurred while writing " + dest + ".");
      }
    })
  }
})
