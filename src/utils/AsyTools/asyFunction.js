import { asySpecialDefaults } from "./asyData";
import { cloneDeep } from "lodash-es";

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Asy function defaults
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function funcDefaultsCheck(funcName, funcObj) {
  const modifiedFuncObj = cloneDeep(funcObj);
  modifiedFuncObj.funcName = funcName;
  modifiedFuncObj.funcLabel = (modifiedFuncObj.funcLabel !== "no Label")? modifiedFuncObj.funcLabel: null;
  modifiedFuncObj.condFunc = (modifiedFuncObj.condFunc !== "return true;")? modifiedFuncObj.condFunc: null;
  modifiedFuncObj.joinOp = (() => {
    switch (modifiedFuncObj.joinOp) {
      case "straight":
        return null;
      case "hermit-clamped":
        return modifiedFuncObj.joinOpFunc;
      default:
        return modifiedFuncObj.joinOp;
    }
  })();
  modifiedFuncObj.markerType = (modifiedFuncObj.markerType !== "no marker")? modifiedFuncObj.markerType: null;
  console.log("mod:", modifiedFuncObj);
  return modifiedFuncObj;
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Define asy function
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function defineAsyFunc(funcObj) {
  return `
  real ${funcObj.funcName}(real ${funcObj.variableName}) {
    return ${funcObj.funcFormula};
  }`;
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Asy path code generator
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function asyPathCodeGen(funcObj) {
  // guide[] graph(picture pic=currentpicture, real f(real), real a, real b, int n=ngraph, real T(real)=identity,
  //               bool3 cond(real), interpolate join=operator --
  //         );

  // Complete list of asy arguments for 'graph':
  // ["picture", "funcName", "lBound", "uBound", "ngraph, "endPointMap", "condFunc", "joinOp"];
  const graphArgOrder = ["funcName", "lBound", "uBound", "condFunc", "joinOp"];  // ---> implemented
  let args = [];
  for (const property of graphArgOrder) {
    if (funcObj[property]) {
      args.push(funcObj[property]);
    }
  }
  return `graph(${args.join(",")})`;
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Asy marker code generator
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function asyMarkerCodeGen(funcObj, path) {
  // marker marker(path g, markroutine markroutine=marknodes, pen p=currentpen, filltype filltype=NoFill, bool above=true);

  // Complete list of asy arguments for 'marker':
  // ["path", "markroutine", "pen, "filltype", "above,];
  const markerArgOrder = ["path", "pen", "fillType"];                           // ---> implemented
  const {markerType, markerSize, markerFill, markerColor} = funcObj;
  if (!markerType) {
    return null;
  } else {
    if (markerFill !== "NoFill"){
      return `marker(${path}, ${markerColor}, ${markerFill})`;
    } else {
      return `marker(${path}, ${markerColor})`;
    }
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Asy draw code generator
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function asyDrawCodeGen(funcObj, path) {
  // void draw(pair origin, picture pic=currentpicture, Label L="", path g, align align=NoAlign, pen p=currentpen,
  //           arrowbar arrow=None, arrowbar bar=None, margin margin=NoMargin, Label legend="", marker marker=nomarker
  //      );

  // Complete list of asy arguments for 'draw':
  // ["origin", "picture", "pathLabel", "path", "align", "pen, "arrow", "arrowbar, "margin", "legend", "marker"];
  const drawArgOrder = ["funcLabel", "funcPath", "pen", "marker"];              // ---> implemented
  funcObj.funcPath = path;
  funcObj.marker = asyMarkerCodeGen(funcObj, path)
  let args = [];
  for (const property of drawArgOrder) {
    if (funcObj[property]) {
      args.push(funcObj[property]);
    }
  }
  return `draw(${args.join(",")})`;
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Asy function code generator
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function asyFuncCodeGen(funcListToCode, funcsObj) {
  const funcDefinitions = [], drawCommands = [];
  for (const funcId of funcListToCode) {
    const refinedFuncObj = funcDefaultsCheck(funcId, funcsObj[funcId]);
    const funcPath = asyPathCodeGen(refinedFuncObj)
    funcDefinitions.push(defineAsyFunc(refinedFuncObj, funcPath));
    drawCommands.push(asyDrawCodeGen(refinedFuncObj, funcPath));
  }
  return {funcDefinitions, drawCommands};
}


