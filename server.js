const fs = require("fs");
const serverUtil = require("./serverUtil");
const serverAnalyzer = require("./serverAnalyzer");
const express = require("express");
const bodyParser = require("body-parser");

const dirCheck = serverUtil.dirCheck;
const reqToRes = serverAnalyzer.reqToRes;
const downloadReq = serverAnalyzer.downloadReq;

var jsBuiltFile1 = fs.readdirSync( __dirname + "/build/static/js")[0];
var jsBuiltFile2 = fs.readdirSync( __dirname + "/build/static/js")[3];
var cssBuiltFile = fs.readdirSync( __dirname + "/build/static/css")[0];
var mediaDir = fs.readdirSync(__dirname + "/build/static/media");

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Application Routs
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const app = express();

app.route('/')
.get(function(req, res, next){
    dirCheck(req, __dirname);
    next();
})
.get(express.static(__dirname + "/build"))
.post(bodyParser.json(), reqToRes(__dirname));

// Serving Static Logo File
// ----------------------------------------
app.route("/logo3d.html")
.get(express.static(__dirname + "/build"));

// Serving CSS Static File
// ----------------------------------------
app.route("/static/css/" + cssBuiltFile)
.get(express.static(__dirname + "/build"));


// Serving JS Static Files
// ----------------------------------------
app.route("/static/js/" + jsBuiltFile1)
.get(express.static(__dirname + "/build"));

app.route("/static/js/" + jsBuiltFile2)
.get(express.static(__dirname + "/build"));


// Serving Media Static Files
// ----------------------------------------
app.route("/static/media/" + mediaDir[0])
.get(express.static(__dirname + "/build"));

app.route("/static/media/" + mediaDir[1])
.get(express.static(__dirname + "/build"));

app.route("/static/media/" + mediaDir[2])
.get(express.static(__dirname + "/build"));

app.route("/static/media/" + mediaDir[3])
.get(express.static(__dirname + "/build"));

app.route("/static/media/" + mediaDir[4])
.get(express.static(__dirname + "/build"));

app.route("/static/media/" + mediaDir[5])
.get(express.static(__dirname + "/build"));

app.route("/static/media/" + mediaDir[6])
.get(express.static(__dirname + "/build"));

// app.route("/manifest.json")
// .get(express.static(__dirname + "/build"));

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%    Iframe Request
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

app.use("/clients", function(req, res, next){
    if(req.method === "GET"){
        const fileToServe = __dirname + "/clients" + req.url;
        if (fs.existsSync(fileToServe)){
            fs.createReadStream(fileToServe).pipe(res);
        }
    }else{
        next();
    }
});

app.route("/clients")
.post(bodyParser.json(), downloadReq(__dirname));

app.listen(80);

// Drop root permissions
let uid=parseInt(process.env.ASYMPTOTE_UID);
let gid=parseInt(process.env.ASYMPTOTE_GID);

if(uid == 0 || gid == 0) {
  let user=process.env.ASYMPTOTE_USER;
  console.log("Cannot run as uid 0 or gid 0; please first adduser",user);
  process.exit(-1);
}

let home=process.env.ASYMPTOTE_HOME;
process.setgid(gid);
process.setuid(uid);
console.log("Asymptote Web Application started with uid",uid,"and gid",gid,"using configuration directory",home);

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Error Handling
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
process.on("uncaughtException", (err) => {

    const diagnose = {
        errorType: "An uncaught error moved to the top of the stack!",
        exception: err,
        errorStack: err.stack,
    },
          diagnoseJSON = JSON.stringify(diagnose).replace(/\\n/g,'\n')+'\n';

    const dest = __dirname + "/logs/uncaughtException"
    if (err){
        fs.writeFile(dest, diagnoseJSON, (err) =>{
            if (err){
                console.log("An error occurred while writing "+dest+".");
            }
        })
    }
})


