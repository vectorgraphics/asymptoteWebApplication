// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%   Pens&LabelsTab component
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { geActionCreator, haActionCreator, vaActionCreator } from "../../../../../../store/graphModule";
import { idSelector, geometriesSelector, horizontalAxesSelector, verticalAxesSelector, fIdSelector, funcEntitiesSelector, funcListSelector } from "../../../../../../store/selectors";
import { makeStyles, TextField, useTheme } from "@material-ui/core";
import { ComboBox } from "../../../../Atoms/ComboBox";
import { Btn } from "../../../../Atoms/Btn";
import { flActionCreator } from "../../../../../../store/funcSubModule";
import { ColorWheel } from "../Atoms/ColorWheel";
import { ColorBox } from "../Atoms/ColorBox";
import { asyColors, X11Colors } from "../../../../../../utils/colors";

const pensStyle = makeStyles((theme) => ({
  container : {
    display: "grid",
    minWidth: "700px",
    maxWidth: "900px",
    height: "calc(100% - 4rem)",
    gridTemplateRows: "1rem 30.25rem 2rem 10.5rem 1rem",
    margin: "1rem",
  },
  legend: {
    fontSize: "0.85rem",
    padding: "0 0.5rem",
    margin: "0 1rem",
  },
  labelField: {
    gridRow: "2/3",
    gridColumn: "6/7",
    "& label": {
      fontSize: "0.85rem",
    }
  },
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  penDefFieldSet: {
    gridRow: "2/3",
    borderRadius: "4px",
    border: "2px groove black",
  },
  penDefElementsContainer: {
    display: "grid",
    gridRow: "2/3",
    gridColumn: "2/3",
    gridTemplateRows: "1rem 3rem 1rem 3rem 1rem 3rem 1rem 3rem 1rem 3rem 0.5rem 8rem 0.5rem",
    gridTemplateColumns: "0.5rem 1fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5rem",
  },
  colorFormat: {
    gridRow: "2/3",
    gridColumn: "2/3",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  colorInput: {
    gridRow: "2/3",
    gridColumn: "4/5",
    marginTop: "-0.5rem",
    "& label": {
      fontSize: "0.85rem",
    },
    zIndex: 2500,
  },
  colorSquare: {
    gridRow: "2/3",
    gridColumn: "8/9",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  lineType: {
    gridRow: "4/5",
    gridColumn: "2/3",
  },
  lineWidth: {
    width: "9rem",
    gridRow: "4/5",
    gridColumn: "4/5",
    marginTop: "-0.5rem",
  },
  lineCap: {
    gridRow: "4/5",
    gridColumn: "6/7",
  },
  joinStyle: {
    gridRow: "4/5",
    gridColumn: "8/9",
  },
  fillRule: {
    gridRow: "6/7",
    gridColumn: "2/3",
  },
  baseAlign: {
    gridRow: "6/7",
    gridColumn: "4/5",
  },
  fontSize: {
    width: "9rem",
    gridRow: "6/7",
    gridColumn: "6/7",
    marginTop: "-0.5rem",
  },
  opacity: {
    width: "9rem",
    gridRow: "6/7",
    gridColumn: "8/9",
    marginTop: "-0.5rem",
  },
  blend: {
    gridRow: "8/9",
    gridColumn: "2/3",
  },
  penPattern: {
    gridRow: "8/9",
    gridColumn: "4/5",
  },
  penName: {
    width: "9rem",
    gridRow: "10/11",
    gridColumn: "2/3",
    marginTop: "-0.5rem",
  },
  addBtn: {
    gridRow: "10/11",
    gridColumn: "8/9",
  },
  consoleSubPane: {
    gridRow: "12/13",
    gridColumn: "2/9",
    border: "1px groove black",
    borderRadius: "4px",
  },
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  penListFieldSet: {
    gridRow: "4/5",
    borderRadius: "4px",
    border: "2px groove black",
  },
  penListContainer: {
    display: "grid",
    gridTemplateRows: "0.5rem 1fr 0.5rem",
    gridTemplateColumns: "0.5rem 4fr 0.5rem 1fr 0.5rem",
    marginTop: "0.25rem"
  },
  penListElementsContainer: {
    display: "grid",
    gridRow: "2/3",
    gridColumn: "2/3",
    gridTemplateRows: "0.5rem 1fr 0.5rem",
    gridTemplateColumns: "0.5rem 1fr 0.5rem",
    border: "1px solid dimgray",
  },
  penListControlsContainer: {
    display: "grid",
    gridRow: "2/3",
    gridColumn: "4/5",
    gridTemplateRows: "1rem 3rem 1rem 3rem",
    gridTemplateColumns: "0.5rem 1fr 0.5rem",
    border: "1px solid dimgray",
  },
  editBtn: {
    gridRow: "2/3",
    gridColumn: "2/3",
  },
  deleteBtn: {
    gridRow: "4/5",
    gridColumn: "2/3",
  }
}))

export function PensTab(props) {
  const locClasses = pensStyle();
  const [colorFormat, setColorFormat] = useState("asy colors");
  const [namedColor, setNamedColor] = useState("White");
  const colorSelected = useTheme().palette.radioAndCheckbox.selected;
  const id = useSelector(idSelector);
  const fId = useSelector(fIdSelector);
  const dispatch = useDispatch();

  let lineColor = "White";

  function colorInput(format) {
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
                dispatch(flActionCreator.updateFunction(id, fId, "lineColor", colorValue[0].value));
              }}/>
          </div>
        );
      case "color wheel":
        return <ColorWheel
          isOpen={true} startColor={lineColor}
          clickAway={(value) => dispatch(flActionCreator.updateFunction(id, fId, "lineColor", value))}
        />
      default:
        return null;
    }
  }

  return (
    <div className={locClasses.container}>
      <fieldset className={locClasses.penDefFieldSet}>
        <legend className={locClasses.legend}> Pen Definition </legend>
        <div className={locClasses.penDefElementsContainer}>
          <ComboBox
            className={locClasses.colorFormat}
            label="color format" dataArray={[{text:"asy colors"}, {text:"X11 colors"}, {text:"color wheel"}]}
            width="9rem" property="text" value={{text: `${colorFormat}`}}
            onChange={(event, value) => setColorFormat(value.text)}
          />
          <div className={locClasses.colorInput}> {colorInput(colorFormat)} </div>
          <div className={locClasses.colorSquare}> <ColorBox/> </div>
          <ComboBox
            className={locClasses.lineType} label="line type"
            dataArray={[{text:"solid"}, {text:"dotted"}, {text:"dashed"}, {text:"longdashed"}, {text:"dashdotted"}, {text:"longdashdotted"}, {text:"Dotted"}]}
            width="9rem" property="text" value={{text: `solid`}}
            // onChange={(event, value) => dispatch(axisActionCreator.update(id, "endArrow", value.text))}
          />
          <TextField
            className={locClasses.lineWidth} size="small" label="line width" value="10"
            // onChange={(event) => dispatch(flActionCreator.updateFunction(id, fId, "funcLabelPen", event.target.value))}
          />
          <ComboBox
            className={locClasses.lineCap} label="line cap"
            dataArray={[{text:"squarecap"}, {text:"roundcap"}, {text:"extendcap"}]}
            width="9rem" property="text" value={{text: `roundcap`}}
            // onChange={(event, value) => dispatch(axisActionCreator.update(id, "endArrow", value.text))}
          />
          <ComboBox
            className={locClasses.joinStyle} label="join style"
            dataArray={[{text:"mitterjoin"}, {text:"roundjoin"}, {text:"beveljoin"}]}
            width="9rem" property="text" value={{text: `joinStyle`}}
            // onChange={(event, value) => dispatch(axisActionCreator.update(id, "endArrow", value.text))}
          />
          <ComboBox
            className={locClasses.fillRule} label="fill rule"
            dataArray={[{text:"zerowinding"}, {text:"evenodd"}]}
            width="9rem" property="text" value={{text: `fillRule`}}
            // onChange={(event, value) => dispatch(axisActionCreator.update(id, "endArrow", value.text))}
          />
          <ComboBox
            className={locClasses.baseAlign} label="base align"
            dataArray={[{text:"nobasealign"}, {text:"basealgin"}]}
            width="9rem" property="text" value={{text: `baseAlign`}}
            // onChange={(event, value) => dispatch(axisActionCreator.update(id, "endArrow", value.text))}
          />
          <TextField
            className={locClasses.fontSize} size="small" label="fontsize" value="10"
            // onChange={(event) => dispatch(flActionCreator.updateFunction(id, fId, "funcLabelPen", event.target.value))}
          />
          {/*<ComboBox*/}
          {/*  className={locClasses.fontSize} label="fontSize"*/}
          {/*  dataArray={[{text:"None"}, {text:"EndArrow"}]}*/}
          {/*  width="9rem" property="text" value={{text: `fontSize`}}*/}
          {/*  // onChange={(event, value) => dispatch(axisActionCreator.update(id, "endArrow", value.text))}*/}
          {/*/>*/}
          <TextField
            className={locClasses.opacity} size="small" label="opacity" value="1"
            // onChange={(event) => dispatch(flActionCreator.updateFunction(id, fId, "funcLabelPen", event.target.value))}
          />
          <ComboBox
            className={locClasses.blend} label="blend"
            dataArray={[{text:"None"}, {text:"EndArrow"}]}
            width="9rem" property="text" value={{text: `blend`}}
            // onChange={(event, value) => dispatch(axisActionCreator.update(id, "endArrow", value.text))}
          />
          <ComboBox
            className={locClasses.penPattern} label="pan pattern"
            dataArray={[{text:"tile"}, {text:"filledtilewithmargin"}, {text:"checker"}, {text:"brick"}]}
            width="9rem" property="text" value={{text: `penPattern`}}
            // onChange={(event, value) => dispatch(axisActionCreator.update(id, "endArrow", value.text))}
          />
          <TextField
            className={locClasses.penName} size="small" label="pen name" value=""
            // onChange={(event) => dispatch(flActionCreator.updateFunction(id, fId, "funcLabelPen", event.target.value))}
          />
          <Btn minWidth="9rem" maxWidth="8rem" minHeight="2rem" className={locClasses.addBtn}> Add Pen </Btn>
          <div className={locClasses.consoleSubPane}/>
        </div>
      </fieldset>
      <fieldset className={locClasses.penListFieldSet}>
        <legend className={locClasses.legend}> Available Pens </legend>
        <div className={locClasses.penListContainer}>
          <div className={locClasses.penListElementsContainer}>

          </div>
          <div className={locClasses.penListControlsContainer}>
            <Btn minWidth="5rem" maxWidth="100%" minHeight="2rem" className={locClasses.editBtn}> Edit </Btn>
            <Btn minWidth="5rem" maxWidth="100%" minHeight="2rem" className={locClasses.deleteBtn}> Delete </Btn>
          </div>
        </div>
      </fieldset>
    </div>
  )
}