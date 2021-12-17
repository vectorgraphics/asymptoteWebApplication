// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%   FunctionTab component
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { flActionCreator } from "../../../../../../store/funcSubModule";
import { idSelector, fIdSelector, funcEntitiesSelector, funcListSelector } from "../../../../../../store/selectors";
import { makeStyles, useTheme, RadioGroup, TextField, FormControlLabel, Radio } from "@material-ui/core";
import { ComboBox } from "../../../../Atoms/ComboBox";
import { ColorWheel } from "../Atoms/ColorWheel";
import { ColorBox } from "../Atoms/ColorBox";
import { Btn } from "../../../../Atoms/Btn";
import { SelectField } from "../../../../Atoms/SelectField";
import { asyColors, X11Colors } from "../../../../../../utils/colors";


const functionTabStyle = makeStyles((theme) => ({
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Wrapper Container
  container : {
    display: "grid",
    minWidth: "700px",
    maxWidth: "900px",
    height: "calc(100% - 4rem)",
    gridTemplateRows: "1rem 9rem 1rem 5rem 1rem 30rem 1rem 3rem",
    margin: "1rem",
  },
  legend: {
    fontSize: "0.85rem",
    padding: "0 0.5rem",
    margin: "0 1rem",
  },
  radioGroup: {
    flexWrap: "nowrap",
    marginLeft: "-1rem",
    minHeight: "2.5rem",
    maxHeight: "2.5rem",
  },
  radio: {
    color: "darkgray",
  },
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Function Fieldset
  funcFieldSet: {
    gridRow: "2/3",
    borderRadius: "4px",
    border: "2px groove black",
  },
  function: {
    display: "grid",
    gridTemplateRows: "0.5rem 3rem 1rem 3rem 0.5rem",
    gridTemplateColumns: "0.5rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 0.5rem",
    borderRadius: "4px",
  },
  funcLabel: {
    width: "7rem",
    gridRow: "2/3",
    gridColumn: "2/3",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  funcLabelPos: {
    width: "7rem",
    gridRow: "2/3",
    gridColumn: "4/5",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  funcLabelAlign: {
    width: "7rem",
    gridRow: "2/3",
    gridColumn: "6/7",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  funcLabelFill: {
    width: "7rem",
    marginTop: "1rem",
    gridRow: "2/3",
    gridColumn: "8/9",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  funcLabelPen: {
    width: "18.5rem",
    gridRow: "4/5",
    gridColumn: "2/5",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Parameter Fieldset
  paramFieldSet: {
    gridRow: "4/5",
    borderRadius: "4px",
    border: "2px groove black",
  },
  parameter: {
    display: "grid",
    gridTemplateRows: "0.5rem 3rem 0.5rem",
    gridTemplateColumns: "0.5rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 0.5rem",
    borderRadius: "4px",
  },
  parName: {
    width: "7rem",
    gridRow: "2/3",
    gridColumn: "2/3",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  parLabel: {
    width: "7rem",
    gridRow: "2/3",
    gridColumn: "4/5",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  parValue: {
    width: "19rem",
    gridRow: "2/3",
    gridColumn: "6/9",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Curve Fieldset
  curveFieldSet: {
    gridRow: "6/7",
    borderRadius: "4px",
    border: "2px groove black",
  },
  curve: {
    display: "grid",
    gridTemplateRows: "0.5rem 3rem 1rem 3rem 1rem 3rem 1rem 3rem 1rem 3rem 0.5rem",
    gridTemplateColumns: "0.5rem 12rem 1fr 12rem 1fr 12rem 0.5rem",
    borderRadius: "4px",
  },
  conditionFunc: {
    width: "19rem",
    gridRow: "2/3",
    gridColumn: "2/5",
    "& label": {
      fontSize: "0.85rem",
    },
  },
  joinOp: {
    gridRow: "4/5",
    gridColumn: "2/3",
    marginTop: "0.5rem",
  },
  joinOpFunc: {
    width: "12rem",
    gridRow: "4/5",
    gridColumn: "4/5",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  markerType: {
    gridRow: "6/7",
    gridColumn: "2/3",
    marginTop: "0.5rem",
  },
  markerSize: {
    width: "12rem",
    gridRow: "6/7",
    gridColumn: "4/5",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  markerFill: {
    gridRow: "6/7",
    gridColumn: "6/7",
    marginTop: "0.5rem",
  },
  formLabel: {
    color: "grey",
  },
  colorFormat: {
    gridRow: "8/9",
    gridColumn: "2/3",
    marginTop: "0.5rem",
  },
  colorInput: {
    gridRow: "8/9",
    gridColumn: "4/5",
    "& label": {
      fontSize: "0.85rem",
    },
    zIndex: 2500,
  },
  colorSquare: {
    gridRow: "8/9",
    gridColumn: "6/7",
    marginTop: "0.6rem",
  },
  curvePen: {
    width: "19rem",
    gridRow: "10/11",
    gridColumn: "2/5",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  resetButton: {
    display: "flex",
    paddingRight: "calc(0.5rem + 4px)",
    flexFlow: "row-reverse nowrap",
    alignItems: "center",
    gridRow: "8/9",
    borderRadius: "4px",
  },
}));

export function FunctionTab(props) {
  const locClasses = functionTabStyle(props);
  const [colorFormat, setColorFormat] = useState("asy colors");
  const [namedColor, setNamedColor] = useState("White");

  const colorSelected = useTheme().palette.radioAndCheckbox.selected;
  const id = useSelector(idSelector);
  const fId = useSelector(fIdSelector);
  const funcEntities = useSelector(funcEntitiesSelector);
  const funcList = useSelector(funcListSelector);
  const dispatch = useDispatch();
  const {
    funcLabel, funcLabelPos, funcLabelAlign, funcLabelPen, funcLabelFill,
    parName, parLabel, parValues, conditionFunc, joinOp, joinOpFunc,
    markerType, markerSize, markerFill, markerColor, curvePen, isDrawn
  } = funcList[id][fId];

  function colorInput(format){
    const initAsyNamedColor = asyColors.filter((obj) => obj.text === namedColor);
    const initX11NamedColor = X11Colors.filter((obj) => obj.text === namedColor);
    switch (format) {
      case "asy colors":
        return (
          <div style={{marginTop: "0.5rem"}}>
            <ComboBox
              label="color" dataArray={asyColors} property="text"
              value={{text: `${namedColor}`, value: `${initAsyNamedColor[0].value}`}}
              onInputChange={(event, value) => {
                const colorValue = asyColors.filter((obj) => obj.text === value);
                setNamedColor(colorValue[0].text);
                dispatch(flActionCreator.updateFunction(id, fId, "markerColor", colorValue[0].value));
              }}/>
          </div>
        );
      case "X11 colors":
        return (
          <div style={{marginTop: "0.5rem"}}>
            <ComboBox
              label="color" dataArray={X11Colors} property="text"
              value={{text: `${namedColor}`, value: `${initX11NamedColor[0].value}`}}
              onInputChange={(event, value) => {
                const colorValue = X11Colors.filter((obj) => obj.text === value);
                setNamedColor(colorValue[0].text);
                dispatch(flActionCreator.updateFunction(id, fId, "markerColor", colorValue[0].value));
              }}/>
          </div>
        );
      case "color wheel":
        return <ColorWheel
          isOpen={true} startColor={markerColor}
          passedHandler={(innerValue) => dispatch(flActionCreator.updateFunction(id, fId, "markerColor", innerValue))}
        />
      default:
        return null;
    }
  }

  return (
    <div className={locClasses.container}>
      <fieldset className={locClasses.funcFieldSet}>
        <legend className={locClasses.legend}> Function </legend>
        <div className={locClasses.function}>
          <TextField
            classes={{root: locClasses.funcLabel}} size="small" label="label" value={funcLabel}
            onChange={(event) => dispatch(flActionCreator.updateFunction(id, fId, "funcLabel", event.target.value))}
          />
          <TextField
            classes={{root: locClasses.funcLabelPos}} size="small" label="label position" value={funcLabelPos}
            onChange={(event) => dispatch(flActionCreator.updateFunction(id, fId, "funcLabelPos", event.target.value))}
          />
          <TextField
            classes={{root: locClasses.funcLabelAlign}} size="small" label="label align" value={funcLabelAlign}
            onChange={(event) => dispatch(flActionCreator.updateFunction(id, fId, "funcLabelAlign", event.target.value))}
          />
          <TextField
            className={locClasses.funcLabelPen} size="small" label="label pen" value={funcLabelPen}
            onChange={(event) => dispatch(flActionCreator.updateFunction(id, fId, "funcLabelPen", event.target.value))}
          />
          <div className={locClasses.funcLabelFill}>
            <RadioGroup
              className={locClasses.radioGroup} row name="funcLabelFill" value={funcLabelFill}
              onChange={(event) => dispatch(flActionCreator.updateFunction(id, fId, "funcLabelFill", event.target.value))}
            >
              <FormControlLabel
                classes={{label: locClasses.formLabel}}
                value="Fill"
                control={<Radio classes={{root: locClasses.radio}} color={colorSelected}/>}
                label="fill"
                labelPlacement="start"
              />
              <FormControlLabel
                classes={{label: locClasses.formLabel}}
                value="UnFill"
                control={<Radio classes={{root: locClasses.radio}} color={colorSelected}/>}
                label="unfill"
                labelPlacement="start"
              />
            </RadioGroup>
          </div>
        </div>
      </fieldset>

      <fieldset className={locClasses.paramFieldSet}>
        <legend className={locClasses.legend}> Parameter </legend>
        <div className={locClasses.parameter}>
          <TextField
            classes={{root: locClasses.parName}} size="small" label="name" value={parName}
            onChange={(event) => dispatch(flActionCreator.updateFunction(id, fId, "parName", event.target.value))}
          />
          <TextField
            classes={{root: locClasses.parLabel}} size="small" label="label" value={parLabel}
            onChange={(event) => dispatch(flActionCreator.updateFunction(id, fId, "parLabel", event.target.value))}
          />
          <TextField
            classes={{root: locClasses.parValue}} size="small" label="value(s)" value={parValues}
            onChange={(event) => dispatch(flActionCreator.updateFunction(id, fId, "parValues", event.target.value))}
          />
        </div>
      </fieldset>
      <fieldset className={locClasses.curveFieldSet}>
        <legend className={locClasses.legend}> Curve </legend>
        <div className={locClasses.curve}>
          <TextField
            classes={{root: locClasses.conditionFunc}} size="small" label="condition function body"
            placeholder="return true;" value={conditionFunc}
            onChange={(event) => dispatch(flActionCreator.updateFunction(id, fId, "conditionFunc", event.target.value))}
          />
          <ComboBox className={locClasses.joinOp}
            label="join" width="11rem" property="text" value={{text: `${joinOp}`}}
            dataArray={[
              {text:"straight"}, {text:"spline"}, {text:"hermite-notaknot"},
              {text:"hermite-natural"}, {text:"hermite-periodic"},
              {text:"hermite-monotonic"}, {text:"hermite-clamped"},
            ]}
            onChange={(event, value) => dispatch(flActionCreator.updateFunction(id, fId, "joinOp", value.text))}
          />
          {
            (joinOp === "hermite-clamped")
              ? <TextField
                  className={locClasses.joinOpFunc} size="small" label="clamped(slopea,slopeb)" value={joinOpFunc}
                  onChange={(event) => dispatch(flActionCreator.updateFunction(id, fId, "joinOpFunc", event.target.value))}
                />
              : null
          }
          <ComboBox className={locClasses.markerType}
            label="marker" width="11rem" property="text" value={{text: `${markerType}`}}
            dataArray={[{text:"circle"}, {text:"triangle"},{text:"cube"}, {text:"pentagon"}, {text:"cross"}]}
            onChange={(event, value) => dispatch(flActionCreator.updateFunction(id, fId, "markerType", value.text))}
          />
          <TextField
            className={locClasses.markerSize} size="small" label="size" value={markerSize}
            onChange={(event) => dispatch(flActionCreator.updateFunction(id, fId, "markerSize", event.target.value))}
          />
          <div className={locClasses.markerFill}>
            <RadioGroup
              className={locClasses.radioGroup} row name="curveFill" value={markerFill}
              onChange={(event) => dispatch(flActionCreator.updateFunction(id, fId, "markerFill", event.target.value))}
            >
              <FormControlLabel
                classes={{label: locClasses.formLabel}}
                value="fill"
                control={<Radio classes={{root: locClasses.radio}} color={colorSelected}/>}
                label="fill"
                labelPlacement="start"
              />
              <FormControlLabel
                classes={{label: locClasses.formLabel}}
                value="unfill"
                control={<Radio classes={{root: locClasses.radio}} color={colorSelected}/>}
                label="unfill"
                labelPlacement="start"
              />
            </RadioGroup>
          </div>
          <ComboBox className={locClasses.colorFormat}
            label="color format" dataArray={[{text:"asy colors"}, {text:"X11 colors"}, {text:"color wheel"}]}
            width="11rem" property="text" value={{text: `${colorFormat}`}}
            onChange={(event, value) => setColorFormat(value.text)}
          />
          <div className={locClasses.colorInput}> {colorInput(colorFormat)} </div>
          <div className={locClasses.colorSquare}> <ColorBox/> </div>
          <TextField
            className={locClasses.curvePen} size="small" label="curve pen" value={curvePen}
            onChange={(event) => dispatch(flActionCreator.updateFunction(id, fId, "curvePen", event.target.value))}
          />
        </div>
      </fieldset>
      <div className={locClasses.resetButton}>
        <Btn maxWidth="9rem" minWidth="9rem" minHeight="2rem" onClick={(event) => {}}> Reset to Default </Btn>
      </div>
    </div>
  );
}

