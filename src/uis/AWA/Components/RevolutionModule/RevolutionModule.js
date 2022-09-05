import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  idSelector, fFormulaSelector, gFormulaSelector, xMinSelector,
  xMaxSelector, rotAxisTypeSelector, rotAxisPosSelector,
} from "../../../../store/selectors";
import { rmActionCreator } from "../../../../store/revolutionModule.js";
import { makeStyles, Button, TextField } from "@material-ui/core";
import { ComboBox } from "../../Atoms/ComboBox.js";
import { PreviewPane } from "./PreviewPane/PreviewPane.js";
import { RunStop } from "./RunStop.js";
import { legendStyler } from "../../../../utils/appTools";
import { isValidName } from "../../../../utils/validators.js";
import { Refresh as ResetIcon } from '@material-ui/icons';
import {
  FuncFDefSVG, FuncGDefSVG, FuncFLabelSVG,
  FuncGLabelSVG, XMin, XMax, AboutX, AboutY
} from "../../../../assets/svgs/revModuleSvgs.js";

const useStyle = makeStyles((theme) => ({
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Legend of FieldSet
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  legend: legendStyler(),
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Module Formula FieldSet
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  revolutionModule: {
    display: "flex",
    minHeight: "100%",
    flexFlow: "column nowrap",
  },
  moduleCont: {
    flex: "1 1 auto",
    display: "flex",
    flexFlow: "column nowrap",
    minWidth: "1300px",
    minHeight: "calc(100% -2rem)",
    margin: "1rem",
    alignSelf: "stretch",
    backgroundColor: theme.palette.background.moduleContrast,
    borderRadius: "3px 3px 2px 2px",
  },
  inputAndCtrl: {
    flex: "1 1 auto",
    display: "grid",
    minHeight: "8.5rem",
    maxHeight: "8.5rem",
    margin: "1rem",
    alignSelf: "stretch",
    gridTemplateColumns: "minmax(500px, 10fr) 1fr",
    // border: "1px solid red",
  },
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Formula Fieldset
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  formulaFieldSet: {
    gridColumn: "1/2",
    border: "2px groove black",
    borderRadius: "4px",
  },
  input: {
    "&:hover": {
      backgroundColor: "transparent",
    }
  },
  formulaCont: {
    display: "grid",
    minHeight: "6.5rem",
    margin: "0 0.5rem",
    marginBottom: "0.5rem",
    padding: "0.5 0.5rem",
    alignItems: "stretch",
    gridTemplateColumns: "1.5fr 1fr",
    // border: "1px solid blue",
  },
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  funcBlock
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  funcBlock: {
    gridColumn: "1/2",
    display: "grid",
    alignItems: "center",
    alignContent: "space-between",
    gridTemplateRows: "1fr 1fr",
    gridTemplateColumns: "5rem 5rem 1fr",
  },
  funcFDef: {
    gridRow: "1/2",
    gridColumn: "1/2",
    margin: "0 0.5rem",
    minWidth: "5rem",
  },
  funcFLabel: {
    gridRow: "1/2",
    gridColumn: "2/3",
    marginLeft: "1rem",
  },
  funcFFormula: {
    gridRow: "1/2",
    gridColumn: "3/4",
  },
  funcGDef: {
    gridRow: "2/3",
    gridColumn: "1/2",
    margin: "0 0.5rem",
    minWidth: "5rem",
    // border: "1px solid green",
  },
  funcGLabel: {
    gridRow: "2/3",
    gridColumn: "2/3",
    marginLeft: "1rem",
  },
  funcGFormula: {
    gridRow: "2/3",
    gridColumn: "3/4",
  },
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  boundsRow
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  boundBlock: {
    gridColumn: "2/3",
    display: "grid",
    marginLeft: "1rem",
    paddingRight: "0.5rem",
    alignItems: "center",
    alignContent: "space-between",
    gridTemplateRows: "1fr 1fr",
    gridTemplateColumns: "4rem 8rem 1fr 6rem 8rem",
    // border: "1px solid green",
  },
  xMaxLabel: {
    gridRow: "1/2",
    gridColumn: "1/2",
  },
  xMax: {
    gridRow: "1/2",
    gridColumn: "2/3",
    minWidth: "8rem",
    maxWidth: "8rem",
  },
  xMinLabel: {
    gridRow: "1/2",
    gridColumn: "4/5",
    paddingLeft: "1.5rem",
  },
  xMin: {
    gridRow: "1/2",
    gridColumn: "5/6",
    minWidth: "8rem",
    maxWidth: "8rem",
  },
  revAxisType: {
    gridRow: "2/3",
    gridColumn: "2/3",
  },
  revAxisPosLabel: {
    gridRow: "2/3",
    gridColumn: "4/5",
  },
  revAxisPos: {
    gridRow: "2/3",
    gridColumn: "5/6",
  },
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  ctrlPanel
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  ctrlPanel: {
    gridColumn: "2/3",
    display: "grid",
    minWidth: "10rem",
    maxWidth: "10rem",
    marginLeft: "0.5rem",
    gridTemplateRows: "1fr 1fr",
    border: "2px solid black",
    borderRadius: "4px",
  },
  runBtn: {
    gridRow: "1/2",
    display: "grid",
    margin: "0.5rem 0.5rem",
    minWidth: "calc(100% - 1rem)",
    maxWidth: "calc(100% - 1rem)",
  },
  resetBtn: {
    gridRow: "2/3",
    display: "grid",
    margin: "0.5rem 0.5rem",
    minWidth: "calc(100% - 1rem)",
    maxWidth: "calc(100% - 1rem)",
  },
  resetIcon: {
    color: theme.palette.icon.reset,
  },
  button: {
    minWidth: "7rem",
    maxWidth: "7rem",
    minHeight: "2rem",
    maxHeight: "2rem",
    padding: "0",
    fontSize: "0.875rem",
    borderRadius: "1px",
    placeSelf: "center",
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.common.white,
    "&:hover": {
      // backgroundColor: theme.palette.common.grey[600],
    }
  },
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  previewPanel
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  previewPaneCont: {
    flex: "1 1 auto",
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "stretch",
    alignItems: "stretch",
    margin: "0 1rem",
    marginBottom: "1rem",
    border: "2px solid black",
    borderRadius: "4px",
  },
}));

