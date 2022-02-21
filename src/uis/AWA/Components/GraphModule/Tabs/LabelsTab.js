// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%   Labels Tab component
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import {useEffect, useState} from "react";
import { useSelector, useDispatch} from "react-redux";
import { lbActionCreator } from "../../../../../store/graphModule";
import { pensSelector, LabelsSelector } from "../../../../../store/selectors";
import { makeStyles, TextField } from "@material-ui/core";
import { DefTableConsole } from "../GMComponents/DefTableConsole";
import { ComboBox } from "../../../Atoms/ComboBox";
import { FillNoFill } from "../Atoms/FillNoFill";
import { TabControls } from "../GMComponents/TabControls";
import { SliderInput } from "../../../Atoms/SliderInput";
import { isUniqueName, isValidName } from "../../../../../utils/validators";
import { addSaveActions, legendStyler, dataArrayGen } from "../../../../../utils/appTools";
import { asyLabelData as LabelInitState } from "../../../../../utils/AsyTools/asyData";
import { isEqual } from "lodash-es";
import { SelectField } from "../../../Atoms/SelectField";

const axesStyle = makeStyles((theme) => ({
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Legend of FieldSet
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  legend: legendStyler(),
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Labels of FieldSet
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  LabelFieldSet: {
    display: "grid",
    padding: "1rem",
    margin: "1rem",
    borderRadius: "4px",
    border: "2px groove black",
  },
  LabelsPropsFieldSet: {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "2px groove black",
  },
  LabelDefElementsContainer: {
    display: "grid",
    height: "2.75rem",
    justifyContent: "space-between",
    alignContent: "space-between",
    gridTemplateColumns: "8rem 8rem 8rem 10rem 9rem 8rem",
    // border: "1px solid pink",
  },
  LabelName: {
    width: "8rem",
    gridColumn: "1/2",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  LabelString: {
    width: "8rem",
    gridColumn: "2/3",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  LabelPosType: {
    width: "8rem",
    marginTop: "0.5rem",
    gridColumn: "3/4",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  LabelRelPos: {
    marginTop: "-0.5rem",
    gridColumn: "4/5",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  LabelPairPos: {
    gridColumn: "4/5",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  LabelFillType: {
    marginTop: "0.5rem",
    gridColumn: "5/6",
  },
  LabelPen: {
    marginTop: "0.5rem",
    gridColumn: "6/7",
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
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Labels List Fieldset
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  tableAndConsole: {
    display: "flex",
    flexFlow: "column",
    minHeight: "40.75rem",
    marginTop: "0.5rem",
    // border: "1px solid blue",
  },
}))


export function LabelsTab(props) {
  const locClasses = axesStyle(props);

  // Data Model Connection
  const Labels = useSelector(LabelsSelector);
  const pensArray = Object.keys(useSelector(pensSelector))
  const dispatch = useDispatch();

  // Component Basic States
  const [positionType, setPositionType] = useState("relative");
  const [LabelName, setLabelName] = useState("");
  const [LabelData, setLabelData] = useState(LabelInitState);

  // Error & Actions Management
  const [LabelNameErr, setLabelNameErr] = useState(false);
  const [LabelStringErr, setLabelStringErr] = useState(false);
  const complexDataObj = {
    LabelName: {
      value: LabelName,
      errSetter: setLabelNameErr,
      validator: isValidName,
      uniqueness: isUniqueName,
      textName: "Label name",
    },
  };

  // In connection with DefTableConsoleMui component
  const assignedLabelNames = Object.keys(Labels);
  const [editState, setEditState] = useState(false);
  const [consoleContent, setConsoleContent] = useState([]);
  const [selectionList, setSelectionList] = useState([]);
  const [deselectReq, setDeselectReq] = useState(0);
  const tableHeaderSelector = ["id", "string", "relativePos", "pen", "fillType"];
  const tableHeaderDisp = ["Label name", "string", "position", "pen", "fill type"];

  useEffect(() => {
    if (selectionList.length === 1) {
      setLabelData(Labels[selectionList[0]]);
      setLabelName(selectionList[0]);
    } else {
      setLabelData({...LabelInitState});
      setLabelName("");
    }
  }, [selectionList]);

  useEffect(() => {
    if (selectionList.length === 1) {
      if (isEqual(LabelData, Labels[selectionList[0]])) {
        setEditState(false);
      } else {
        setEditState(true);
      }
    } else {
      setEditState(false);
    }
  }, [LabelData, selectionList]);


  return (
    <fieldset className={locClasses.LabelFieldSet}>
      <legend className={locClasses.legend}> Label Definition </legend>
      <fieldset className={locClasses.LabelsPropsFieldSet}>
        <legend className={locClasses.legend}> Label Properties </legend>
        <div className={locClasses.LabelDefElementsContainer}>
          <TextField
            className={locClasses.LabelName} size="small" label="Label name" value={LabelName}
            onChange={(event) => {
              setLabelNameErr(event.target.value.trim() === "" || !isValidName(event.target.value.trim()));
              setLabelName(event.target.value.trim());
            }}
            error={LabelNameErr}
          />
          <TextField
            className={locClasses.LabelString} size="small" label="Label string" value={LabelData.string}
            onChange={(event) => setLabelData({...LabelData, string: event.target.value})}
            onBlur={(event) => setLabelStringErr(LabelName.trim() !== "" && event.target.value.trim() === "")}
            error={LabelStringErr}
          />
          <ComboBox
            className={locClasses.LabelPosType} label="Label position" dataArray={[{text: "relative"}, {text: "pair"}]}
            width="8rem" property="text" value={{text: positionType}}
            onChange={(event, value) => (value !== null)? setPositionType(value.text): null}
          />
          {
            (positionType === "relative")
              ? <SliderInput
                  className={locClasses.LabelRelPos} defaultValue={0.5}
                  onSliderChange={(newValue) => setLabelData({...LabelData, relativePos: newValue})}
                />
              : <TextField
                  className={locClasses.LabelPairPos} size="small" label="position pair" value={LabelData.positionPair}
                  onChange={(event) => setLabelData({...LabelData, positionPair: event.target.value})}
                />
          }
          <FillNoFill className={locClasses.LabelFillType}
            name="labelFill" radioValue={LabelData.fillType}
            onSelect={(value) => setLabelData({...LabelData, fillType: value})}
          />
          <ComboBox
            className={locClasses.LabelPen} label="Label pen" dataArray={dataArrayGen(pensArray, {text:"default pen"})}
            width="8rem" property="text" value={{text: LabelData.pen}}
            onChange={(event, value) => (value !== null)? setLabelData({...LabelData, pen: value.text}): null}
          />
        </div>
      </fieldset>
      <TabControls
        className={locClasses.CtrlBtnsCont} selectionList={selectionList} editState={editState} assignedNames={assignedLabelNames}
        onAdd={(event) => {
          addSaveActions(complexDataObj, assignedLabelNames, (value) => {
            dispatch(lbActionCreator.addLabel(LabelName, LabelData));
            setLabelData({...LabelInitState});
            setConsoleContent(value);
          }, (value) => {
            setConsoleContent(value);
          })
        }}
        onSave={(event) => {
          addSaveActions(complexDataObj, [], (value) => {
            dispatch(lbActionCreator.addLabel(selectionList[0], LabelData));
            setConsoleContent(value);
            setEditState(false);
            setDeselectReq(deselectReq + 1);
          }, (value) => {
            setConsoleContent(value);
          })
        }}
        onDiscard={() => {
          setLabelData(Labels[selectionList[0]]);
        }}
        onRemove={() => {
          for (const penId of selectionList) {
            dispatch(lbActionCreator.removeLabel(penId));
            setSelectionList([]);
          }
        }}
        onCopy={(value) => {
          const copiedValue = {...Labels[selectionList[0]]};
          dispatch(lbActionCreator.addLabel(value, copiedValue));
          setDeselectReq(deselectReq + 1);
        }}
        onErase={() => {
          setLabelData({...LabelInitState});
          setLabelName("");
        }}
      />
      <div className={locClasses.tableAndConsole}>
        <DefTableConsole
          totalHeight={40.75} tableFieldName="Axes list" tableRowsDataObj={Labels}
          tableHeaderSelector={tableHeaderSelector} tableHeaderDisp={tableHeaderDisp} deselectReq={deselectReq}
          consoleContent={consoleContent} selectionList={selectionList} setSelectionList={setSelectionList}
        />
      </div>
    </fieldset>
  )
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Data Collections
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Internal Functions
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
