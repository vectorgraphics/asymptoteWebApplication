import { deepCopy } from "../utils/generalTools";

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  ASY PICTURE GENERATOR
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function asyPictureGenerator(geoData) {
  return `import graph;\nsize(${geoData.width}, ${geoData.height}, ${geoData.aspectRatio});\n\n`;
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  ASY FUNCTION GENERATOR
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function asyFuncGenerator(funcData, variableName) {
  if (funcData.parName === undefined || funcData.parName === "") {
    return `real ${funcData.funcName}(real ${variableName}) {\n  return ${funcData.funcFormula};\n}\n` +
       `draw(currentpicture, ${funcData.funcName}, ${funcData.lBound}, ${funcData.uBound}, \"${funcData.funcLabel}\", ${funcData.funcLabelAlign}, ${funcData.funcLabelPen}, None, NoMargin, "", ${funcData.markerType});\n\n`;
  } else {
    return `real ${funcData.funcName}(real ${variableName}, ${funcData.parName}) {\n  return ${funcData.funcFormula};\n}` +
      `draw(currentpicture, ${funcData.funcName}, ${funcData.lBound}, ${funcData.uBound}, \"${funcData.funcLabel}\", ${funcData.funcLabelAlign}, ${funcData.funcLabelPen}, None, NoMargin, "", ${funcData.markerType});\n\n`;
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  ASY AXIS GENERATOR
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function asyAxisGenerator(axisData, axisType="x") {
  if (axisType === "x") {
    if (axisData.axisLabel !== "") {
      return `xaxis(currentpicture, $${axisData.label}$, (${axisData.extend}), ${axisData.min}, ${axisData.max}, ${axisData.axisPen}, ${axisData.ticks}, ${axisData.endArrow}, false);\n`;
    }
  } else if (axisType === "y") {
    if (axisData.axisLabel !== "") {
      return `yaxis(currentpicture, $${axisData.label}$, (${axisData.extend}), ${axisData.min}, ${axisData.max}, ${axisData.axisPen}, ${axisData.ticks}, ${axisData.endArrow}, false);\n`;
    } else {
      console.error("Axis type is not supported!");
      return null;
    }
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  ASY TICKS GENERATOR
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function asyTicksGenerator(ticksData, axis="verticalAxis") {
  if (ticksData.ticks !== "NoTicks") {
    return (
      `
      ${ticksData.ticks}(${ticksData.ticksLabelFormat}, ${ticksData.ticksLabel},
        ${ticksData.ticksBeginLabel},${ticksData.ticksEndLabel},
        ${ticksData.majorTicksSteps}, ${ticksData.minorTicksSteps},
        ${ticksData.ticksBegin}, ${ticksData.ticksEnd}, None,
        ${ticksData.majorTicksSize}, ${ticksData.minorTicksSize}, ${ticksData.ticksExtend},
        ${ticksData.majorTicksPen}, ${ticksData.minorTicksPen});
      `
    );
  } else {
    return "";
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%  ASY FUNCTION LABEL GENERATOR
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function asyFuncLabelGenerator(funcLabelData) {
  if (funcLabelData.funcLabel !== "") {
    return (
      `
      label(currentpicture, ${funcLabelData.funcLabel}, ${funcLabelData.funcLabelPos},
        ${funcLabelData.funcLabelAlign}, ${funcLabelData.funcLabelPen}, ${funcLabelData.funcLabelFill});
      `
    );
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  ASY DEFAULTS ASSIGNOR
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function setAsyDefaults(dataObj = {}, sliceName = "") {
  switch (sliceName) {
    case "geometry":
      dataObj.width = dataObj.width || "10cm";
      dataObj.height = dataObj.height || "10cm";
      break;
    case "hAxis":
      dataObj.label = dataObj.label || "";
      dataObj.relativePosition = dataObj.relativePosition || 1;
      dataObj.omitLabels = dataObj.omitLabels || "";
      dataObj.extend = dataObj.extend || "true";
      dataObj.axisPen = dataObj.axisPen || "currentpen";
      dataObj.min = dataObj.min || "-infinity";
      dataObj.max = dataObj.max || "infinity";
      dataObj.ticksLabel = dataObj.ticksLabel || "";
      dataObj.ticksLabelFormat = dataObj.ticksLabelFormat || "$%0.4g$";
      dataObj.omitTicks = dataObj.omitTicks || "";
      dataObj.omitTicksLabels = dataObj.omitTicksLabels || "";
      dataObj.majorTicksDivision = dataObj.majorTicksDivision || "1";
      dataObj.minorTicksDivision = dataObj.minorTicksDivision || "1";
      dataObj.majorTicksSteps = dataObj.majorTicksSteps || "1";
      dataObj.minorTicksSteps = dataObj.minorTicksSteps || "1";
      dataObj.majorTicksSize = dataObj.majorTicksSize || "1";
      dataObj.minorTicksSize = dataObj.minorTicksSize || "1";
      dataObj.majorTicksPen = dataObj.majorTicksSize || "currentpen";
      dataObj.minorTicksPen = dataObj.minorTicksSize || "currentpen";
      break;
    case "vAxis":
      dataObj.label = dataObj.label || "";
      dataObj.relativePosition = dataObj.relativePosition || 1;
      dataObj.omitLabels = dataObj.omitLabels || "";
      dataObj.axisPen = dataObj.axisPen || "currentpen";
      dataObj.min = dataObj.min || "-infinity";
      dataObj.max = dataObj.max || "infinity";
      dataObj.ticksLabel = dataObj.ticksLabel || "";
      dataObj.ticksLabelFormat = dataObj.ticksLabelFormat || "$%0.4g$";
      dataObj.omitTicks = dataObj.omitTicks || "";
      dataObj.omitTicksLabels = dataObj.omitTicksLabels || "";
      dataObj.majorTicksDivision = dataObj.majorTicksDivision || "1";
      dataObj.minorTicksDivision = dataObj.minorTicksDivision || "1";
      dataObj.majorTicksSteps = dataObj.majorTicksSteps || "1";
      dataObj.minorTicksSteps = dataObj.minorTicksSteps || "1";
      dataObj.majorTicksSize = dataObj.majorTicksSize || "1";
      dataObj.minorTicksSize = dataObj.minorTicksSize || "1";
      dataObj.majorTicksPen = dataObj.majorTicksSize || "currentpen";
      dataObj.minorTicksPen = dataObj.minorTicksSize || "currentpen";
      break;
    case "function":
      dataObj.funcLabel = dataObj.funcLabel || "";
      dataObj.funcLabelPos = dataObj.funcLabelPos || "(0,0)";
      dataObj.funcLabelPen = dataObj.funcLabelPen || "currentpen";
      dataObj.funcFormula = dataObj.funcFormula || "";
      dataObj.joinOpFunc = dataObj.joinOpFunc || "";
      dataObj.markerSize = dataObj.markerSize || "10pt";
      dataObj.curvePen = dataObj.curvePen || "current";
      break;
    default:
      break;
  }
}


// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  ASY CODE GENERATOR
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function generateAsyCode(allCodeDataObject) {
  const {geometry, hAxis, vAxis, funcEntity, fList, renderObj} = deepCopy(allCodeDataObject);
  const funcListToRender = Object.keys(renderObj);

  // console.log(geometry);
  // console.log(hAxis);
  // console.log(vAxis);
  // console.log(funcEntity);
  // console.log(fList);
  // console.log(renderObj);

  if (funcEntity.variableName !== "" && funcListToRender.length > 0) {
    setAsyDefaults(geometry, "geometry");
    setAsyDefaults(hAxis, "hAxis");
    setAsyDefaults(vAxis, "vAxis");
    let funcCode = "";
    let picCode = asyPictureGenerator(geometry);
    let hAxisCode = asyAxisGenerator(hAxis, "x");
    let vAxisCode = asyAxisGenerator(vAxis, "y");
    for (const element of funcListToRender) {
      setAsyDefaults(fList[element], "function");
      funcCode += asyFuncGenerator(fList[element], funcEntity.variableName);
    }
    return picCode + funcCode + hAxisCode + vAxisCode;
  } else {
    return false;
  }
}




