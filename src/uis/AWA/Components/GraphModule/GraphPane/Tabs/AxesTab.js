// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%   AxesTab component
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { geActionCreator, haActionCreator, vaActionCreator } from "../../../../../../store/graphModule";
import { idSelector, geometriesSelector, horizontalAxesSelector, verticalAxesSelector } from "../../../../../../store/selectors";
import { makeStyles, TextField, } from "@material-ui/core";
import { ComboBox } from "../../../../Atoms/ComboBox";
import { SliderInput } from "../../../../Atoms/SliderInput";
import { Btn } from "../../../../Atoms/Btn";
import { SelectField } from "../../../../Atoms/SelectField";

const axesStyle = makeStyles((theme) => ({
  container : {
    display: "grid",
    minWidth: "700px",
    maxWidth: "900px",
    height: "calc(100% - 4rem)",
    gridTemplateRows: "1rem 5rem 1rem 40rem 1rem 3rem",
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
  graphFieldSet: {
    gridRow: "2/3",
    borderRadius: "4px",
    border: "2px groove black",
  },
  graphElementsContainer: {
    display: "grid",
    gridTemplateRows: "0.5rem 3rem 0.5rem",
    gridTemplateColumns: "0.5rem 1fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5rem",
  },
  width: {
    width: "8rem",
    gridRow: "2/3",
    gridColumn: "2/3",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  height: {
    width: "8rem",
    gridRow: "2/3",
    gridColumn: "4/5",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  aspect: {
    marginTop: "0.5rem",
    gridRow: "2/3",
    gridColumn: "8/9",
  },
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  axesFieldSet: {
    gridRow: "4/5",
    borderRadius: "4px",
    border: "2px groove black",
  },
  axesElementsContainer: {
    display: "grid",
    gridTemplateRows: "0.5rem 2.4rem 1rem 13rem 1rem 2.4rem 1rem 17rem",
    padding: "0 0.5rem",
  },
  axisSelector: {
    marginTop: "0.25rem",
    gridRow: "2/3",
    gridColumn: "2/3",
  },
  axisMainProps: {
    display: "grid",
    gridRow: "4/5",
    gridColumn: "2/9",
    border: "1px groove gray",
    borderRadius: "4px",
    gridTemplateRows: "0.5rem 3rem 1rem 3rem 1rem 3rem 0.5rem",
    gridTemplateColumns: "0.5rem 1fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5rem",
  },
  axisLabel: {
    width: "8rem",
    gridRow: "2/3",
    gridColumn: "2/3",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  axisRelativePosition: {
    gridRow: "2/3",
    gridColumn: "4/5",
  },
  axisMin: {
    width: "8rem",
    gridRow: "2/3",
    gridColumn: "6/7",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  axisMax: {
    width: "8rem",
    gridRow: "2/3",
    gridColumn: "8/9",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  axisAlign: {
    gridRow: "4/5",
    gridColumn: "2/3",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  axisLocation: {
    paddingTop: "0.5rem",
    gridRow: "4/5",
    gridColumn: "4/5",
  },
  axisScale: {
    paddingTop: "0.5rem",
    gridRow: "4/5",
    gridColumn: "6/7",
  },
  axisExtended: {
    paddingTop: "0.5rem",
    gridRow: "4/5",
    gridColumn: "8/9",
  },
  axisEndArrow: {
    paddingTop: "0.5rem",
    gridRow: "6/7",
    gridColumn: "2/3",
  },
  axisPen: {
    gridRow: "6/7",
    gridColumn: "4/5",
    "& label": {
      fontSize: "0.85rem",
    }
  },
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  ticksSelector: {
    marginTop: "0.25rem",
    gridRow: "6/7",
    gridColumn: "2/3",
  },
  ticksProps: {
    gridRow: "8/9",
    gridColumn: "2/9",
    border: "1px groove gray",
    borderRadius: "4px",
    display: "grid",
    gridTemplateRows: "0.5rem 3rem 1rem 3rem 1rem 3rem 1rem 3rem 0.5rem",
    gridTemplateColumns: "0.5rem 1fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5rem",
  },
  ticksLabel: {
    width: "8rem",
    gridRow: "2/3",
    gridColumn: "2/3",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  ticksLabelFormat: {
    width: "8rem",
    gridRow: "2/3",
    gridColumn: "4/5",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  omitTickLabels: {
    gridRow: "2/3",
    gridColumn: "6/7",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  omitTicks: {
    gridRow: "2/3",
    gridColumn: "8/9",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  majorTicksDivision: {
    width: "8rem",
    gridRow: "4/5",
    gridColumn: "2/3",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  minorTicksDivision: {
    width: "8rem",
    gridRow: "4/5",
    gridColumn: "4/5",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  majorTicksSteps: {
    width: "8rem",
    gridRow: "4/5",
    gridColumn: "6/7",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  minorTicksSteps: {
    width: "8rem",
    gridRow: "4/5",
    gridColumn: "8/9",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  majorTicksSize: {
    width: "8rem",
    gridRow: "6/7",
    gridColumn: "2/3",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  minorTicksSize: {
    width: "8rem",
    gridRow: "6/7",
    gridColumn: "4/5",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  majorTicksPen: {
    width: "8rem",
    gridRow: "6/7",
    gridColumn: "6/7",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  minorTicksPen: {
    width: "8rem",
    gridRow: "6/7",
    gridColumn: "8/9",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  ticksExtend: {
    width: "8rem",
    gridRow: "8/9",
    gridColumn: "2/3",
    paddingTop: "0.5rem",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  resetButton: {
    display: "flex",
    paddingRight: "calc(0.5rem + 4px)",
    flexFlow: "row-reverse nowrap",
    alignItems: "center",
    gridRow: "6/7",
    borderRadius: "4px",
  },
}))


export function AxesTab(props) {
  const locClasses = axesStyle(props);
  const id = useSelector(idSelector);
  const geometries = useSelector(geometriesSelector);
  const horizontalAxes = useSelector(horizontalAxesSelector);
  const verticalAxes = useSelector(verticalAxesSelector);
  const dispatch = useDispatch();

  const [axis, setAxis] = useState("Horizontal");
  const axisActionCreator = (axis === "Horizontal")? haActionCreator: vaActionCreator;

  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Graph States
  const {width, height, aspectRatio} = geometries[id];
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Axes States
  const {
    label, relativePosition, min, max, align, axisLocation, scale, extend, axisPen, endArrow,
    ticks, ticksLabel, ticksLabelFormat, ticksExtend, omitTicks, omitTicksLabels,
    majorTicksDivision, minorTicksDivision, majorTicksSteps, minorTicksSteps, majorTicksSize,
    minorTicksSize, minorTicksPen, majorTicksPen,
  } = (axis === "Horizontal")? horizontalAxes[id]: verticalAxes[id];

  return (
    <div className={locClasses.container}>
      <fieldset className={locClasses.graphFieldSet}>
        <legend className={locClasses.legend}> Graph </legend>
        <div className={locClasses.graphElementsContainer}>
          <TextField
            className={locClasses.width} size="small" label="width" value={width}
            onChange={(event) => dispatch(geActionCreator.update(id, "width", event.target.value))}/>
          <TextField
            className={locClasses.height} size="small" label="height" value={height}
            onChange={(event) => dispatch(geActionCreator.update(id, "height", event.target.value))}/>
          <ComboBox className={locClasses.aspect}
            label="aspect ratio" dataArray={[{text:"Aspect"}, {text:"Ignore-Aspect"},]}
            width="9rem" property="text" value={{text: `${aspectRatio}`}}
            onChange={(event, value) => dispatch(geActionCreator.update(id, "aspectRatio", value.text))}/>
        </div>
      </fieldset>

      <fieldset className={locClasses.axesFieldSet}>
        <legend className={locClasses.legend}> Axes </legend>
        <div className={locClasses.axesElementsContainer}>

          <ComboBox className={locClasses.axisSelector}
            label="select axis" dataArray={[{text:"Horizontal"}, {text:"Vertical"}]}
            width="8rem" property="text" value={{text: `${axis}`}}
            onChange={(event, value) => setAxis(value.text)}
          />
          <fieldset className={locClasses.axisMainProps}>
            <legend className={locClasses.legend}> Axis Main Properties </legend>
            <TextField
              className={locClasses.axisLabel} size="small" label="label" value={label}
              onChange={(event) => dispatch(axisActionCreator.update(id, "label", event.target.value))}/>
            <SliderInput
              className={locClasses.axisRelativePosition}
              passedHandler={(newValue) => dispatch(axisActionCreator.update(id, "relativePosition", newValue))}
            />
            <TextField
              className={locClasses.axisMin} size="small" label="min" value={min}
              onChange={(event) => dispatch(axisActionCreator.update(id, "min", event.target.value))}
            />
            <TextField
              className={locClasses.axisMax} size="small" label="max" value={max}
              onChange={(event) => dispatch(axisActionCreator.update(id, "max", event.target.value))}
            />
            <TextField
              className={locClasses.axisAlign} size="small" label="align" value={align}
             onChange={(event) => dispatch(axisActionCreator.update(id, "align", event.target.value))}
            />
            <ComboBox
              className={locClasses.axisLocation} label="axis-location"
              dataArray={
                (axis === "Horizontal")
                  ? [{text:"bottom"}, {text:"top"}, {text:"bottom-top"}]
                  : [{text:"left"}, {text:"right"}, {text:"left-right"}]
              }
              width="8rem" property="text" value={{text: `${axisLocation}`}}
              onChange={(event, value) => dispatch(axisActionCreator.update(id, "axisLocation", value.text))}
            />
            <ComboBox
              className={locClasses.axisScale} label="scale"
              dataArray={[{text:"linear"}, {text:"log"}]}
              width="8rem" property="text" value={{text:`${scale}`}}
              onChange={(event, value) => dispatch(axisActionCreator.update(id, "scale", value.text))}/>
            <ComboBox
              className={locClasses.axisExtended} label="extend"
              dataArray={[{text:"true"}, {text:"false"}]}
              width="8rem" property="text" value={{text: `${extend}`}}
              onChange={(event, value) => dispatch(axisActionCreator.update(id, "extend", value.text))}/>
            <ComboBox
              className={locClasses.axisEndArrow} label="EndArrow"
              dataArray={[{text:"None"}, {text:"EndArrow"}]}
              width="rem" property="text" value={{text: `${endArrow}`}}
              onChange={(event, value) => dispatch(axisActionCreator.update(id, "endArrow", value.text))}/>
            <TextField
              className={locClasses.axisPen} size="small" label="axis pen" value={axisPen}
              onChange={(event) => dispatch(axisActionCreator.update(id, "axisPen", event.target.value))}
            />
          </fieldset>

          <ComboBox
            className={locClasses.ticksSelector} label="ticks"
            dataArray={[{text:"NoTicks"}, {text:"LeftTicks"}, {text:"RightTicks"}, {text:"Ticks"}]}
            width="8rem" property="text" value={{text: `${ticks}`}}
            onChange={(event, value) => dispatch(axisActionCreator.update(id, "ticks", value.text))}
          />

          <fieldset className={locClasses.ticksProps}>
            <legend className={locClasses.legend}> Axis Ticks Properties </legend>
            <TextField
              className={locClasses.ticksLabel} size="small" label="label" value={ticksLabel}
              onChange={(event) => dispatch(axisActionCreator.update(id, "ticksLabel", event.target.value))}
              disabled={(ticks === "NoTicks")}/>
            <TextField
              className={locClasses.ticksLabelFormat} size="small" label="label format" value={ticksLabelFormat}
              onChange={(event) => dispatch(axisActionCreator.update(id, "ticksLabelFormat", event.target.value))}
              disabled={(ticks === "NoTicks")}/>
            <TextField
              className={locClasses.omitTickLabels} size="small" label="omit ticks label(s)" value={omitTicksLabels}
              onChange={(event) => dispatch(axisActionCreator.update(id, "omitTicksLabels", event.target.value))}
              disabled={(ticks === "NoTicks")}/>
            <TextField
              className={locClasses.omitTicks} size="small" label="omit ticks" value={omitTicks}
              onChange={(event) => dispatch(axisActionCreator.update(id, "omitTicks", event.target.value))}
              disabled={(ticks === "NoTicks")}/>

            <TextField
              className={locClasses.majorTicksDivision} size="small" label="major division" value={majorTicksDivision}
              onChange={(event) => dispatch(axisActionCreator.update(id, "majorTicksDivision", event.target.value))}
              disabled={(ticks === "NoTicks")}/>
            <TextField
              className={locClasses.minorTicksDivision} size="small" label="minor division" value={minorTicksDivision}
              onChange={(event) => dispatch(axisActionCreator.update(id, "minorTicksDivision", event.target.value))}
              disabled={(ticks === "NoTicks")}/>
            <TextField
              className={locClasses.majorTicksSteps} size="small" label="major steps" value={majorTicksSteps}
              onChange={(event) => dispatch(axisActionCreator.update(id, "majorTicksSteps", event.target.value))}
              disabled={(ticks === "NoTicks")}/>
            <TextField
              className={locClasses.minorTicksSteps} size="small" label="minor steps" value={minorTicksSteps}
              onChange={(event) => dispatch(axisActionCreator.update(id, "minorTicksSteps", event.target.value))}
              disabled={(ticks === "NoTicks")}/>

            <TextField
              className={locClasses.majorTicksSize} size="small" label="major size" value={majorTicksSize}
              onChange={(event) => dispatch(axisActionCreator.update(id, "majorTicksSize", event.target.value))}
              disabled={(ticks === "NoTicks")}/>
            <TextField
              className={locClasses.minorTicksSize} size="small" label="minor size" value={minorTicksSize}
              onChange={(event) => dispatch(axisActionCreator.update(id, "minorTicksSize", event.target.value))}
              disabled={(ticks === "NoTicks")}/>
            <TextField
              className={locClasses.majorTicksPen} size="small" label="major pen" value={majorTicksPen}
              onChange={(event) => dispatch(axisActionCreator.update(id, "majorTicksPen", event.target.value))}
              disabled={(ticks === "NoTicks")}/>
            <TextField
              className={locClasses.minorTicksPen} size="small" label="minor pen" value={minorTicksPen}
              onChange={(event) => dispatch(axisActionCreator.update(id, "minorTicksPen", event.target.value))}
              disabled={(ticks === "NoTicks")}/>
            <ComboBox
              className={locClasses.ticksExtend} label="ticks extend"
              dataArray={[{text:"true"}, {text:"false"}]}
              width="8rem" property="text" value={{text:`${ticksExtend}`}}
              onChange={(event, value) => dispatch(axisActionCreator.update(id, "ticksExtend", value.text))}
              disabled={(ticks === "NoTicks")}
            />
          </fieldset>

        </div>
      </fieldset>
      <div className={locClasses.resetButton}>
        <Btn
          maxWidth="9rem" minWidth="9rem" minHeight="2rem"
          onClick={(event) => {
            dispatch(geActionCreator.resetGeometry(id));
            dispatch(haActionCreator.resetHorizontalAxes(id));
            dispatch(vaActionCreator.resetVerticalAxes(id));
          }}
        > Reset to Default </Btn>
      </div>
    </div>
  )
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Internal Components
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
