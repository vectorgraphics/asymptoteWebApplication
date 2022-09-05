// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%   Draw Tab component
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { idSelector, functionsSelector, axesSelector, pensSelector, LabelsSelector } from "../../../../../store/selectors";
import { makeStyles, Button, TextField } from "@material-ui/core";
import { PreviewPane } from "../GMComponents/PreviewPane.js";
import { ComboBox } from "../../../Atoms/ComboBox";
import { MultipleSelect } from "../../../Atoms/MultipleSelect";
import { legendStyler, dataArrayGen } from "../../../../../utils/appTools";
import { generateAsyCode } from "../../../../../utils/AsyTools/asyCodeGen";
import { asyPicData as picInitState } from "../../../../../utils/AsyTools/asyData";

const useStyle = makeStyles((theme) => ({
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Legend of FieldSet
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  legend: legendStyler(),
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Draw Tab Style
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  tabCont: {
    display: "flex",
    flexFlow: "column nowrap",
    minHeight: "calc(100vh - 6rem)",
    margin: "1rem",
    // border: "1px solid blue",
  },
  tabMenuBar: {
    display: "grid",
    gridColumn: "1/3",
    minHeight: "7rem",
    maxHeight: "7rem",
    padding: "0.5rem",
    alignItems: "center",
    // backgroundColor: "lightgrey",
    border: "2px solid rgb(65, 65, 65)",
  },
  pictureFieldSet: {
    display: "grid",
    gridColumn: "1/2",
    padding: "1rem",
    minHeight: "5.5rem",
    maxHeight: "5.5rem",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px groove black",
    borderRadius: "4px",
  },
  width: {
    width: "8rem",
    gridColumn: "1/2",
    marginTop: "-0.5rem",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  height: {
    width: "8rem",
    gridColumn: "2/3",
    marginTop: "-0.5rem",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  aspect: {
    gridColumn: "3/4",
  },
  funcAxesFieldSet: {
    display: "grid",
    gridColumn: "2/3",
    padding: "1rem",
    margin: "0 0.5rem",
    minHeight: "5.5rem",
    maxHeight: "5.5rem",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px groove black",
    borderRadius: "4px",
  },
  variable: {
    gridColumn: "1/2",
  },
  functions: {
    marginTop: "-0.75rem",
    gridColumn: "2/3",
  },
  axes: {
    marginTop: "-0.75rem",
    gridColumn: "3/4",
  },
  ctrlFieldSet: {
    display: "grid",
    gridColumn: "3/4",
    padding: "1rem",
    minHeight: "5.5rem",
    maxHeight: "5.5rem",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px groove black",
    borderRadius: "4px",
  },
  draw: {
    gridColumn: "1/2",
    minWidth: "8rem",
    minHeight: "2.25rem",
  },
  mapToCode: {
    gridColumn: "2/3",
    minWidth: "8rem",
    minHeight: "2.25rem",
  },
  lowerPanel: {
    flex: "1 1 auto",
    display: "flex",
    flexFlow: "row nowrap",
    minHeight: "45rem",
  },
  preview: {
    display: "block",
    flex: "1 1 auto",
    gridColumn: "1/2",
    marginTop: "1rem",
    minWidth: "calc(80% - 1rem)",
    // backgroundColor: "lightgrey",
    border: "2px solid rgb(65, 65, 65)",
  },
  sidePanel: {
    display: "block",
    marginLeft: "1rem",
    marginTop: "1rem",
    minWidth: "20%",
    gridColumn: "2/3",
    // backgroundColor: "lightgrey",
    border: "2px solid rgb(65, 65, 65)",
  }
}));

export function DrawTab(props) {
  const locClasses = useStyle();

  // Data Model Connection
  const id = useSelector(idSelector);
  const dispatch = useDispatch();

  const functionsObj = useSelector(functionsSelector)[id];
  const axesObj = useSelector(axesSelector);
  const pensObj = useSelector(pensSelector);
  const LabelsObj = useSelector(LabelsSelector);

  const funcsArray = Object.keys(functionsObj);
  const axesArray = Object.keys(axesObj);
  const pensArray = Object.keys(pensObj);
  const LabelsArray = Object.keys(LabelsObj);

  // Component Basic States
  const [picData, setPicData] = useState(picInitState);
  const [selectedVar, setSelectedVar] = useState("None");
  const [selectedFuncList, setSelectedFuncList] = useState([]);
  const [selectedAxisList, setSelectedAxisList] = useState([]);

  // Local States
  const {varNames, varFuncPairs} = varFuncInfo(functionsObj);

  return (
    <div className={locClasses.tabCont}>
      <div className={locClasses.tabMenuBar}>

        <fieldset className={locClasses.pictureFieldSet}>
          <legend className={locClasses.legend}> Picture </legend>
          <TextField
            className={locClasses.width} size="small" label="width" value={picData.width}
            onChange={(event) => setPicData({...picData, width: event.target.value})}
          />
          <TextField
            className={locClasses.height} size="small" label="height" value={picData.height}
            onChange={(event) => setPicData({...picData, height: event.target.value})}
          />
          <ComboBox
            className={locClasses.aspect}
            label="aspect ratio" dataArray={[{text:"Aspect"}, {text:"Ignore-Aspect"}]}
            width="9rem" property="text" value={{text: picData.aspectRatio}}
            onChange={(event, value) => (value !== null)? setPicData({...picData, aspectRatio: value.text}): null}
          />
        </fieldset>

        <fieldset className={locClasses.funcAxesFieldSet}>
          <legend className={locClasses.legend}> Functions & Axes </legend>
          <ComboBox
            className={locClasses.variable} label="variable" dataArray={dataArrayGen(varNames, {text: "None"})}
            width="9rem" property="text" value={{text: selectedVar}}
            onChange={(event, value) => (value !== null)? setSelectedVar(value.text): null}
          />
          <MultipleSelect
            className={locClasses.functions} label="Functions" listOfItems={varToFuncList(varFuncPairs, selectedVar)}
            selectedList={selectedFuncList} setSelectedList={setSelectedFuncList} disabled={selectedVar === "None"}
          />
          <MultipleSelect
            className={locClasses.axes} label="Axes" listOfItems={["None", ...axesArray]}
            selectedList={selectedAxisList} setSelectedList={setSelectedAxisList}
          />
        </fieldset>

        <fieldset className={locClasses.ctrlFieldSet}>
          <legend className={locClasses.legend}> Draw & Map </legend>
          <Button classes={{root: locClasses.draw}}
            onClick={() => {
              const dataObject = {
                indVar: selectedVar,
                picObj: picData,
                funcsObj: functionsObj,
                axesObj: axesObj,
                pensObj: pensObj,
                LabelsObj: LabelsObj,
                funcListToCode: selectedFuncList,
                axisListToCode: [],
                penListToCode: [],
                LabelListToCode: [],
                options: {
                  verbose: "false",
                  docs: "true",
                  comments: "true",
                }
              }
              console.log(dataObject);
              const code = generateAsyCode(dataObject);
              console.log(code);
            }}
          > draw </Button>
          <Button classes={{root: locClasses.mapToCode}}> map to code </Button>
        </fieldset>

      </div>

      <div className={locClasses.lowerPanel}>
        <div className={locClasses.preview}> <PreviewPane/> </div>
        {/*<div className={locClasses.sidePanel}> </div>*/}
      </div>
    </div>
  );
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Data Collections
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Internal Functions
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const varFuncInfo = (functionsObj) => {
  const varNames = [], varFuncPairs = [];
  for (const item in functionsObj) {
    if (varNames.indexOf(functionsObj[item].varName) === -1) {
      varNames.push(functionsObj[item].varName);
    }
    varFuncPairs.push({varName: functionsObj[item].varName, funcName: item});
  }
  return {
    varNames,
    varFuncPairs
  }
};

const varToFuncList = (varFuncPairs, variable) => {
  const funcList = [];
  for (const pair of varFuncPairs) {
    if (pair.varName === variable) {
      funcList.push(pair.funcName);
    }
  }
  return funcList;
};


