// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%   FunctionsTab component
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEqual } from "lodash-es";
import { fuActionCreator } from "../../../../../store/graphModule";
import { idSelector, functionsSelector, LabelsSelector, pensSelector } from "../../../../../store/selectors";
import { makeStyles, TextField } from "@material-ui/core";
import { TabControls } from "../GMComponents/TabControls";
import { DefTableConsole } from "../GMComponents/DefTableConsole";
import { ComboBox } from "../../../Atoms/ComboBox";
import { ColorInput } from "../Atoms/ColorInput";
import { ColorBox } from "../Atoms/ColorBox";
import { FillNoFill } from "../Atoms/FillNoFill";
import { DomainTarget, Colon, LetterA, LetterB, Mapsto } from "../../../../../assets/svgs/graphModuleSvgs/functionDef.js";
import { isUniqueName, isValidName } from "../../../../../utils/validators";
import { addSaveActions, dataArrayGen, legendStyler } from "../../../../../utils/appTools";
import { asyFuncData as funcInitState } from "../../../../../utils/AsyTools/asyData";
import { SelectField } from "../../../Atoms/SelectField";

const functionTabStyle = makeStyles((theme) => ({
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Legend of FieldSet
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  legend: legendStyler(),
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Function Definition Fieldset
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  functionDefFieldSet: {
    display: "grid",
    margin: "1rem",
    padding: "1rem",
    minHeight: "calc(100% - 4rem)",
    gridTemplateColumns: "minmax(31rem, 1fr) minmax(31rem, 1fr)",
    border: "2px groove black",
    borderRadius: "4px",
  },
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Function Formula Fieldset
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  functionFormulaFieldSet: {
    gridRow: "1/3",
    gridColumn: "1/2",
    marginRight: "0.5rem",
    border: "2px groove black",
    borderRadius: "4px",
  },
  input: {
    "&:hover": {
      backgroundColor: "transparent",
    }
  },
  formulaBoxCont: {
    display: "grid",
    padding: "0 0.5rem",
    alignContent: "space-between",
    gridTemplateRows: "max-content",
    // border: "1px solid blue",
  },
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  nameFormulaRow
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  nameFormulaRow: {
    display: "grid",
    height: "6.5rem",
    padding: "0.5rem 0",
    alignContent: "space-between",
    alignItems: "center",
    // border: "1px solid red",
  },
  nameSubRow: {
    display: "grid",
    alignItems: "center",
    gridTemplateColumns: "4rem 2rem 5rem 3rem 1fr 3rem 1fr",
    // border: "1px solid green",
  },
  funcName: {
    gridColumn: "1/2",
    minWidth: "4rem",
    maxWidth: "4rem",
  },
  colonSVG: {
    gridColumn: "2/3",
    minWidth: "2rem",
    maxWidth: "2rem",
  },
  latexBoxSVG: {
    gridColumn: "3/4",
    minWidth: "5rem",
    maxWidth: "5rem",
  },
  letterA: {
    display: "block",
    marginLeft: "1rem",
    gridColumn: "4/5",
    minWidth: "2rem",
    maxWidth: "2rem",
  },
  letterATextField: {
    justifySelf: "stretch",
    gridColumn: "5/6",
    // border: "1px solid green",
  },
  letterB: {
    gridColumn: "6/7",
    marginLeft: "1rem",
    minWidth: "2rem",
    maxWidth: "2rem",
  },
  letterBTextField: {
    gridColumn: "7/8",
  },
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  formulaSubRow
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  formulaSubRow: {
    display: "grid",
    alignItems: "center",
    gridTemplateColumns: "4rem 2rem 1fr",
    // border: "1px solid green",
  },
  variable: {
    gridColumn: "1/2",
    minWidth: "4rem",
    maxWidth: "4rem",
  },
  mappingSignSVG: {
    gridColumn: "2/3",
    minWidth: "2rem",
    maxWidth: "2rem",
  },
  funcFormula: {
    gridColumn: "3/4",
  },
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  labelPosRow
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  labelScopeRow: {
    display: "grid",
    padding: "0.5rem 0",
    alignItems: "center",
    gridTemplateColumns: "repeat(4, 1fr)",
    // border: "1px solid yellow",
  },
  funcLabel: {
    gridColumn: "1/2",
    "& label": {
      fontSize: "0.85rem",
    },
  },
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  parameterRow
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  parameterRow: {
    display: "grid",
    padding: "0.5rem 0",
    height: "7.75rem",
    alignContent: "space-between",
    alignItems: "center",
    gridTemplateColumns: "repeat(4, 1fr)",
    // border: "1px solid orange",
  },
  parName: {
    gridColumn: "1/2",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  parValue: {
    gridColumn: "3/5",
    "& label": {
      fontSize: "0.85rem",
    },
  },
  parLabel: {
    gridRow: "2/3",
    gridColumn: "1/2",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Curve Fieldset
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  curveFieldSet: {
    gridRow: "1/2",
    gridColumn: "2/3",
    marginLeft: "0.5rem",
    borderRadius: "4px",
    border: "2px groove black",
  },
  curve: {
    display: "grid",
    padding: "0.5rem",
    height: "8.25rem",
    justifyContent: "space-between",
    alignContent: "space-between",
    gridTemplateColumns: "8rem 8rem 11rem",
    // border: "1px solid purple",
  },
  conditionFunc: {
    width: "16rem",
    marginTop: "-0.5rem",
    gridColumn: "1/3",
    "& label": {
      fontSize: "0.85rem",
    },
  },
  curvePen: {
    gridColumn: "3/4",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  joinOp: {
    marginTop: "0.5rem",
    gridColumn: "1/2",
  },
  joinOpFunc: {
    gridColumn: "2/4",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Marker Fieldset
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  markerFieldSet: {
    gridColumn: "2/3",
    marginTop: "1rem",
    marginLeft: "0.5rem",
    borderRadius: "4px",
    border: "2px groove black",
  },
  marker: {
    display: "grid",
    height: "8.25rem",
    padding: "0.5rem",
    justifyContent: "space-between",
    alignContent: "space-between",
    gridTemplateColumns: "8rem 12rem 9rem",
    // border: "1px solid orange"
  },
  markerType: {
    gridColumn: "1/2",
  },
  markerSize: {
    gridColumn: "2/3",
    marginTop: "-0.5rem",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  markerFill: {
    gridColumn: "3/4",
  },
  colorFormat: {
    position: "relative",
    gridColumn: "1/2",
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
    justifySelf: "end",
  },
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Buttons & Console
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  CtrlBtnsCont: {
    display: "grid",
    gridColumn: "1/3",
    marginTop: "1rem",
    justifyContent: "space-between",
    // border: "1px solid blue",
  },
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Function List Fieldset
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  tableAndConsole: {
    display: "flex",
    flexFlow: "column",
    gridColumn: "1/3",
    minHeight: "25.75rem",
    marginTop: "0.5rem",
    // border: "1px solid blue",
  },
}));

export function FunctionsTab(props) {
  const locClasses = functionTabStyle(props);

  // Data Model Connection
  const id = useSelector(idSelector);
  const functions = useSelector(functionsSelector)[id];
  const LabelsArray = Object.keys(useSelector(LabelsSelector));
  const pensArray = Object.keys(useSelector(pensSelector));
  const dispatch = useDispatch();

  // Component Basic States
  const [funcName, setFuncName] = useState("");
  const [colorFormat, setColorFormat] = useState("asy colors");
  const [funcData, setFuncData] = useState(funcInitState);

  // Error & Actions Management
  const [funcNameErr, setFuncNameErr] = useState(false);
  const [lBoundErr,     setLBoundErr] = useState(false);
  const [uBoundErr,     setUBoundErr] = useState(false);
  const [varNameErr,   setVarNameErr] = useState(false);
  const [formulaErr,   setFormulaErr] = useState(false);

  const complexDataObj = {
    funcName: {value: funcName,          errSetter: setFuncNameErr, validator: isValidName, uniqueness: isUniqueName, textName: "function name"},
    lBound:   {value: funcData.lBound,   errSetter: setLBoundErr,   validator: null,        uniqueness: null,         textName: "lower bound value" },
    uBound:   {value: funcData.uBound,   errSetter: setUBoundErr,   validator: null,        uniqueness: null,         textName: "upper bound value"},
    varName:  {value: funcData.varName,  errSetter: setVarNameErr,  validator: null,        uniqueness: null,         textName: "independent variable name"},
    formula:  {value: funcData.formula,  errSetter: setFormulaErr,  validator: null,        uniqueness: null,         textName: "function formula"},
  };
  const clearOutErrors = () => {
    for (const variable in complexDataObj) {
      complexDataObj[variable].errSetter(false);
    }
  }

  // DefTableConsoleMui component Props
  const assignedFuncNames = Object.keys(functions);
  const [consoleContent, setConsoleContent] = useState([]);
  const [editState, setEditState] = useState(false);
  const [selectionList, setSelectionList] = useState([]);
  const [deselectReq, setDeselectReq] = useState(0);
  const tableHeaderSelector = ["id", "funcLabel", "varName", "lBound", "uBound", "formula"];
  const tableHeaderDisp = ["function name", "function label", "variable", "a", "b", "function formula"];

  useEffect(() => {
    if (selectionList.length === 1) {
      setFuncData(functions[selectionList[0]]);
      setFuncName(selectionList[0]);
    } else {
      setFuncData({...funcInitState});
      setFuncName("");
    }
  }, [selectionList]);

  useEffect(() => {
    if (selectionList.length === 1) {
      if (isEqual(funcData, functions[selectionList[0]])) {
        setEditState(false);
      } else {
        setEditState(true);
      }
    } else {
        setEditState(false);
    }
  }, [funcData, selectionList]);


  return (
    <fieldset className={locClasses.functionDefFieldSet}>
      <legend className={locClasses.legend}> Function Definition </legend>
        <fieldset className={locClasses.functionFormulaFieldSet}>
          <legend className={locClasses.legend}> Function formula </legend>
            <div className={locClasses.formulaBoxCont}>
              <div className={locClasses.nameFormulaRow}>
                <div className={locClasses.nameSubRow}>
                  <TextField
                    className={locClasses.funcName}
                    size="small" variant="outlined" value={funcName}
                    onChange={(event) => {
                      setFuncNameErr(event.target.value.trim() === "" || !isValidName(event.target.value.trim()));
                      setFuncName(event.target.value.trim());
                    }}
                    onBlur={(event) => setFuncNameErr(event.target.value.trim() === "")}
                    error={funcNameErr}
                  />
                  <div className={locClasses.colonSVG}> <Colon/> </div>
                  <DomainTarget classes={locClasses.latexBoxSVG}/>
                  <div className={locClasses.letterA}> <LetterA/> </div>
                  <TextField
                    className={locClasses.letterATextField} size="small" variant="outlined" value={funcData.lBound}
                    onChange={(event) => setFuncData({...funcData, lBound: event.target.value})}
                    onBlur={(event) => setLBoundErr(funcData.lBound === "")}
                    error={lBoundErr}
                  />
                  <div className={locClasses.letterB}> <LetterB/> </div>
                  <TextField
                    className={locClasses.letterBTextField} size="small" variant="outlined" value={funcData.uBound}
                    onChange={(event) => setFuncData({...funcData, uBound: event.target.value})}
                    onBlur={(event) => setUBoundErr(funcData.uBound === "")}
                    error={uBoundErr}
                  />
                </div>
                <div className={locClasses.formulaSubRow}>
                  <TextField
                    className={locClasses.variable} size="small" variant="outlined" value={funcData.varName}
                    onChange={(event) => setFuncData({...funcData, varName: event.target.value})}
                    onBlur={(event) => setVarNameErr(event.target.value.trim() === "" || !isValidName(funcData.varName))}
                    error={varNameErr}
                  />
                  <Mapsto classes={locClasses.mappingSignSVG}/>
                  <TextField
                    classes={{root: locClasses.funcFormula}} size="small" variant="outlined" value={funcData.formula}
                    onChange={(event) => setFuncData({...funcData, formula: event.target.value})}
                    onBlur={(event) => setFormulaErr(funcData.formula === "")}
                    error={formulaErr}
                  />
                </div>
              </div>
              <div className={locClasses.labelScopeRow}>
                <ComboBox
                  className={locClasses.funcLabel} label="function label" width="11rem" property="text"
                  value={{text: funcData.funcLabel}} dataArray={dataArrayGen(LabelsArray, {text: funcInitState.funcLabel})}
                  onChange={(event, value) => setFuncData({...funcData, funcLabel: value.text})}
                />
              </div>
              {/*<div className={locClasses.parameterRow}>*/}       {/* ************** FOR FUTURE IMPROVEMENT ************** */}
              {/*  <TextField*/}
              {/*    classes={{root: locClasses.parName}} size="small" label="parameter name" value={funcData.parName}*/}
              {/*    onChange={(event) => setFuncData({...funcData, parName: event.target.value})}*/}
              {/*  />*/}
              {/*  <TextField*/}
              {/*    classes={{root: locClasses.parValue}} size="small" label="parameter value(s)" value={funcData.parValues}*/}
              {/*    onChange={(event) => setFuncData({...funcData, parValues: event.target.value})}*/}
              {/*  />*/}
              {/*</div>*/}
            </div>
        </fieldset>

        <fieldset className={locClasses.curveFieldSet}>
          <legend className={locClasses.legend}> Curve </legend>
          <div className={locClasses.curve}>
            <TextField
              classes={{root: locClasses.conditionFunc}} size="small" label="condition function body"
              placeholder="return true;" value={funcData.condFunc}
              onChange={(event) => setFuncData({...funcData, condFunc: event.target.value})}
            />
            <ComboBox
              className={locClasses.curvePen}
              label="curve pen" width="11rem" property="text" value={{text: funcData.curvePen}} dataArray={dataArrayGen(pensArray, {text: funcInitState.curvePen})}
              onChange={(event, value) => (value !== null)? setFuncData({...funcData, curvePen: value.text}): null}
            />
            <ComboBox
              className={locClasses.joinOp}
              label="join" width="11rem" property="text" value={{text: funcData.joinOp}} dataArray={joinOptions}
              onChange={(event, value) => (value !== null)? setFuncData({...funcData, joinOp: value.text}): null}
            />
            {
              (funcData.joinOp === "hermite-clamped")
                ? <TextField
                    className={locClasses.joinOpFunc} size="small" label="clamped(slopea, slopeb)" value={funcData.joinOpFunc}
                    onChange={(event) => setFuncData({...funcData, joinOpFunc: event.target.value})}
                  />
                : null
            }
          </div>
        </fieldset>

        <fieldset className={locClasses.markerFieldSet}>
          <legend className={locClasses.legend}> Marker </legend>
          <div className={locClasses.marker}>
            <ComboBox
              className={locClasses.markerType}
              label="marker" width="11rem" property="text" value={{text: funcData.markerType}} dataArray={markerTypes}
              onChange={(event, value) => (value !== null)? setFuncData({...funcData, markerType: value.text}): null}
            />
            <TextField
              className={locClasses.markerSize} size="small" label="size" value={funcData.markerSize}
              onChange={(event) => setFuncData({...funcData, markerSize: event.target.value})}
            />
            <FillNoFill className={locClasses.markerFill}
              name="markerFill" radioValue={funcData.markerFill}
              onSelect={(value) => setFuncData({...funcData, markerFill: value})}
            />
            <ComboBox
              className={locClasses.colorFormat} label="color format"
              dataArray={[{text:"asy colors"}, {text:"X11 colors"}, {text:"color wheel"}]}
              width="11rem" property="text" value={{text: colorFormat}}
              onChange={(event, value) => (value !== null)? setColorFormat(value.text): null}
            />
            <ColorInput className={locClasses.colorInput}
              format={colorFormat} label="marker color"
              onSelectColor={(value) => (value !== null)? setFuncData({...funcData, markerColor: value}): null}
            />
            <div className={locClasses.colorSquare}> <ColorBox boxColor={funcData.markerColor}/> </div>
          </div>
        </fieldset>

      <TabControls
        className={locClasses.CtrlBtnsCont} selectionList={selectionList} assignedNames={assignedFuncNames} editState={editState}
        onAdd={(event) => {
          addSaveActions(complexDataObj, assignedFuncNames, (value) => {
            dispatch(fuActionCreator.addFunction(id, funcName, funcData));
            setConsoleContent(value);
          }, (value) => {
            setConsoleContent(value);
          })
        }}
        onSave={(event) => {
          addSaveActions(complexDataObj, [], (value) => {
            dispatch(fuActionCreator.addFunction(id, selectionList[0], funcData));
            setConsoleContent(value);
            setEditState(false);
            setDeselectReq(deselectReq + 1);
          }, (value) => {
            setConsoleContent(value);
          })
        }}
        onDiscard={() => {
          setFuncData(functions[selectionList[0]]);
        }}
        onRemove={() => {
          for (const funcId of selectionList) {
            dispatch(fuActionCreator.removeFunction(id, funcId));
            setSelectionList([]);
          }
        }}
        onCopy={(value) => {
          const copiedValue = {...functions[selectionList[0]]};
          dispatch(fuActionCreator.addFunction(id, value, copiedValue));
          setDeselectReq(deselectReq + 1);
        }}
        onErase={() => {
          setFuncData({...funcInitState});
          setFuncName("");
        }}
      />
      <div className={locClasses.tableAndConsole}>
        <DefTableConsole
          totalHeight={25.75} tableFieldName="Function list" tableRowsDataObj={functions}
          tableHeaderSelector={tableHeaderSelector} tableHeaderDisp={tableHeaderDisp} deselectReq={deselectReq}
          consoleContent={consoleContent} selectionList={selectionList} setSelectionList={setSelectionList}
        />
      </div>
    </fieldset>
  );
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Data Collections
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const joinOptions = [
  {text:"straight"}, {text:"spline"}, {text:"hermite-notaknot"}, {text:"hermite-natural"},
  {text:"hermite-periodic"}, {text:"hermite-monotonic"}, {text:"hermite-clamped"}
];
const markerTypes = [{text:"no marker"}, {text:"circle"}, {text:"triangle"},{text:"cube"}, {text:"pentagon"}, {text:"cross"}];

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Internal Functions
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%




