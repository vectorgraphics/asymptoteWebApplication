import { asyPenData } from "./asyData";
import { cloneDeep } from "lodash-es";
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Asy pen defaults
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function penDefaultsCheck(penObj) {
  const modifiedPenObj = cloneDeep(penObj);
  const asyPenSubData = cloneDeep(asyPenData);
  delete asyPenSubData.opacity;
  for (const property in asyPenSubData) {
    if (penObj[property] === asyPenSubData[property]) {
      modifiedPenObj[property] = null;
    }
  }
  return modifiedPenObj;
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Asy pen generator
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function asyPenCodeGen(penListToCode, pensObj, penRequiredModules) {
  // Pen constructor signature is required.


  const penArgsOrder = [];
  const penDefinitions = [];
  let needPatternModule = false;
  for (const penId of penListToCode) {
    const refinedPenData = penDefaultsCheck(pensObj[penId]);
    if (refinedPenData.pattern) {
      needPatternModule = true;

    } else {

    }
  }
  if (needPatternModule) {
    if (penRequiredModules.indexOf("pattern") === -1) {
      penRequiredModules.push("pattern");
    }
  } else {
    if (penRequiredModules.indexOf("pattern") === -1) {
      penRequiredModules.pop("pattern");
    }

  }
  return penDefinitions;
}