export function RevolutionModule(props) {
  const locClasses = useStyle();
  const id = useSelector(idSelector);
  const fFormula = useSelector(fFormulaSelector);
  const gFormula = useSelector(gFormulaSelector);
  const xMin = useSelector(xMinSelector);
  const xMax = useSelector(xMaxSelector);
  const rotAxisType = useSelector(rotAxisTypeSelector);
  const rotAxisPos = useSelector(rotAxisPosSelector);
  const dispatch = useDispatch();

  const [moduleStatus, updateModuleStatus] = useState(true);

  // // Component Basic States
  // const [fFormula, setFFormula] = useState("");
  // const [gFormula, setGFormula] = useState("");
  // const [xMin, setXMin] = useState("");
  // const [xMax, setXMax] = useState("");
  // const [rAxisType, setRevAxisType] = useState("Vertical");
  // const [revAxisPos, setRevAxisPos] = useState("");

  // Error & Actions Management
  const [fFormulaErr,   setFFormulaErr] = useState(false);
  const [gFormulaErr,   setGFormulaErr] = useState(false);
  const [xMinErr,       setXMinErr] = useState(false);
  const [xMaxErr,       setXMaxErr] = useState(false);
  const [revAxisPosErr, setRevAxisPosErr] = useState(false);

  return (
    <div className={locClasses.revolutionModule}>
      <div className={locClasses.moduleCont}>
        <div className={locClasses.inputAndCtrl}>
          <fieldset className={locClasses.formulaFieldSet}>
            <legend className={locClasses.legend}> Functions definition </legend>
            <div className={locClasses.formulaCont}>
              <div className={locClasses.funcBlock}>
                <div className={locClasses.funcFDef}> <FuncFDefSVG/> </div>
                <div className={locClasses.funcFLabel}> <FuncFLabelSVG/> </div>
                <TextField
                  className={locClasses.funcFFormula} size="small" variant="outlined" value={fFormula}
                  onChange={(event) => {
                    setFFormulaErr(event.target.value.trim() === "" || !isValidName(event.target.value.trim()));
                    dispatch(rmActionCreator.setFFormula(id, event.target.value.trim()));
                    updateModuleStatus(!moduleStatus);
                  }}
                  onBlur={(event) => setFFormulaErr(event.target.value.trim() === "")}
                  error={fFormulaErr}
                />
                <div className={locClasses.funcGDef}> <FuncGDefSVG/> </div>
                <div className={locClasses.funcGLabel}> <FuncGLabelSVG/> </div>
                <TextField
                  className={locClasses.funcGFormula} size="small" variant="outlined" value={gFormula}
                  onChange={(event) => {
                    setGFormulaErr(event.target.value.trim() === "" || !isValidName(event.target.value.trim()));
                    dispatch(rmActionCreator.setGFormula(id, event.target.value.trim()));
                    updateModuleStatus(!moduleStatus);
                  }}
                  onBlur={(event) => setGFormulaErr(event.target.value.trim() === "")}
                  error={gFormulaErr}
                />
              </div>
              <div className={locClasses.boundBlock}>
                <div className={locClasses.xMaxLabel}> <XMax/> </div>
                <TextField
                  className={locClasses.xMax} size="small" variant="outlined" value={xMax}
                  onChange={(event) => {
                    setXMaxErr(event.target.value.trim() === "" || !isValidName(event.target.value.trim()));
                    dispatch(rmActionCreator.setXMax(id, event.target.value.trim()));
                    updateModuleStatus(!moduleStatus);
                  }}
                  onBlur={(event) => setXMaxErr(event.target.value.trim() === "")}
                  error={xMaxErr}
                />
                <div className={locClasses.xMinLabel}> <XMin/> </div>
                <TextField
                  classes={{root: locClasses.xMin}} size="small" variant="outlined" value={xMin}
                  onChange={(event) => {
                    setXMinErr(event.target.value.trim() === "" || !isValidName(event.target.value.trim()));
                    dispatch(rmActionCreator.setXMin(id, event.target.value.trim()));
                    updateModuleStatus(!moduleStatus);
                  }}
                  onBlur={(event) => setXMinErr(event.target.value.trim() === "")}
                  error={xMinErr}
                />
                <ComboBox
                  className={locClasses.revAxisType}
                  label="Revolution Axis" width="8rem" property="text" value={{text: rotAxisType}} dataArray={revAxisTypes}
                  onChange={(event, value) => {
                    dispatch(rmActionCreator.setRotAxisType(id, value.text));
                    updateModuleStatus(!moduleStatus);
                  }}
                />
                <div className={locClasses.revAxisPosLabel}>
                  {(rotAxisType === "Vertical")? <AboutY/>: <AboutX/>}
                </div>
                <TextField
                  classes={{root: locClasses.revAxisPos}} size="small" variant="outlined" value={rotAxisPos}
                  onChange={(event) => {
                    setRevAxisPosErr(event.target.value.trim() === "" || !isValidName(event.target.value.trim()));
                    dispatch(rmActionCreator.setRotAxisPos(id, event.target.value.trim()));
                    updateModuleStatus(!moduleStatus);
                  }}
                  onBlur={(event) => setRevAxisPosErr(event.target.value.trim() === "")}
                  error={revAxisPosErr}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className={locClasses.ctrlPanel}>
            <legend className={locClasses.legend}> Controls </legend>
            <div className={locClasses.runBtn}>
              <RunStop/>
            </div>
            <div className={locClasses.resetBtn}>
              <Button variant="contained" classes={{root: locClasses.button}}>
                <ResetIcon className={locClasses.resetIcon}/>
              </Button>
            </div>
          </fieldset>
        </div>
        <div className={locClasses.previewPaneCont}>
          <PreviewPane/>
        </div>
      </div>
    </div>
  );
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Data Collections
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const revAxisTypes = [{text:"Vertical"}, {text:"Horizontal"}];
