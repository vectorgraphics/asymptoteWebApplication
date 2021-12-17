// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%   Pens&LabelsTab component
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { geActionCreator, haActionCreator, vaActionCreator } from "../../../../../../store/graphModule";
import { idSelector, geometriesSelector, horizontalAxesSelector, verticalAxesSelector } from "../../../../../../store/selectors";
import { makeStyles, TextField, } from "@material-ui/core";
import { ComboBox } from "../../../../Atoms/ComboBox";
import { Btn } from "../../../../Atoms/Btn";
import { SelectField } from "../../../../Atoms/SelectField";
import { asyColors, X11Colors } from "../../../../../../utils/colors";

const pensStyle = makeStyles((theme) => ({
  container : {
    display: "grid",
    minWidth: "700px",
    maxWidth: "900px",
    height: "calc(100% - 4rem)",
    gridTemplateRows: "1rem 21.5rem 1rem 5rem 0.65rem 22.5rem 1rem",
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
  LabelDefFieldSet: {
    gridRow: "2/3",
    borderRadius: "4px",
    border: "2px groove black",
  },
  LabelDefElementsContainer: {
    display: "grid",
    gridRow: "2/3",
    gridColumn: "2/3",
    gridTemplateRows: "0.5rem 3rem 1rem 3rem 1rem 3rem 1rem 3rem 1rem 3rem 0.5rem",
    gridTemplateColumns: "0.5rem 1fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5rem",
  },
  colorSet: {
    width: "8rem",
    gridRow: "2/3",
    gridColumn: "2/3",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  color: {
    width: "8rem",
    gridRow: "2/3",
    gridColumn: "4/5",
    "& label": {
      fontSize: "0.85rem",
    }
  },
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  consoleSubPane: {
    gridRow: "4/5",
    border: "2px groove black",
    borderRadius: "4px",
  },
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  LabelListFieldSet: {
    gridRow: "6/7",
    borderRadius: "4px",
    border: "2px groove black",
  },
  LabelListContainer: {
    display: "grid",
    gridTemplateRows: "0.5rem 1fr 0.5rem",
    gridTemplateColumns: "0.5rem 4fr 0.5rem 1fr 0.5rem",
  },
  LabelListElementsContainer: {
    display: "grid",
    gridRow: "2/3",
    gridColumn: "2/3",
    gridTemplateRows: "0.5rem 3rem 1rem 3rem 1rem 3rem 1rem 3rem 1rem 3rem 0.5rem",
    gridTemplateColumns: "0.5rem 1fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5rem",
    border: "1px solid dimgray",
  },
  LabelListControlsContainer: {
    display: "grid",
    gridRow: "2/3",
    gridColumn: "4/5",
    gridTemplateRows: "0.5rem 2rem 0.5rem 2rem 1rem 1fr 0.5rem",
    gridTemplateColumns: "0.5rem 1fr 0.5rem",
    border: "1px solid dimgray",
  },
}))

export function LabelsTab(props) {
  const locClasses = pensStyle();
  return (
    <div className={locClasses.container}>
      <fieldset className={locClasses.LabelDefFieldSet}>
        <legend className={locClasses.legend}> Label Definition </legend>
        <div className={locClasses.LabelDefElementsContainer}>
          {/*<ComboBox */}
          {/*  className={locClasses.aspect}*/}
          {/*  label="aspect ratio" dataArray={[{text:"Aspect"}, {text:"Ignore-Aspect"},]}*/}
          {/*  width="9rem" property="text" value={{text: `${aspectRatio}`}}*/}
          {/*  onChange={(event, value) => dispatch(geActionCreator.update(id, "aspectRatio", value.text))}/>*/}
        </div>
      </fieldset>

      <div className={locClasses.consoleSubPane}>

      </div>

      <fieldset className={locClasses.LabelListFieldSet}>
        <legend className={locClasses.legend}> Available Labels </legend>
        <div className={locClasses.LabelListContainer}>
          <div className={locClasses.LabelListElementsContainer}>

          </div>
          <div className={locClasses.LabelListControlsContainer}>

          </div>
        </div>
      </fieldset>
    </div>
  )
}