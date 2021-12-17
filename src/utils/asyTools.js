import { deepCopy } from "../utils/generalTools";

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Asy picture generator
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function asyPictureGenerator(geoData) {
  return `import graph;\nsize(${geoData.width}, ${geoData.height}, ${geoData.aspectRatio});\n\n`;
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Asy axis generator
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function asyAxisGenerator(axisData, axisType="x") {
  if (axisType === "x") {
    if (axisData.label !== "") {
      return `xaxis(currentpicture, $${axisData.label}$, ${axisData.extend}, ${axisData.min}, ${axisData.max}, ${axisData.axisPen}, ${axisData.ticks}, ${axisData.endArrow}, false);\n`;
    } else {
      return "";
    }
  } else if (axisType === "y") {
    if (axisData.label !== "") {
      return `yaxis(currentpicture, $${axisData.label}$, ${axisData.extend}, ${axisData.min}, ${axisData.max}, ${axisData.axisPen}, ${axisData.ticks}, ${axisData.endArrow}, false);\n`;
    } else {
      return "";
    }
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Asy ticks generator
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function asyTicksGenerator(ticksData, axis="verticalAxis") {
  if (ticksData.ticks !== "NoTicks") {
    return `
      ${ticksData.ticks}(${ticksData.ticksLabelFormat}, ${ticksData.ticksLabel},
        ${ticksData.ticksBeginLabel},${ticksData.ticksEndLabel},
        ${ticksData.majorTicksSteps}, ${ticksData.minorTicksSteps},
        ${ticksData.ticksBegin}, ${ticksData.ticksEnd}, None,
        ${ticksData.majorTicksSize}, ${ticksData.minorTicksSize}, ${ticksData.ticksExtend},
        ${ticksData.majorTicksPen}, ${ticksData.minorTicksPen});
      `;
  } else {
    return false;
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Asy marker generator
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function asyMarkerGenerator(markerData) {
  return false;
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Asy Label generator
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function asyLabelGenerator(LabelData) {
  if (LabelData.Label !== "") {
    return `Label(${LabelData.Label}, ${LabelData.LabelPos}, ${LabelData.LabelAlign}, ${LabelData.LabelPen}, ${LabelData.LabelEmbed}, ${LabelData.LabelFill})`;
  } else {
    return false;
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Asy label generator
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function asylabelGenerator(labelData) {
  if (labelData.Label !== "") {
    return `label(${labelData.picture}, ${labelData.Label}, ${labelData.LabelPos}, ${labelData.LabelAlign}, ${labelData.LabelPen}, ${labelData.LabelFill});`;
  } else {
    return false;
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Asy funcLabel generator
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function asyFuncLabelGenerator(funcData) {
  if (funcData.funcLabel !== "") {
    // return `Label(${funcData.funcLabel}, ${funcData.funcLabelPos}, ${funcData.funcLabelAlign}, ${funcData.funcLabelPen}, ${funcData.funcLabelFill})`;
    return `Label(${falsifyEmptyArgs(funcData)})`;
  } else {
    return false;
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Asy path generator
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function asyPathGenerator(pathData = "") {
  if (pathData.funcName !== "") {
    return `graph(${pathData.funcName}, ${pathData.lBound}, ${pathData.uBound})`;
  } else {
    return false;
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%  Asy function definition generator
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function asyFuncGenerator(funcData, variableName) {
  if (funcData.parName === undefined || funcData.parName === "") {
    return `real ${funcData.funcName}(real ${variableName}) {\n  return ${funcData.funcFormula};\n}\n\n`;
  } else {
    return `real ${funcData.funcName}(real ${variableName}, ${funcData.parName}) {\n  return ${funcData.funcFormula};\n}\n\n`;
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Asy draw function generator
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function asyDrawGenerator(drawData) {
  // let result = "";
  // const objectToLoop = Object.keys(drawData);
  // for (const element of objectToLoop) {
  //   if (drawData[element]) {
  //     result += drawData[element] + ", ";
  //   }
  // }
  // result = result.substr(0, result.length - 1);
  // return `draw(${result});\n\n`;
  return `draw(${falsifyEmptyArgs(drawData)});\n\n`;
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Asy defaults assigner
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function falsifyEmptyArgs(dataObj = {}, sliceName = "") {
  switch (sliceName) {
    case "geometry":
      dataObj.width = (dataObj.width !== "")? dataObj.width: "10cm";
      dataObj.height = (dataObj.height !== "")? dataObj.height: "10cm";
      break;

    case "hAxis":
      dataObj.label = (dataObj.label !== "")? dataObj.label: false;
      dataObj.relativePosition = (dataObj.relativePosition !== "")? dataObj.relativePosition: "1";
      dataObj.omitLabels = (dataObj.omitLabels !== "")? dataObj.omitLabels: false;
      dataObj.min = (dataObj.min !== "")? dataObj.min: "-infinity";
      dataObj.max = (dataObj.max !== "")? dataObj.max: "infinity";
      dataObj.align = (dataObj.align !== "")? dataObj.align: false;
      dataObj.extend = (dataObj.extend !== "")? dataObj.extend: "true";
      dataObj.endArrow = (dataObj.endArrow !== "")? dataObj.endArrow: false;
      dataObj.axisPen = (dataObj.axisPen !== "")? dataObj.axisPen: false;
      dataObj.axisLocation = (dataObj.axisLocation !== "")? dataObj.scale: "bottom";
      dataObj.scale = (dataObj.scale !== "")? dataObj.scale: "linear";
      dataObj.ticks = (dataObj.ticks !== "")? dataObj.ticks: false;
      dataObj.ticksLabel = (dataObj.ticksLabel !== "")? dataObj.ticksLabel: false;
      dataObj.ticksLabelFormat = (dataObj.ticksLabelFormat !== "")? dataObj.ticksLabelFormat: "$%0.4g$";
      dataObj.omitTicks = (dataObj.omitTicks !== "")? dataObj.omitTicks: false;
      dataObj.omitTicksLabels = (dataObj.omitTicksLabels !== "")? dataObj.omitTicksLabels: false;
      dataObj.ticksExtend = dataObj.ticksExtend || "true";
      dataObj.majorTicksDivision = (dataObj.majorTicksDivision !== "")? dataObj.majorTicksDivision: "1";
      dataObj.minorTicksDivision = (dataObj.minorTicksDivision !== "")? dataObj.minorTicksDivision: "1";
      dataObj.majorTicksSteps = (dataObj.majorTicksSteps !== "")? dataObj.majorTicksSteps: "1";
      dataObj.minorTicksSteps = (dataObj.minorTicksSteps !== "")? dataObj.minorTicksSteps: "1";
      dataObj.majorTicksSize = (dataObj.majorTicksSize !== "")? dataObj.majorTicksSize: "1";
      dataObj.minorTicksSize = (dataObj.minorTicksSize !== "")? dataObj.minorTicksSize: "1";
      dataObj.majorTicksPen = (dataObj.majorTicksSize !== "")? dataObj.majorTicksSize: false;
      dataObj.minorTicksPen = (dataObj.minorTicksSize !== "")? dataObj.minorTicksSize: false;
      break;

    case "vAxis":
      dataObj.label = (dataObj.label !== "")? dataObj.label: false;
      dataObj.relativePosition = (dataObj.relativePosition !== "")? dataObj.relativePosition: "1";
      dataObj.omitLabels = (dataObj.omitLabels !== "")? dataObj.omitLabels: false;
      dataObj.min = (dataObj.min !== "")? dataObj.min: "-infinity";
      dataObj.max = (dataObj.max !== "")? dataObj.max: "infinity";
      dataObj.align = (dataObj.align !== "")? dataObj.align: false;
      dataObj.extend = (dataObj.extend !== "")? dataObj.extend: "true";
      dataObj.endArrow = (dataObj.endArrow !== "")? dataObj.endArrow: false;
      dataObj.axisPen = (dataObj.axisPen !== "")? dataObj.axisPen: false;
      dataObj.axisLocation = (dataObj.axisLocation !== "")? dataObj.scale: "left";
      dataObj.scale = (dataObj.scale !== "")? dataObj.scale: "linear";
      dataObj.ticks = (dataObj.ticks !== "")? dataObj.ticks: false;
      dataObj.ticksLabel = (dataObj.ticksLabel !== "")? dataObj.ticksLabel: false;
      dataObj.ticksLabelFormat = (dataObj.ticksLabelFormat !== "")? dataObj.ticksLabelFormat: "$%0.4g$";
      dataObj.omitTicks = (dataObj.omitTicks !== "")? dataObj.omitTicks: false;
      dataObj.omitTicksLabels = (dataObj.omitTicksLabels !== "")? dataObj.omitTicksLabels: false;
      dataObj.ticksExtend = dataObj.ticksExtend || "true";
      dataObj.majorTicksDivision = (dataObj.majorTicksDivision !== "")? dataObj.majorTicksDivision: "1";
      dataObj.minorTicksDivision = (dataObj.minorTicksDivision !== "")? dataObj.minorTicksDivision: "1";
      dataObj.majorTicksSteps = (dataObj.majorTicksSteps !== "")? dataObj.majorTicksSteps: "1";
      dataObj.minorTicksSteps = (dataObj.minorTicksSteps !== "")? dataObj.minorTicksSteps: "1";
      dataObj.majorTicksSize = (dataObj.majorTicksSize !== "")? dataObj.majorTicksSize: "1";
      dataObj.minorTicksSize = (dataObj.minorTicksSize !== "")? dataObj.minorTicksSize: "1";
      dataObj.majorTicksPen = (dataObj.majorTicksSize !== "")? dataObj.majorTicksSize: false;
      dataObj.minorTicksPen = (dataObj.minorTicksSize !== "")? dataObj.minorTicksSize: false;
      break;

    case "funcLabel":
      dataObj.funcLabel = (dataObj.funcLabel !== "")? dataObj.funcLabel: false;
      dataObj.funcLabelPos = (dataObj.funcLabelPos !== "")? dataObj.funcLabelPos: "(0,0)";
      dataObj.funcLabelPen = (dataObj.funcLabelPen !== "")? dataObj.funcLabelPen: false;
      break;

    case "funcCurve":
      dataObj.funcFormula = (dataObj.funcFormula !== "")? dataObj.funcFormula: false;
      dataObj.joinOpFunc = (dataObj.joinOpFunc !== "")? dataObj.joinOpFunc: false;
      dataObj.markerSize = (dataObj.markerSize !== "")? dataObj.markerSize: "10pt";
      dataObj.curvePen = (dataObj.curvePen !== "")? dataObj.curvePen: false;
      break;

    default:
      break;
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Asy argument generator
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function asyArgListGenerator(dataObj) {
  const listOfParameters = Object.keys(dataObj);
  const length = listOfParameters.length;
  let argumentsList = "";
  for (const element of listOfParameters) {
    if (dataObj[element]) {
      if (listOfParameters.indexOf(element) < length - 1) {
        argumentsList += dataObj[element] + ",";
      } else {
        argumentsList += dataObj[element];
      }
    }
  }
  return argumentsList;
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Asy code generator
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function generateAsyCode(dataObj) {
  const {geometry, hAxis, vAxis, funcEntity, funcList, funcListToRender} = deepCopy(dataObj);

  falsifyEmptyArgs(geometry, "geometry");
  falsifyEmptyArgs(hAxis, "hAxis");
  falsifyEmptyArgs(vAxis, "vAxis");

  let geoCode = asyPictureGenerator(geometry);
  let hAxisCode = asyAxisGenerator(hAxis, "x");
  let vAxisCode = asyAxisGenerator(vAxis, "y");

  // console.log(geoCode);
  // console.log("hAxis:", hAxisCode);
  // console.log(vAxisCode);

  if (funcEntity.variableName !== "" && funcListToRender.length > 0) {
    for (const element of funcListToRender) {
      falsifyEmptyArgs(funcList[element], "funcLabel");
      falsifyEmptyArgs(funcList[element], "funcCurve");
      // console.log(funcList[element]);
    }

    let asyCode = "";

    for (const element of funcListToRender) {
      const {
        funcName, funcLabel, funcLabelPos, funcLabelAlign,
        funcLabelPen, funcLabelFill, funcFormula, lBound, uBound,
        parName, parLabel, parValues, conditionFunc, joinOp, joinOpFunc,
        markerType, markerSize, markerFill, markerColor, curvePen, isDrawn
      } = funcList[element];
      const funcData = {
        funcLabel: funcLabel,
        funcLabelPos: funcLabelPos,
        funcLabelAlign: funcLabelAlign,
        funcLabelPen: funcLabelPen,
        funcLabelFill: funcLabelFill
      };
      const pathData = {funcName, lBound, uBound};
      const drawData = {
        Label: asyFuncLabelGenerator(funcData),
        path: asyPathGenerator(pathData),
        align: funcLabelAlign,
        drawPen: "currentpen",
        marker: asyMarkerGenerator(),
      };
      asyCode += asyFuncGenerator({funcName, lBound, uBound, funcFormula, parName, parLabel, parValues}, funcEntity.variableName) + asyDrawGenerator(drawData);
    }
    // console.log(asyCode);
    console.log(geoCode + asyCode + hAxisCode + vAxisCode);
    // return picCode + funcCode + hAxisCode + vAxisCode;
    // } else {
    //   return false;
  }
}



























































































// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Asy defaults assigner
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function setAsyDefaults(dataObj = {}, sliceName = "") {
  switch (sliceName) {
    case "geometry":
      dataObj.width = (dataObj.width !== "")? dataObj.width: "10cm";
      dataObj.height = (dataObj.height !== "")? dataObj.height: "10cm";
      break;

    case "hAxis":
      dataObj.label = (dataObj.label !== "")? dataObj.label: "";
      dataObj.relativePosition = (dataObj.relativePosition !== "")? dataObj.relativePosition: 1;
      dataObj.omitLabels = (dataObj.omitLabels !== "")? dataObj.omitLabels: "";
      dataObj.min = (dataObj.min !== "")? dataObj.min: "-infinity";
      dataObj.max = (dataObj.max !== "")? dataObj.max: "infinity";
      dataObj.align = (dataObj.align !== "")? dataObj.align: "NoAlign";
      dataObj.extend = (dataObj.extend !== "")? dataObj.extend: "true";
      dataObj.endArrow = (dataObj.endArrow !== "")? dataObj.endArrow: "None";
      dataObj.axisPen = (dataObj.axisPen !== "")? dataObj.axisPen: "currentpen";
      dataObj.axisLocation = (dataObj.axisLocation !== "")? dataObj.scale: "bottom";
      dataObj.scale = (dataObj.scale !== "")? dataObj.scale: "linear";
      dataObj.ticks = (dataObj.ticks !== "")? dataObj.ticks: "NoTicks";
      dataObj.ticksLabel = (dataObj.ticksLabel !== "")? dataObj.ticksLabel: "";
      dataObj.ticksLabelFormat = (dataObj.ticksLabelFormat !== "")? dataObj.ticksLabelFormat: "$%0.4g$";
      dataObj.omitTicks = (dataObj.omitTicks !== "")? dataObj.omitTicks: "";
      dataObj.omitTicksLabels = (dataObj.omitTicksLabels !== "")? dataObj.omitTicksLabels: "";
      dataObj.ticksExtend = dataObj.ticksExtend || true;
      dataObj.majorTicksDivision = (dataObj.majorTicksDivision !== "")? dataObj.majorTicksDivision: "1";
      dataObj.minorTicksDivision = (dataObj.minorTicksDivision !== "")? dataObj.minorTicksDivision: "1";
      dataObj.majorTicksSteps = (dataObj.majorTicksSteps !== "")? dataObj.majorTicksSteps: "1";
      dataObj.minorTicksSteps = (dataObj.minorTicksSteps !== "")? dataObj.minorTicksSteps: "1";
      dataObj.majorTicksSize = (dataObj.majorTicksSize !== "")? dataObj.majorTicksSize: "1";
      dataObj.minorTicksSize = (dataObj.minorTicksSize !== "")? dataObj.minorTicksSize: "1";
      dataObj.majorTicksPen = (dataObj.majorTicksSize !== "")? dataObj.majorTicksSize: "currentpen";
      dataObj.minorTicksPen = (dataObj.minorTicksSize !== "")? dataObj.minorTicksSize: "currentpen";
      break;

    case "vAxis":
      dataObj.label = (dataObj.label !== "")? dataObj.label: "";
      dataObj.relativePosition = (dataObj.relativePosition !== "")? dataObj.relativePosition: 1;
      dataObj.omitLabels = (dataObj.omitLabels !== "")? dataObj.omitLabels: "";
      dataObj.min = (dataObj.min !== "")? dataObj.min: "-infinity";
      dataObj.max = (dataObj.max !== "")? dataObj.max: "infinity";
      dataObj.align = (dataObj.align !== "")? dataObj.align: "NoAlign";
      dataObj.extend = (dataObj.extend !== "")? dataObj.extend: "true";
      dataObj.endArrow = (dataObj.endArrow !== "")? dataObj.endArrow: "None";
      dataObj.axisPen = (dataObj.axisPen !== "")? dataObj.axisPen: "currentpen";
      dataObj.axisLocation = (dataObj.axisLocation !== "")? dataObj.scale: "left";
      dataObj.scale = (dataObj.scale !== "")? dataObj.scale: "linear";
      dataObj.ticks = (dataObj.ticks !== "")? dataObj.ticks: "NoTicks";
      dataObj.ticksLabel = (dataObj.ticksLabel !== "")? dataObj.ticksLabel: "";
      dataObj.ticksLabelFormat = (dataObj.ticksLabelFormat !== "")? dataObj.ticksLabelFormat: "$%0.4g$";
      dataObj.omitTicks = (dataObj.omitTicks !== "")? dataObj.omitTicks: "";
      dataObj.omitTicksLabels = (dataObj.omitTicksLabels !== "")? dataObj.omitTicksLabels: "";
      dataObj.ticksExtend = dataObj.ticksExtend || true;
      dataObj.majorTicksDivision = (dataObj.majorTicksDivision !== "")? dataObj.majorTicksDivision: "1";
      dataObj.minorTicksDivision = (dataObj.minorTicksDivision !== "")? dataObj.minorTicksDivision: "1";
      dataObj.majorTicksSteps = (dataObj.majorTicksSteps !== "")? dataObj.majorTicksSteps: "1";
      dataObj.minorTicksSteps = (dataObj.minorTicksSteps !== "")? dataObj.minorTicksSteps: "1";
      dataObj.majorTicksSize = (dataObj.majorTicksSize !== "")? dataObj.majorTicksSize: "1";
      dataObj.minorTicksSize = (dataObj.minorTicksSize !== "")? dataObj.minorTicksSize: "1";
      dataObj.majorTicksPen = (dataObj.majorTicksSize !== "")? dataObj.majorTicksSize: "currentpen";
      dataObj.minorTicksPen = (dataObj.minorTicksSize !== "")? dataObj.minorTicksSize: "currentpen";
      break;

    case "funcLabel":
      dataObj.funcLabel = (dataObj.funcLabel !== "")? dataObj.funcLabel: "";
      dataObj.funcLabelPos = (dataObj.funcLabelPos !== "")? dataObj.funcLabelPos: "(0,0)";
      dataObj.funcLabelPen = (dataObj.funcLabelPen !== "")? dataObj.funcLabelPen: "currentpen";
      break;

    case "funcCurve":
      dataObj.funcFormula = (dataObj.funcFormula !== "")? dataObj.funcFormula: "";
      dataObj.joinOpFunc = (dataObj.joinOpFunc !== "")? dataObj.joinOpFunc: "";
      dataObj.markerSize = (dataObj.markerSize !== "")? dataObj.markerSize: "10pt";
      dataObj.curvePen = (dataObj.curvePen !== "")? dataObj.curvePen: "currentpen";
      break;

    default:
      break;
  }
}
