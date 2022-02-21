// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%   Pens Tab component
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { peActionCreator } from "../../../../../store/graphModule";
import { pensSelector } from "../../../../../store/selectors";
import { makeStyles, TextField } from "@material-ui/core";
import { TabControls } from "../GMComponents/TabControls";
import { DefTableConsole } from "../GMComponents/DefTableConsole";
import { ComboBox } from "../../../Atoms/ComboBox";
import { ColorInput } from "../Atoms/ColorInput";
import { ColorBox } from "../Atoms/ColorBox";
import { addSaveActions, legendStyler} from "../../../../../utils/appTools";
import { isUniqueName, isValidName } from "../../../../../utils/validators";
import { asyPenData as penInitState } from "../../../../../utils/AsyTools/asyData";
import { isEqual } from "lodash-es";


const pensStyle = makeStyles((theme) => ({
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Legend of FieldSet
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  legend: legendStyler(),
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Pens Fieldset
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  penDefFieldSet: {
    display: "grid",
    maxWidth: "calc(100% - 2rem)",
    margin: "1rem",
    padding: "1rem",
    borderRadius: "4px",
    border: "2px groove black",
  },
  penPropsFieldSet: {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "2px groove black",
  },
  penDefElementsContainer: {
    display: "grid",
    height: "15rem",
    gridTemplateColumns: "9rem 12rem 9rem 9rem 9rem",
    justifyContent: "space-between",
    alignContent: "space-between",
    // border: "1px solid pink",
  },
  penName: {
    width: "9rem",
    gridColumn: "1/2",
    marginTop: "-0.5rem",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  colorFormat: {
    gridColumn: "1/2",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  colorInput: {
    position: "relative",
    gridColumn: "2/3",
    "& label": {
      fontSize: "0.85rem",
    },
    zIndex: 2500,
  },
  colorSquare: {
    gridColumn: "3/4",
    justifySelf: "end",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  lineType: {
    gridColumn: "1/2",
  },
  lineWidth: {
    width: "12rem",
    gridColumn: "2/3",
    marginTop: "-0.5rem",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  lineCap: {
    gridColumn: "3/4",
  },
  joinStyle: {
    gridColumn: "4/5",
  },
  fillRule: {
    gridColumn: "5/6",
  },
  baseAlign: {
    gridColumn: "1/2",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  fontSize: {
    width: "12rem",
    gridColumn: "2/3",
    marginTop: "-0.5rem",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  opacity: {
    width: "9rem",
    gridColumn: "3/4",
    marginTop: "-0.5rem",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  blend: {
    gridColumn: "4/5",
  },
  penPattern: {
    gridColumn: "5/6",
  },
  addBtn: {
    gridColumn: "5/6",
  },
  defConsoleCont: {
    height: "8rem",
    gridColumn: "1/6",
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
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Pens List Fieldset
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  tableAndConsole: {
    display: "flex",
    flexFlow: "column",
    minHeight: "28.5rem",
    marginTop: "0.5rem",
    // border: "1px solid blue",
  },
}))

export function PensTab(props) {
  const locClasses = pensStyle();

  // Data Model Connection
  const pens = useSelector(pensSelector);
  const dispatch = useDispatch();

  // Component Basic States
  const [colorFormat, setColorFormat] = useState("asy colors");
  const [penName, setPenName] = useState("");
  const [penData, setPenData] = useState(penInitState);

  // Error & Actions Management
  const [penNameErr, setPenNameErr] = useState(false);
  const complexDataObj = {
    penName: {
      value: penName,
      errSetter: setPenNameErr,
      validator: isValidName,
      uniqueness: isUniqueName,
      textName: "pen name"
    },
  };

  // In connection with DefTableConsoleMui component
  const assignedPenNames = Object.keys(pens);
  const [editState, setEditState] = useState(false);
  const [consoleContent, setConsoleContent] = useState([]);
  const [selectionList, setSelectionList] = useState([]);
  const [deselectReq, setDeselectReq] = useState(0);
  const tableHeader = ["lineType", "lineWidth", "joinStyle", "fontSize", "color", "pattern"];
  const tableHeaderDisp = ["pen name", "line type", "line width", "join style", "font size", "color", "pattern"];


  useEffect(() => {
    if (selectionList.length === 1) {
      setPenData(pens[selectionList[0]]);
      setPenName(selectionList[0]);
    } else {
      setPenData({...penInitState});
      setPenName("");
    }
  }, [selectionList]);

  useEffect(() => {
    if (selectionList.length === 1) {
      if (isEqual(penData, pens[selectionList[0]])) {
        setEditState(false);
      } else {
        setEditState(true);
      }
    } else {
      setEditState(false);
    }
  }, [penData, selectionList]);

  return (
    <fieldset className={locClasses.penDefFieldSet}>
      <legend className={locClasses.legend}> Pen Definition </legend>
      <fieldset className={locClasses.penPropsFieldSet}>
        <legend className={locClasses.legend}> Pen Properties</legend>
        <div className={locClasses.penDefElementsContainer}>
          <TextField
            className={locClasses.penName} size="small" label="pen name" value={penName}
            onChange={(event) => {
              setPenNameErr(event.target.value.trim() === "" || !isValidName(event.target.value.trim()));
              setPenName(event.target.value.trim());
            }}
            onBlur={(event) => setPenNameErr(event.target.value.trim() === "")}
            error={penNameErr}
          />
          <ComboBox
            className={locClasses.colorFormat}
            label="color format" dataArray={[{text:"asy colors"}, {text:"X11 colors"}, {text:"color wheel"}]}
            width="9rem" property="text" value={{text: colorFormat}}
            onChange={(event, value) => (value !== null)? setColorFormat(value.text): null}
          />
          <ColorInput className={locClasses.colorInput}
            format={colorFormat} label="pen color"
            onSelectColor={(value) => setPenData({...penData, color: value})}
          />
          <div className={locClasses.colorSquare}> <ColorBox boxColor={penData.color}/> </div>
          <ComboBox
            className={locClasses.lineType} label="line type" dataArray={lineTypes}
            width="9rem" property="text" value={{text: penData.lineType}}
            onChange={(event, value) => (value !== null)? setPenData({...penData, lineType: value.text}): null}
          />
          <TextField
            className={locClasses.lineWidth} size="small" label="line width" value={penData.lineWidth}
            onChange={(event) => setPenData({...penData, lineWidth: event.target.value})}
          />
          <ComboBox
            className={locClasses.lineCap} label="line cap" dataArray={lineCaps}
            width="9rem" property="text" value={{text: penData.lineCap}}
            onChange={(event, value) => (value !== null)? setPenData({...penData, lineCap: event.target.value}): null}
          />
          <ComboBox
            className={locClasses.joinStyle} label="join style" dataArray={joinStyles}
            width="9rem" property="text" value={{text: penData.joinStyle}}
            onChange={(event, value) => (value !== null)? setPenData({...penData, joinStyle: value.text}): null}
          />
          <ComboBox
            className={locClasses.fillRule} label="fill rule" dataArray={fillRules}
            width="9rem" property="text" value={{text: penData.fillRule}}
            onChange={(event, value) => (value !== null)? setPenData({...penData, fillRules: value.text}): null}
          />
          <ComboBox
            className={locClasses.baseAlign} label="base align" dataArray={baseAligns}
            width="9rem" property="text" value={{text: penData.baseAlign}}
            onChange={(event, value) => (value !== null)? setPenData({...penData, baseAlign: value.text}): null}
          />
          <TextField
            className={locClasses.fontSize} size="small" label="fontsize" value={penData.fontSize}
            onChange={(event) => setPenData({...penData, fontSize: event.target.value})}
          />
          <TextField
            className={locClasses.opacity} size="small" label="opacity" value={penData.opacity}
            onChange={(event) => setPenData({...penData, opacity: event.target.value})}
          />
          <ComboBox
            className={locClasses.blend} label="blend" dataArray={blends}
            width="9rem" property="text" value={{text: penData.blend}} disabled={penData.opacity === "1"}
            onChange={(event, value) => (value !== null)? setPenData({...penData, blends: value.text}): null}
          />
          <ComboBox
            className={locClasses.penPattern} label="pen pattern" dataArray={penPatterns}
            width="9rem" property="text" value={{text: penData.pattern}}
            onChange={(event, value) => (value !== null)? setPenData({...penData, pattern: value.text}): null}
          />
        </div>
      </fieldset>
      <TabControls
        className={locClasses.CtrlBtnsCont} selectionList={selectionList} editState={editState} assignedNames={assignedPenNames}
        onAdd={(event) => {
          addSaveActions(complexDataObj, assignedPenNames, (value) => {
            dispatch(peActionCreator.addPen(penName, penData));
            setPenData({...penInitState});
            setConsoleContent(value);
          }, (value) => {
            setConsoleContent(value);
          })
        }}
        onSave={(event) => {
          addSaveActions(complexDataObj, [], (value) => {
            dispatch(peActionCreator.addPen(selectionList[0], penData));
            setConsoleContent(value);
            setEditState(false);
            setDeselectReq(deselectReq + 1);
          }, (value) => {
            setConsoleContent(value);
          })
        }}
        onDiscard={() => {
          setPenData(pens[selectionList[0]]);
        }}
        onRemove={() => {
          for (const penId of selectionList) {
            dispatch(peActionCreator.removePen(penId));
            setSelectionList([]);
          }
        }}
        onCopy={(value) => {
          const copiedValue = {...pens[selectionList[0]]};
          dispatch(peActionCreator.addPen(value, copiedValue));
          setDeselectReq(deselectReq + 1);
        }}
        onErase={() => {
          setPenData({...penInitState});
          setPenName("");
        }}
      />
      <div className={locClasses.tableAndConsole}>
        <DefTableConsole
          totalHeight={28.5} tableFieldName="Axes list" tableRowsDataObj={pens}
          tableHeaderSelector={tableHeader} tableHeaderDisp={tableHeaderDisp} deselectReq={deselectReq}
          consoleContent={consoleContent} selectionList={selectionList} setSelectionList={setSelectionList}
        />
      </div>
    </fieldset>
  )
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Data Collections
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const lineTypes = [
  {text: "solid"}, {text: "dotted"}, {text: "dashed"}, {text: "longdashed"},
  {text: "dashdotted"}, {text: "longdashdotted"}, {text: "Dotted"}
];
const lineCaps = [{text:" squarecap"}, {text: "roundcap"}, {text: "extendcap"}];
const joinStyles = [{text: "mitterjoin"}, {text: "roundjoin"}, {text: "beveljoin"}];
const fillRules = [{text: "zerowinding"}, {text: "evenodd"}];
const baseAligns = [{text: "nobasealign"}, {text: "basealign"}];
const blends = [
  {text: "Compatible"}, {text: "Normal"}, {text: "Multiply"},{text: "Screen"},
  {text: "Overlay"}, {text: "SoftLight"}, {text: "HardLight"}, {text: "ColorDodge"},
  {text: "ColorBurn"}, {text: "Darken"}, {text: "Lighten"}, {text: "Difference"},
  {text: "Exclusion"}, {text: "Hue"}, {text: "Saturation"}, {text: "Color"}, {text: "Luminosity"}
]
const penPatterns = [{text: "None"}, {text: "tile"}, {text: "filledtilewithmargin"}, {text: "checker"}, {text: "brick"}];

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Internal Functions
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

