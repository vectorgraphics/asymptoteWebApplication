import { customAlphabet } from "nanoid";
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Globally Used Options
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%              fetch options
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

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Globally Used Functions
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                  createUID
const uAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lAlphabets = "abcdefghijklmnopqrstuvwxyz";
const digits = "0123456789"
export const createUID = (prefix = "", depth = 5) => {
  const nanoid = customAlphabet(digits + lAlphabets + uAlphabets, depth);
  return prefix + nanoid();
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%              codeFormatter
export const codeFormatter = (codeText) => {
  if (codeText[codeText.length - 1] !== "\n"){
    codeText += "\n";
  }
  return codeText;
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%               toURLEncoder
export const toUrlEncoded = (dataObj) => {
  const encodedValues = [];
  for (const member in dataObj) {
    encodedValues.push(encodeURIComponent(member) + "=" + encodeURIComponent(dataObj[member]));
  }
  return encodedValues.join("&");
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                arraysToMap
export const arraysToMap = (keyArray=[], valueArray=[]) => {
  if (keyArray.length !== valueArray.length) {
    console.error("passed arrays must be of the same size");
    return 1;
  }
  const map = new Map();
  keyArray.forEach((key, index) => {
    map.set(key, valueArray[index]);
  });
  return map;
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%             addSaveActions
export const addSaveActions = (dataObj, collectionToCheck=[], onPass=() => {}, onError=() => {}) => {
  let errState = false, text = "";
  const errTxtObj = {};
  const errTxtList = [];

  for (const variable in dataObj) {
    let subDataObj = dataObj[variable];
    if (subDataObj.value.trim() === "") {
      errTxtObj[variable] = `An empty ${subDataObj.textName}`;
      errState = true;
    } else {
      if (typeof subDataObj.validator === "function") {
        if (!subDataObj.validator(subDataObj.value)) {
          errTxtObj[variable] = `An invalid ${subDataObj.textName}`;
          errState = true;
        } else {
          if (typeof subDataObj.uniqueness === "function") {
            if (!subDataObj.uniqueness(subDataObj.value, collectionToCheck)) {
              errTxtObj[variable] = `The ${subDataObj.textName} must be unique!`;
              errState = true;
            }
          }
        }
      }
    }
  }
  for (const element in errTxtObj) {
    if ((text = errTxtObj[element])) {
      errTxtList.push(text);
    }
  }
  (errState)? onError(errTxtList): onPass(errTxtList);
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%               dataArrayGen
export const dataArrayGen = (listOfItems=[], elementToPrepend={text: "none"}) => {
  const dataArray = [elementToPrepend];
  const memberText = Object.keys(elementToPrepend)[0]
  for (const item of listOfItems) {
    const newObj = {};
    newObj[memberText] = item;
    dataArray.push(newObj);
  }
  return dataArray;
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%              srcAlternator
export const srcAlternator = (recentSrc, actualSrc) => {
  if (actualSrc === "") {
    recentSrc.current = "";
  } else {
    if (recentSrc.current.length > actualSrc.length) {
      recentSrc.current = actualSrc;
    } else if (recentSrc.current.length === actualSrc.length) {
      recentSrc.current = actualSrc + " ";
    } else {
      recentSrc.current = actualSrc;
    }
    return recentSrc.current;
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Globally Used CSS Styles
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%            Scrollbar Style
export const scrollbarStyler = (
  scrollbar={
    width: "0.5rem",
    height: "0.5rem",
  },
  track={
    boxShadow: "inset 0 0 0.25rem rgba(0,0,0,0.5)"
  },
  thumb={
    backgroundColor: "#909090",
  },
  corner={
    backgroundColor: "#B5B5B5",
  },
  ...props
) => {
  return {
    "&::-webkit-scrollbar": {...scrollbar},
    "&::-webkit-scrollbar-track": {...track},
    "&::-webkit-scrollbar-thumb": {...thumb},
    "&::-webkit-scrollbar-corner": {...corner},
  };
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%      Fieldset Legend Style
export const legendStyler = (styleObj={}) => {
  return {
    display: "block",
    fontSize: "0.85rem",
    padding: "0 0.5rem",
    margin: "0 1rem",
    ...styleObj
  }
}

