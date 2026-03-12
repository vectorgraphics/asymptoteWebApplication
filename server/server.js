import path from "path";
import fs from "fs";
import express from "express";
import cookieParser from "cookie-parser";
import { logger } from "./middleware/logger.js";
import { createUser } from "./middleware/createUser.js";
import { reqAugmenter } from "./middleware/reqAugmenter.js";
import { registerUser } from "./middleware/registerUser.js";
import { fetchOrDownload } from "./middleware/fetchOrDownload.js";
import { writeAndCompile } from "./middleware/writeAndCompile.js";
import { allErrHandler } from "./middleware/allErrHandler.js";

const app = express();
const serverDirname = import.meta.dirname;
// const rootLogger = logger.setLoggerName("Root Logger").create();

// app.router.use("/", reqAugmenter(serverDirname), express.json(), cookieParser("AWA-Secret-Key"), rootLogger);
app.router.use("/", reqAugmenter(serverDirname), express.json(), cookieParser("AWA-Secret-Key"));
app.router.route("/")
  .get(createUser(), express.static("dist"), allErrHandler())
  .post(registerUser(), allErrHandler());
  
app.use("/assets", express.static("dist/assets"));

app.use("/users", reqAugmenter(serverDirname), express.json())
app.router.route("/users")
  .get(fetchOrDownload(), allErrHandler())
  .post(writeAndCompile(), allErrHandler())

app.listen(3000);