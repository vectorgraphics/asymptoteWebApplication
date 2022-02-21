import { cloneDeep, isEqual } from "lodash-es";
import { asyPicCodeGen } from "./asyPicture";
import { asyFuncCodeGen } from "./asyFunction";
// import { asyAxisCodeGen } from "./asyAxes";
// import { asyPenCodeGen } from "./asyPens";
// import { asyLabelCodeGen } from "./asyLabels";
import { asySpecialDefaults } from "./asyData";

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Asy final code generator
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function enrichRenderDataObj(renderDataObj, specialValues) {
  const {picObj, funcsObj, axesObj, pensObj, LabelsObj, funcListToCode, axisListToCode, penListToCode, LabelListToCode} = cloneDeep(renderDataObj);
  const funcsArray = Object.keys(funcsObj);
  const axesArray = Object.keys(axesObj);
  const pensArray = Object.keys(pensObj);
  const LabelsArray = Object.keys(LabelsObj);

  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%    Functions
  for (const funcId of funcsArray) {
    funcsObj[funcId].funcName = funcId;
    const funcLabel = funcsObj[funcId].funcLabel;
    const curvePen = funcsObj[funcId].curvePen;
    if (funcLabel !== asySpecialDefaults.Label.preview && LabelListToCode.indexOf(funcLabel) === -1) {
      LabelListToCode.push(funcLabel);
    }
    if (curvePen !== asySpecialDefaults.pen.preview && penListToCode.indexOf(curvePen) === -1) {
      penListToCode.push(curvePen);
    }
  }

  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%    Axes
  for (const axisId of axesArray) {
    axesObj[axisId].axisName = axisId
    const axisPen = axesObj[axisId].axisPen;
    const majorTicksPen = axesObj[axisId].majorTicksPen;
    const minorTicksPen = axesObj[axisId].minorTicksPen;
    if (axisPen !== asySpecialDefaults.pen.preview && penListToCode.indexOf(axisPen) === -1) {
      penListToCode.push(axisPen);
    }
    if (majorTicksPen !== asySpecialDefaults.pen.preview && penListToCode.indexOf(majorTicksPen) === -1) {
      penListToCode.push(majorTicksPen);
    }
    if (minorTicksPen !== asySpecialDefaults.pen.preview && penListToCode.indexOf(minorTicksPen) === -1) {
      penListToCode.push(minorTicksPen);
    }
  }
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%    Pens
  for (const penId of pensArray) {
    pensObj[penId].penName = penId;
  }
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%    Labels
  for (const LabelId of LabelsArray) {
    LabelsObj[LabelId].LabelName = LabelId;
  }

  return {
    picObj,
    funcsObj,
    axesObj,
    pensObj,
    LabelsObj,
    funcListToCode,
    axisListToCode,
    penListToCode,
    LabelListToCode
  };
}

export function generateAsyCode(dataObj) {
  const modulesToImport = ["graph"];
  const penRequiredModules = [];
  // const {picObj, funcsObj, axesObj, pensObj, LabelsObj, funcListToCode, axisListToCode, penListToCode, LabelListToCode} = enrichRenderDataObj(dataObj);
  const {picObj, funcsObj, axesObj, pensObj, LabelsObj, funcListToCode, axisListToCode, penListToCode, LabelListToCode} = dataObj;
  const asyPictureCode = asyPicCodeGen(picObj);
  // const asyPensCode = asyPenCodeGen(penListToCode, pensObj, penRequiredModules);
  // const asyLabelsCode = asyLabelCodeGen(LabelListToCode, LabelsObj);
  // const asyAxesCode = asyAxisCodeGen(axisListToCode, axesObj);
  const asyFuncCode = asyFuncCodeGen(funcListToCode, funcsObj);

  // const coreCode = asyPensCode + asyLabelsCode + asyPathCode;
  return {asyFuncCode, asyPictureCode};
}









// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Util Functions
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

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



// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Asy defaults assigner
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function setAsyDefaults(dataObj = {}, sliceName = "") {
  switch (sliceName) {

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

    default:
      break;
  }
}


// const dataObject = {
//   wsId: id,
//   indVar: selectedVar,
//   picData: picData,
//   funcsObj: functions,
//   axesObj: axes,
//   pensObj: pens,
//   LabelsObj: Labels,
//   funcListToCode: [],
//   axisListToCode: [],
//   penListToCode: [],
//   LabelListToCode: [],
//   options: {
//     verbose: "false",
//     docs: "true",
//     comments: "true",
//   }

