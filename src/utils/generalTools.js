import { customAlphabet } from "nanoid";
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%              fetch options
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const fetchOptionObj = {
  get: {
    method: "GET",
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
      "cache-control": "no-cache",
      "pragma": "no-cache",
    }
  },
  postJson: {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  },
  postUrlEncode: {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  }

}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                  createUID
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const uAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lAlphabets = "abcdefghijklmnopqrstuvwxyz";
const digits = "0123456789"
export function createUID(depth = 5) {
  const nanoid = customAlphabet(digits + lAlphabets + uAlphabets, depth);
  return nanoid();
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                  deepCopy
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function deepCopy(obj) {
  if ((obj === null) || (typeof obj !== "object")) {
    return obj;
  }
  switch (obj.constructor) {
    case Boolean:
      return new Boolean(obj);
    case Number:
      return new Number(obj);
    case String:
      return new String(obj);
    case Date:
      return new Date().setTime(obj.getTime());
    case Array:
      return obj.map((o) => deepCopy(o));
    case RegExp:
      return new RegExp(obj);
    case Object: {
      let copy = {};
      Object.keys(obj).forEach((key) => {
        if (obj.hasOwnProperty(key)) copy[key] = deepCopy(obj[key]);
      });
      return copy;
    }
    default:
      break;
  }
  return obj;
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%              codeFormatter
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function codeFormatter(codeText){
  if (codeText[codeText.length - 1] !== "\n"){
    codeText += "\n";
  }
  return codeText;
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%               toURLEncoder
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function toUrlEncoded(dataObj) {
  const str = [];
  for (const member of Object.keys(dataObj)) {
    str.push(encodeURIComponent(member) + "=" + encodeURIComponent(dataObj[member]));
  }
  return str.join("&");
}



