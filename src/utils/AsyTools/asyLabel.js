// import { asySpecialDefaults } from "./asyData";
import {cloneDeep} from "lodash-es";
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Asy Labels defaults
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function LabelDefaultsCheck(LabelObj) {

  const modifiedLabelObj = cloneDeep(LabelObj);
  if (modifiedLabelObj.positionPair !== "") {
    modifiedLabelObj.position = modifiedLabelObj.positionPair;
  } else {
    modifiedLabelObj.position = modifiedLabelObj.relativePos;
  }
  if (modifiedLabelObj.fillType === "NoFill") {
    modifiedLabelObj.fillType = null;
  }
  if (modifiedLabelObj.pen === "default pen") {
    modifiedLabelObj.pen = null;
  }
  return modifiedLabelObj;
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Asy Label generator
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function asyLabelCodeGen(LabelListToCode, LabelsObj, moduleToImport) {
  // Label Label(string s="", pair position, align align=NoAlign,
  //             pen p=nullpen, embed embed=Rotate, filltype filltype=NoFill);

  // Complete list of asy arguments for 'Label':
  // ["string", "position", "align", "pen", "embed", "filltype"]
  const LabelDefinitions = [];
  for (const LabelId of LabelListToCode) {
    const refinedLabelObj = LabelDefaultsCheck(LabelsObj[LabelId]);
    const LabelArgOrder = ["string", "position", "align", "pen", "filltype"];              // ---> implemented
    let args = [];
    for (const property of LabelArgOrder) {
      if (refinedLabelObj[property]) {
        args.push(refinedLabelObj[property]);
      }
    }
    LabelDefinitions.push(`
    Label ${refinedLabelObj.LabelName} = Label(${args.join(",")});
    `);
  }
  return LabelDefinitions;
}

