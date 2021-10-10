// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%   FunctionTab component
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { flActionCreator } from "../../../../../../store/funcSubModule";
import { idSelector, fIdSelector, funcEntitiesSelector, funcListSelector } from "../../../../../../store/selectors";
import { makeStyles, useTheme, RadioGroup, TextField, FormControlLabel, Radio } from "@material-ui/core";
import { ComboBox } from "../../../../Atoms/ComboBox";
import { ColorWheel } from "../Atoms/ColorWheel";
import { Btn } from "../../../../Atoms/Btn";
import { SelectField } from "../../../../Atoms/SelectField";

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
    }
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

  const [colorFormat, setColorFormat] = useState("asy colors");
  const [namedColor, setNamedColor] = useState("White");

  function colorInput(format){
    const initAsyNamedColor = asyColors.filter((obj) => obj.text === namedColor);
    const initX11NamedColor = X11Colors.filter((obj) => obj.text === namedColor);
    switch (format) {
      case "asy colors":
        return (
          <div style={{marginTop: "0.5rem"}}>
            <ComboBox
              label="color"
              dataArray={asyColors}
              property="text"
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
              label="color"
              dataArray={X11Colors}
              property="text"
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
  function colorBox(format){
    return (
      <div style={{
        display: "block",
        minWidth: "2rem",
        maxWidth: "2rem",
        minHeight: "2rem",
        maxHeight: "2rem",
        backgroundColor: markerColor,
        border: "1px solid dimgrey"
      }}/>
    );
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
          <div className={locClasses.colorSquare}> {colorBox(colorFormat)} </div>
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

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Internal Components
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const asyColors = [
  {text:"palered", value:"rgb(255,192,192)"},
  {text:"lightred", value:"rgb(255,128,128)"},
  {text:"mediumred", value:"rgb(255,64,64)"},
  {text:"red", value:"rgb(255,0,0)"},
  {text:"heavyred", value:"rgb(192,0,0)"},
  {text:"brown", value:"rgb(128,0,0)"},
  {text:"darkbrown", value:"rgb(64,0,0)"},
  {text:"palegreen", value:"rgb(192,255,192)"},
  {text:"lightgreen", value:"rgb(128,255,128)"},
  {text:"mediumgreen", value:"rgb(64,255,64)"},
  {text:"green", value:"rgb(0,255,0)"},
  {text:"heavygreen", value:"rgb(0,192,0)"},
  {text:"deepgreen", value:"rgb(0,128,0)"},
  {text:"darkgreen", value:"rgb(0,64,0)"},
  {text:"paleblue", value:"rgb(192,192,255)"},
  {text:"lightblue", value:"rgb(128,128,255)"},
  {text:"mediumblue", value:"rgb(64,64,255)"},
  {text:"blue", value:"rgb(0,0,255)"},
  {text:"heavyblue", value:"rgb(0,0,192)"},
  {text:"deepblue", value:"rgb(0,0,128)"},
  {text:"darkblue", value:"rgb(0,0,64)"},
  {text:"palecyan", value:"rgb(192,255,255)"},
  {text:"lightcyan", value:"rgb(128,255,255)"},
  {text:"mediumcyan", value:"rgb(64,255,255)"},
  {text:"cyan", value:"rgb(0,255,255)"},
  {text:"heavycyan", value:"rgb(0,192,192)"},
  {text:"deepcyan", value:"rgb(0,128,128)"},
  {text:"darkcyan", value:"rgb(0,64,64)"},
  {text:"pink", value:"rgb(255,192,255)"},
  {text:"lightmagenta", value:"rgb(255,128,255)"},
  {text:"mediummagenta", value:"rgb(255,64,255)"},
  {text:"magenta", value:"rgb(255,0,255)"},
  {text:"heavymagenta", value:"rgb(192,0,192)"},
  {text:"deepmagenta", value:"rgb(128,0,128)"},
  {text:"darkmagenta", value:"rgb(64,0,64)"},
  {text:"paleyellow", value:"rgb(255,255,192)"},
  {text:"lightyellow", value:"rgb(255,255,128)"},
  {text:"mediumyellow", value:"rgb(255,255,64)"},
  {text:"yellow", value:"rgb(255,255,0)"},
  {text:"lightolive", value:"rgb(192,192,0)"},
  {text:"olive", value:"rgb(128,128,0)"},
  {text:"darkolive", value:"rgb(64,64,0)"},
  {text:"palegray", value:"rgb(243,243,243)"},
  {text:"lightgray", value:"rgb(230,230,230)"},
  {text:"mediumgray", value:"rgb(192,192,192)"},
  {text:"gray", value:"rgb(128,128,128)"},
  {text:"heavygray", value:"rgb(64,64,64`)"},
  {text:"deepgray", value:"rgb(25,25,25)"},
  {text:"darkgray", value:"rgb(12,12,12)"},
  {text:"black", value:"rgb(0,0,0)"},
  {text:"white", value:"rgb(255)"},
  {text:"orange", value:"rgb(255,128,0)"},
  {text:"fuchsia", value:"rgb(255,0,128)"},
  {text:"chartreuse", value:"rgb(128,255,0)"},
  {text:"springgreen", value:"rgb(0,255,128)"},
  {text:"purple", value:"rgb(128,0,255)"},
  {text:"royalblue", value:"rgb(0,128,255)"},
  {text: "White", value: "rgb(255,255,255)"},
]

  // {text:"Cyan", value:"rgba(255,0,0,0)"},
  // {text:"Magenta", value:"rgba(0,255,0,0)"},
  // {text:"Yellow", value:"rgba(0,0,255,0)"},
  // {text:"Black", value:"rgb(0,0,0,255)"},
  // {text:"cmyk(red)", value:"rgba(0,255,255,0)"},
  // {text:"cmyk(blue)", value:"rgba(255,255,0,0)"},
  // {text:"cmyk(green)", value:"rgba(255,0,255,0)"},

const X11Colors = [
  {text: "AliceBlue", value: "rgb(240,248,255)"},
  {text: "AntiqueWhite", value: "rgb(250,235,215)"},
  {text: "Aqua", value: "rgb(0,255,255)"},
  {text: "Aquamarine", value: "rgb(127,255,212)"},
  {text: "Azure", value: "rgb(240,255,255)"},
  {text: "Beige", value: "rgb(245,245,220)"},
  {text: "Bisque", value: "rgb(255,228,196)"},
  {text: "Black", value: "rgb(0,0,0)"},
  {text: "BlanchedAlmond", value: "rgb(255,235,205)"},
  {text: "Blue", value: "rgb(0,0,255)"},
  {text: "BlueViolet", value: "rgb(138,43,226)"},
  {text: "Brown", value: "rgb(165,42,42)"},
  {text: "BurlyWood", value: "rgb(222,184,135)"},
  {text: "CadetBlue", value: "rgb(95,158,160)"},
  {text: "Chartreuse", value: "rgb(127,255,0)"},
  {text: "Chocolate", value: "rgb(210,105,30)"},
  {text: "Coral", value: "rgb(255,127,80)"},
  {text: "CornflowerBlue", value: "rgb(100,149,237)"},
  {text: "Cornsilk", value: "rgb(255,248,220)"},
  {text: "Crimson", value: "rgb(220,20,60)"},
  {text: "Cyan", value: "rgb(0,255,255)"},
  {text: "DarkBlue", value: "rgb(0,0,139)"},
  {text: "DarkCyan", value: "rgb(0,139,139)"},
  {text: "DarkGoldenrod", value: "rgb(184,134,11)"},
  {text: "DarkGray", value: "rgb(169,169,169)"},
  {text: "DarkGreen", value: "rgb(0,100,0)"},
  {text: "DarkKhaki", value: "rgb(189,183,107)"},
  {text: "DarkMagenta", value: "rgb(139,0,139)"},
  {text: "DarkOliveGreen", value: "rgb(85,107,47)"},
  {text: "DarkOrange", value: "rgb(255,140,0)"},
  {text: "DarkOrchid", value: "rgb(153,50,204)"},
  {text: "DarkRed", value: "rgb(139,0,0)"},
  {text: "DarkSalmon", value: "rgb(233,150,122)"},
  {text: "DarkSeaGreen", value: "rgb(143,188,143)"},
  {text: "DarkSlateBlue", value: "rgb(72,61,139)"},
  {text: "DarkSlateGray", value: "rgb(47,79,79)"},
  {text: "DarkTurquoise", value: "rgb(0,206,209)"},
  {text: "DarkViolet", value: "rgb(148,0,211)"},
  {text: "DeepPink", value: "rgb(255,20,147)"},
  {text: "DeepSkyBlue", value: "rgb(0,191,255)"},
  {text: "DimGray", value: "rgb(105,105,105)"},
  {text: "DodgerBlue", value: "rgb(30,144,255)"},
  {text: "FireBrick", value: "rgb(178,34,34)"},
  {text: "FloralWhite", value: "rgb(255,250,240)"},
  {text: "ForestGreen", value: "rgb(34,139,34)"},
  {text: "Fuchsia", value: "rgb(255,0,255)"},
  {text: "Gainsboro", value: "rgb(220,220,220)"},
  {text: "GhostWhite", value: "rgb(248,248,255)"},
  {text: "Gold", value: "rgb(255,215,0)"},
  {text: "Goldenrod", value: "rgb(218,165,32)"},
  {text: "Gray", value: "rgb(128,128,128)"},
  {text: "Green", value: "rgb(0,128,0)"},
  {text: "GreenYellow", value: "rgb(173,255,47)"},
  {text: "Honeydew", value: "rgb(240,255,240)"},
  {text: "HotPink", value: "rgb(255,105,180)"},
  {text: "IndianRed", value: "rgb(205,92,92)"},
  {text: "Indigo", value: "rgb(75,0,130)"},
  {text: "Ivory", value: "rgb(255,255,240)"},
  {text: "Khaki", value: "rgb(240,230,140)"},
  {text: "Lavender", value: "rgb(230,230,250)"},
  {text: "LavenderBlush", value: "rgb(255,240,245)"},
  {text: "LawnGreen", value: "rgb(124,252,0)"},
  {text: "LemonChiffon", value: "rgb(255,250,205)"},
  {text: "LightBlue", value: "rgb(173,216,230)"},
  {text: "LightCoral", value: "rgb(240,128,128)"},
  {text: "LightCyan", value: "rgb(224,255,255)"},
  {text: "LightGoldenrodYellow", value: "rgb(250,250,210)"},
  {text: "LightGreen", value: "rgb(144,238,144)"},
  {text: "LightGrey", value: "rgb(211,211,211)"},
  {text: "LightPink", value: "rgb(255,182,193)"},
  {text: "LightSalmon", value: "rgb(255,160,122)"},
  {text: "LightSeaGreen", value: "rgb(32,178,170)"},
  {text: "LightSkyBlue", value: "rgb(135,206,250)"},
  {text: "LightSlateGray", value: "rgb(119,136,153)"},
  {text: "LightSteelBlue", value: "rgb(176,196,222)"},
  {text: "LightYellow", value: "rgb(255,255,224)"},
  {text: "Lime", value: "rgb(0,255,0)"},
  {text: "LimeGreen", value: "rgb(50,205,50)"},
  {text: "Linen", value: "rgb(250,240,230)"},
  {text: "Magenta", value: "rgb(255,0,255)"},
  {text: "Maroon", value: "rgb(128,0,0)"},
  {text: "MediumAquamarine", value: "rgb(102,205,170)"},
  {text: "MediumBlue", value: "rgb(0,0,205)"},
  {text: "MediumOrchid", value: "rgb(186,85,211)"},
  {text: "MediumPurple", value: "rgb(147,112,219)"},
  {text: "MediumSeaGreen", value: "rgb(60,179,113)"},
  {text: "MediumSlateBlue", value: "rgb(123,104,238)"},
  {text: "MediumSpringGreen", value: "rgb(0,250,154)"},
  {text: "MediumTurquoise", value: "rgb(72,209,204)"},
  {text: "MediumVioletRed", value: "rgb(199,21,133)"},
  {text: "MidnightBlue", value: "rgb(25,25,112)"},
  {text: "MintCream", value: "rgb(245,255,250)"},
  {text: "MistyRose", value: "rgb(255,228,225)"},
  {text: "Moccasin", value: "rgb(255,228,181)"},
  {text: "NavajoWhite", value: "rgb(255,222,173)"},
  {text: "Navy", value: "rgb(0,0,128)"},
  {text: "OldLace", value: "rgb(253,245,230)"},
  {text: "Olive", value: "rgb(128,128,0)"},
  {text: "OliveDrab", value: "rgb(107,142,35)"},
  {text: "Orange", value: "rgb(255,165,0)"},
  {text: "OrangeRed", value: "rgb(255,69,0)"},
  {text: "Orchid", value: "rgb(218,112,214)"},
  {text: "PaleGoldenrod", value: "rgb(238,232,170)"},
  {text: "PaleGreen", value: "rgb(152,251,152)"},
  {text: "PaleTurquoise", value: "rgb(175,238,238)"},
  {text: "PaleVioletRed", value: "rgb(219,112,147)"},
  {text: "PapayaWhip", value: "rgb(255,239,213)"},
  {text: "PeachPuff", value: "rgb(255,218,185)"},
  {text: "Peru", value: "rgb(205,133,63)"},
  {text: "Pink", value: "rgb(255,192,203)"},
  {text: "Plum", value: "rgb(221,160,221)"},
  {text: "PowderBlue", value: "rgb(176,224,230)"},
  {text: "Purple", value: "rgb(128,0,128)"},
  {text: "Red", value: "rgb(255,0,0)"},
  {text: "RosyBrown", value: "rgb(188,143,143)"},
  {text: "RoyalBlue", value: "rgb(65,105,225)"},
  {text: "SaddleBrown", value: "rgb(139,69,19)"},
  {text: "Salmon", value: "rgb(250,128,114)"},
  {text: "SandyBrown", value: "rgb(244,164,96)"},
  {text: "SeaGreen", value: "rgb(46,139,87)"},
  {text: "Seashell", value: "rgb(255,245,238)"},
  {text: "Sienna", value: "rgb(160,82,45)"},
  {text: "Silver", value: "rgb(192,192,192)"},
  {text: "SkyBlue", value: "rgb(135,206,235)"},
  {text: "SlateBlue", value: "rgb(106,90,205)"},
  {text: "SlateGray", value: "rgb(112,128,144)"},
  {text: "Snow", value: "rgb(255,250,250)"},
  {text: "SpringGreen", value: "rgb(0,255,127)"},
  {text: "SteelBlue", value: "rgb(70,130,180)"},
  {text: "Tan", value: "rgb(210,180,140)"},
  {text: "Teal", value: "rgb(0,128,128)"},
  {text: "Thistle", value: "rgb(216,191,216)"},
  {text: "Tomato", value: "rgb(255,99,71)"},
  {text: "Turquoise", value: "rgb(64,224,208)"},
  {text: "Violet", value: "rgb(238,130,238)"},
  {text: "Wheat", value: "rgb(245,222,179)"},
  {text: "White", value: "rgb(255,255,255)"},
  {text: "WhiteSmoke", value: "rgb(245,245,245)"},
  {text: "Yellow", value: "rgb(255,255,0)"},
  {text: "YellowGreen", value: "rgb(154,205,50)"},
]




// case "rgb":
//   return <TextField
//     size="small" label="color" value={colorRgb}
//     onChange={(event) => {
//       const valueToSet = (event.target.value === "")? "0,0,0": `${event.target.value}`;
//       setColorRgb(valueToSet);
//     }}/>;
// case "hex":
//   return <TextField
//     size="small" label="color" value={colorHex}
//     onChange={(event) => {
//       setColorHex(`${event.target.value}`);
//     }}/>;



// case "rgb":
//   colorToShow = `rgb(${colorRgb})`;
//   break;
// case "hex":
//   colorToShow = colorHex;
//   break;



