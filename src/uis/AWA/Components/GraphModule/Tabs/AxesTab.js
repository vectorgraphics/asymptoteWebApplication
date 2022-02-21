// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%   Axes Tab component
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { axActionCreator } from "../../../../../store/graphModule";
import { idSelector, axesSelector, pensSelector, LabelsSelector } from "../../../../../store/selectors";
import { makeStyles, TextField } from "@material-ui/core";
import { DefTableConsole } from "../GMComponents/DefTableConsole";
import { TabControls } from "../GMComponents/TabControls";
import { ComboBox } from "../../../Atoms/ComboBox";
import { isUniqueName, isValidName } from "../../../../../utils/validators";
import { addSaveActions, dataArrayGen, legendStyler } from "../../../../../utils/appTools";
import { asyAxisData } from "../../../../../utils/AsyTools/asyData";
import { isEqual } from "lodash-es";
import { SelectField } from "../../../Atoms/SelectField";

const axesStyle = makeStyles((theme) => ({
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Legend of FieldSet
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  legend: legendStyler(),
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Axes Fieldset
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  axesFieldSet: {
    display: "grid",
    padding: "1rem",
    margin: "1rem",
    minHeight: "calc(100% - 4rem)",
    border: "2px groove black",
    borderRadius: "4px",
  },
  axesElementsContainer: {
    display: "grid",
    alignContent: "space-between",
    alignItems: "center",
    // border: "1px solid red",
  },
  axesNameAndSelector: {
    display: "grid",
  },
  axesName: {
    width: "8rem",
    marginTop: "-0.5rem",
    gridColumn: "1/2",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  axisSelector: {
    gridColumn: "2/3",
    justifySelf: "end",
  },
  axisMainPropsFieldSet: {
    marginTop: "0.5rem",
    border: "2px groove black",
    borderRadius: "4px",
  },
  axisMainProps: {
    display: "grid",
    height: "7.5rem",
    padding: "0.5rem 0.5rem",
    justifyContent: "space-between",
    alignContent: "space-between",
    alignItems: "center",
    gridTemplateColumns: "repeat(5, 8rem)",
    // border: "1px solid purple",
  },
  axisLabel: {
    width: "8rem",
    gridColumn: "1/2",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  axisMin: {
    width: "8rem",
    marginTop: "-0.5rem",
    gridColumn: "2/3",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  axisMax: {
    width: "8rem",
    marginTop: "-0.5rem",
    gridColumn: "3/4",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  axisAlign: {
    width: "8rem",
    marginTop: "-0.5rem",
    gridColumn: "4/5",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  axisLocation: {
    gridColumn: "5/6",
  },
  axisScale: {
    gridColumn: "1/2",
  },
  axisExtended: {
    gridColumn: "2/3",
  },
  axisEndArrow: {
    width: "8rem",
    gridColumn: "3/4",
  },
  axisPen: {
    width: "8rem",
    gridColumn: "4/5",
    "& label": {
      fontSize: "0.85rem",
    }
  },
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  ticksSelector: {
    // border: "1px solid green",
  },
  ticksPropsFieldSet: {
    display: "block",
    marginTop: "0.5rem",
    border: "2px groove black",
    borderRadius: "4px",
  },
  ticksProps: {
    display: "grid",
    height: "10rem",
    padding: "0.5rem 0.5rem",
    justifyContent: "space-between",
    alignContent: "space-between",
    gridTemplateColumns: "repeat(5, 8rem)",
  },
  tickLabel: {
    width: "8rem",
    gridColumn: "1/2",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  tickLabelFormat: {
    width: "8rem",
    marginTop: "-0.5rem",
    gridColumn: "2/3",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  omitTickLabels: {
    gridColumn: "3/4",
    marginTop: "-0.5rem",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  omitTicks: {
    marginTop: "-0.5rem",
    gridColumn: "4/5",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  majorTickDivision: {
    width: "8rem",
    marginTop: "-0.5rem",
    gridColumn: "5/6",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  minorTickDivision: {
    width: "8rem",
    marginTop: "-0.5rem",
    gridColumn: "1/2",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  majorTickSteps: {
    width: "8rem",
    marginTop: "-0.5rem",
    gridColumn: "2/3",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  minorTickSteps: {
    width: "8rem",
    marginTop: "-0.5rem",
    gridColumn: "3/4",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  majorTickSize: {
    width: "8rem",
    marginTop: "-0.5rem",
    gridColumn: "4/5",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  minorTickSize: {
    width: "8rem",
    marginTop: "-0.5rem",
    gridColumn: "5/6",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  majorTickPen: {
    width: "8rem",
    gridColumn: "1/2",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  minorTickPen: {
    width: "8rem",
    gridColumn: "2/3",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  ticksExtend: {
    width: "8rem",
    gridColumn: "3/4",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Buttons & Console
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  CtrlBtnsCont: {
    display: "grid",
    marginTop: "1rem",
    justifyContent: "space-between",
    // border: "1px solid blue",
  },
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Axes List Fieldset
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  tableAndConsole: {
    display: "flex",
    flexFlow: "column",
    minHeight: "22.3rem",
    marginTop: "0.5rem",
    // border: "1px solid blue",
  },
}))

export function AxesTab(props) {
  const locClasses = axesStyle(props);

  // Data Model Connection
  const id = useSelector(idSelector);
  const axes = useSelector(axesSelector);
  const LabelsArray = Object.keys(useSelector(LabelsSelector));
  const pensArray = Object.keys(useSelector(pensSelector));
  const dispatch = useDispatch();

  // Component Basic States
  const [axisType, setAxisType] = useState("Horizontal");
  const [axisName, setAxisName] = useState("");
  const [axisData, setAxisData] = useState(getAxisInitState(axisType));
  let axisLocationData = (axisType === "Horizontal")? hAxisLocationData: vAxisLocationData;

  // Error & Actions Management
  const [axisNameErr, setAxisNameErr] = useState(false);
  const complexDataObj = {
    axesName: {
      value: axisName,
      errSetter: setAxisNameErr,
      validator: isValidName,
      uniqueness: isUniqueName,
      textName: "axis name"
    },
  };

  // In connection with DefTableConsoleMui component
  const assignedAxisNames = Object.keys(axes);
  const [editState, setEditState] = useState(false);
  const [consoleContent, setConsoleContent] = useState([]);
  const [selectionList, setSelectionList] = useState([]);
  const [deselectReq, setDeselectReq] = useState(0);
  const tableHeaderSelector = ["id", "label", "min", "max", "axisLocation", "axisPen", "ticks", "ticksLabel", "ticksLabelFormat"];
  const tableHeaderDisp = ["axis name", "label", "min", "max", "axis location", "axis pen", "axis ticks", "ticks label", "ticks label format"];

  useEffect(() => setAxisData(getAxisInitState(axisType)), [axisType]);

  useEffect(() => {
    if (selectionList.length === 1) {
      setAxisData(axes[selectionList[0]]);
      setAxisName(selectionList[0]);
    } else {
      setAxisData({...getAxisInitState(axisType)});
      setAxisName("");
    }
  }, [selectionList]);

  useEffect(() => {
    if (selectionList.length === 1) {
      if (isEqual(axisData, axes[selectionList[0]])) {
        setEditState(false);
      } else {
        setEditState(true);
      }
    } else {
      setEditState(false);
    }
  }, [axisData, selectionList]);



  return (
    <fieldset className={locClasses.axesFieldSet}>
      <legend className={locClasses.legend}> Axes Definition </legend>
      <div className={locClasses.axesElementsContainer}>
        <div className={locClasses.axesNameAndSelector}>
          <TextField
            className={locClasses.axesName} size="small" label="axes group name" value={axisName}
            onBlur={(event) => setAxisNameErr(event.target.value.trim() === "")}
            onChange={(event) => {
              setAxisNameErr(event.target.value.trim() === "" || !isValidName(event.target.value.trim()));
              setAxisName(event.target.value.trim());
            }}
            error={axisNameErr}
          />
          <ComboBox
            className={locClasses.axisSelector} label="axis type" dataArray={[{text: "Horizontal"}, {text: "Vertical"}]}
            width="8rem" property="text" value={{text: axisType}}
            onChange={(event, value) => (value !== null)? setAxisType(value.text): null}
          />
        </div>
        <fieldset className={locClasses.axisMainPropsFieldSet}>
          <legend className={locClasses.legend}> Axis Main Properties </legend>
          <div className={locClasses.axisMainProps}>
            <ComboBox
              className={locClasses.axisLabel} label="axis label" dataArray={dataArrayGen(LabelsArray, {text: axisData.label})}
              width="8rem" property="text" value={{text: axisData.label}}
              onChange={(event, value) => (value !== null)? setAxisData({...axisData, label: value.text}): null}
            />
            <TextField
              className={locClasses.axisMin} size="small" label="min" value={axisData.min}
              onChange={(event) => setAxisData({...axisData, min: event.target.value})}
            />
            <TextField
              className={locClasses.axisMax} size="small" label="max" value={axisData.max}
              onChange={(event) => setAxisData({...axisData, max: event.target.value})}
            />
            <TextField
              className={locClasses.axisAlign} size="small" label="align" value={axisData.align}
              onChange={(event) => setAxisData({...axisData, align: event.target.value})}
            />
            <ComboBox
              className={locClasses.axisLocation} label="axis-location" dataArray={axisLocationData}
              width="8rem" property="text" value={{text: axisData.axisLocation}}
              onChange={(event, value) => (value !== null)? setAxisData({...axisData, axisLocation: value.text}): null}
            />
            <ComboBox
              className={locClasses.axisScale} label="scale" dataArray={axisScalesData}
              width="8rem" property="text" value={{text: axisData.scale}}
              onChange={(event, value) => (value !== null)? setAxisData({...axisData, scale: value.text}): null}/>
            <ComboBox
              className={locClasses.axisExtended} label="extend" dataArray={conditionalData}
              width="8rem" property="text" value={{text: axisData.extend}}
              onChange={(event, value) => (value !== null)? setAxisData({...axisData, extend: value.text}): null}/>
            <ComboBox
              className={locClasses.axisEndArrow} label="endArrow" dataArray={axisEndArrowData}
              width="rem" property="text" value={{text: axisData.endArrow}}
              onChange={(event, value) => (value !== null)? setAxisData({...axisData, endArrow: value.text}): null}/>
            <ComboBox
              className={locClasses.axisPen} label="axis pen" dataArray={dataArrayGen(pensArray, {text: axisData.axisPen})}
              width="8rem" property="text" value={{text: axisData.axisPen}}
              onChange={(event, value) => (value !== null)? setAxisData({...axisData, minorTicksPen: value.text}): null}
            />
            <ComboBox
              className={locClasses.ticksSelector}
              label="ticks" width="8rem" property="text" value={{text: axisData.ticks}} dataArray={ticksData}
              onChange={(event, value) => (value !== null)? setAxisData({...axisData, ticks: value.text}): null}
            />
          </div>
        </fieldset>

        <fieldset className={locClasses.ticksPropsFieldSet}>
          <legend className={locClasses.legend}> Axis Ticks Properties </legend>
          <div className={locClasses.ticksProps}>
            <ComboBox
              className={locClasses.tickLabel} label="tick label" dataArray={conditionalData}
              width="8rem" property="text" value={{text: axisData.tickLabel}}
              onChange={(event, value) => (value !== null)? setAxisData({...axisData, tickLabel: value.text}): null}
              disabled={(axisData.ticks === "NoTicks")}
            />
            <TextField
              className={locClasses.tickLabelFormat} size="small" label="label format" value={axisData.tickLabelFormat}
              onChange={(event) => setAxisData({...axisData, tickLabelFormat: event.target.value})}
              disabled={(axisData.ticks === "NoTicks")}
            />
            <TextField
              className={locClasses.omitTickLabels} size="small" label="omit tick label(s)" value={axisData.omitTicksLabels}
              onChange={(event) => setAxisData({...axisData, omitTickLabels: event.target.value})}
              disabled={(axisData.ticks === "NoTicks")}
            />
            <TextField
              className={locClasses.omitTicks} size="small" label="omit ticks" value={axisData.omitTicks}
              onChange={(event) => setAxisData({...axisData, omitTicks: event.target.value})}
              disabled={(axisData.ticks === "NoTicks")}
            />
            <TextField
              className={locClasses.majorTickDivision} size="small" label="major division" value={axisData.majorTickDivision}
              onChange={(event) => setAxisData({...axisData, majorTickDivision: event.target.value})}
              disabled={(axisData.ticks === "NoTicks")}
            />
            <TextField
              className={locClasses.minorTickDivision} size="small" label="minor division" value={axisData.minorTickDivision}
              onChange={(event) => setAxisData({...axisData, minorTickDivision: event.target.value})}
              disabled={(axisData.ticks === "NoTicks")}
            />
            <TextField
              className={locClasses.majorTickSteps} size="small" label="major steps" value={axisData.majorTickSteps}
              onChange={(event) => setAxisData({...axisData, majorTickSteps: event.target.value})}
              disabled={(axisData.ticks === "NoTicks")}
            />
            <TextField
              className={locClasses.minorTickSteps} size="small" label="minor steps" value={axisData.minorTickSteps}
              onChange={(event) => setAxisData({...axisData, minorTickSteps: event.target.value})}
              disabled={(axisData.ticks === "NoTicks")}
            />
            <TextField
              className={locClasses.majorTickSize} size="small" label="major size" value={axisData.majorTickSize}
              onChange={(event) => setAxisData({...axisData, majorTickSize: event.target.value})}
              disabled={(axisData.ticks === "NoTicks")}
            />
            <TextField
              className={locClasses.minorTickSize} size="small" label="minor size" value={axisData.minorTickSize}
              onChange={(event) => setAxisData({...axisData, minorTickSize: event.target.value})}
              disabled={(axisData.ticks === "NoTicks")}
            />
            <ComboBox
              className={locClasses.majorTickPen} label="major pen" dataArray={dataArrayGen(pensArray, {text: axisData.majorTickPen})}
              width="8rem" property="text" value={{text: axisData.majorTickPen}}
              onChange={(event, value) => (value !== null)? setAxisData({...axisData, majorTickPen: value.text}): null}
              disabled={(axisData.ticks === "NoTicks")}
            />
            <ComboBox
              className={locClasses.minorTickPen} label="minor pen" dataArray={dataArrayGen(pensArray, {text: axisData.minorTickPen})}
              width="8rem" property="text" value={{text: axisData.minorTickPen}}
              onChange={(event, value) => (value !== null)? setAxisData({...axisData, minorTickPen: value.text}): null}
              disabled={(axisData.ticks === "NoTicks")}
            />
            <ComboBox
              className={locClasses.ticksExtend} label="ticks extend" dataArray={conditionalData}
              width="8rem" property="text" value={{text: axisData.ticksExtend}}
              onChange={(event, value) => (value !== null)? setAxisData({...axisData, ticksExtend: value.text}): null}
              disabled={(axisData.ticks === "NoTicks")}
            />
          </div>
        </fieldset>
      </div>
      <TabControls
        className={locClasses.CtrlBtnsCont} selectionList={selectionList} editState={editState} assignedNames={assignedAxisNames}
        onAdd={(event) => {
          addSaveActions(complexDataObj, assignedAxisNames, (value) => {
            dispatch(axActionCreator.addAxis(axisName, axisData));
            setConsoleContent(value);
          }, (value) => {
            setConsoleContent(value);
          })
        }}
        onSave={(event) => {
          addSaveActions(complexDataObj, [], (value) => {
            dispatch(axActionCreator.addAxis(axisName, axisData));
            setConsoleContent(value);
            setEditState(false);
            setDeselectReq(deselectReq + 1);
          }, (value) => {
            setConsoleContent(value);
          })
        }}
        onDiscard={() => {
          setAxisData(axes[selectionList[0]]);
        }}
        onRemove={() => {
          for (const axisId of selectionList) {
            dispatch(axActionCreator.removeAxis(axisId));
            setSelectionList([]);
          }
        }}
        onCopy={(value) => {
          const copiedValue = {...axes[selectionList[0]]};
          dispatch(axActionCreator.addAxis(value, copiedValue));
          setDeselectReq(deselectReq + 1);
        }}
        onErase={() => {
          setAxisData(getAxisInitState(axisType));
          setAxisName("");
        }}
      />
      <div className={locClasses.tableAndConsole}>
        <DefTableConsole
          totalHeight={22.45} tableFieldName="Axes list" tableRowsDataObj={axes}
          tableHeaderSelector={tableHeaderSelector} tableHeaderDisp={tableHeaderDisp} deselectReq={deselectReq}
          consoleContent={consoleContent} selectionList={selectionList} setSelectionList={setSelectionList}
        />
      </div>
    </fieldset>
  )
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       DATA COLLECTIONS
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const conditionalData = [{text:"true"}, {text:"false"}];
const hAxisLocationData = [{text:"bottom"}, {text:"top"}, {text:"bottom-top"}];
const vAxisLocationData = [{text:"left"}, {text:"right"}, {text:"left-right"}];
const axisScalesData = [{text:"linear"}, {text:"log"}];
const axisEndArrowData = [{text:"None"}, {text:"EndArrow"}];
const ticksData = [{text:"NoTicks"}, {text:"LeftTicks"}, {text:"RightTicks"}, {text:"Ticks"}];

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     Internal Functions
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function getAxisInitState(axisType="Horizontal") {
  return {
    ...asyAxisData,
    axisLocation: (axisType === "Horizontal")? "bottom": "left",
  }
}
