// import fs from "fs";
import chalk from "chalk";
import { DateTime } from "luxon";

const reader = (req, token, options) => {
  const valueToReturn = {};
  if (options) {
    options.forEach((option) => valueToReturn[option] = req[token][option]);
    return valueToReturn;
  }
  return req[token];
}
const getDateAndTime = () => DateTime.now().toLocaleString(DateTime.DATETIME_MED);

export const logger = (() => {
  let loggerName = "Default Logger";  
  const tokensAndValues = new Map();
  const allTokensAndValues = new Map([
    ["ip", "ip"],
    ["path", "path"],
    ["method", "method"],
    ["url", "url"],
    ["baseUrl", "baseUrl"],
    ["originalUrl", "originalUrl"],
    ["host", "host"],
    ["hostname", "hostname"],
    ["protocol", "protocol"],
    ["headers", reader],
    ["body", reader],
    ["params", reader],
    ["query", reader],
    ["Cookies", reader],
    ["signedCookies", reader],
    ["Date & Time", getDateAndTime]
  ]);
  
  const tokenOptions = new Map([
    ["headers", ["content-type", "content-disposition", "accept", "connection", "cookie", "set-cookie"]],
  ]);
  
  const formatObject = {
    basic: ["ip", "method", "url", "headers", "body", "signedCookies", "Date & Time"],
    moderate: ["ip", "method", "url", "originalUrl", "headers", "body", "query", "signedCookies", "Date & Time"],
    full: allTokensAndValues.keys(),
  }

  function setLoggerName(newName) {
    loggerName = newName; 
    return this;
  }

  const setFormat = (format, formatStr) => {
    if (formatObject[format]) {
      formatObject[format].forEach((token) => tokensAndValues.set(token, allTokensAndValues.get(token)));
    } else if (format === "custom") {
      const customFormat = formatStr?.split(",").map((item) => item.trim());
      customFormat?.forEach((token) => tokensAndValues.set(token, allTokensAndValues[token]));
    }
  }
  
  const defineToken = (token = null, cb = null, options = null) => {
    if (options && typeof options === "object") {
      tokenOptions.set(token, options);
    }
    if (token && typeof token === "string" && cb) {
      tokensAndValues.set(token, cb);
    }
  }
  
  const removeToken = (token) => tokensAndValues.delete(token);
  
  const logValue = (req, tokenKey, tokenValue) => {
    const valueType = typeof tokenValue;
    if (valueType === "string") {
      console.log(`${tokenKey}: ${req[tokenKey]}`);
    } else if (valueType === "function") {
      const optionsForToken = tokenOptions.get(tokenKey);
      if (tokenOptions) {
        logDecorator(tokenKey, tokenValue(req, tokenKey, optionsForToken));
      } else {
        logDecorator(tokenKey, tokenValue(req, tokenKey));
      }
    }
  }
  
  const logDecorator = (token, value) => {
    if (typeof value === "string") {
      console.log(`${token}: ${value}`);
    } else if (typeof value === "object") {
      console.log(chalk.red(`${token}:`));
      console.group();
      for (const key in value) {
        console.log(chalk.blue(`${key}`) + `: ${value[key]}`);
      }
      console.groupEnd();
    }
  }
  
  return {
    defineToken,
    removeToken,
    setLoggerName,
    create(format = "basic", formatStr = null) {
      setFormat(format, formatStr);
      return (req, res, next) => {
        console.log("");
        console.log(`#####################[ Start of ${loggerName} ]#####################`)
        tokensAndValues.forEach((value, key) => logValue(req, key, value));
        console.log(`######################[ End of ${loggerName} ]######################`)
        console.log("");
        next();
      }
    }
  }
})()
