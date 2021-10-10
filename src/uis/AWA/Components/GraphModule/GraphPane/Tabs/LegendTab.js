// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%   FunctionTab component
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { makeStyles } from "@material-ui/core";
import { LabeledCheckbox } from "../../../../Atoms/LabeledCheckbox";

const legendStyle = makeStyles((theme) => ({
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
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  legendCheckboxFieldSet: {
    gridRow: "2/3",
    borderRadius: "4px",
    border: "2px groove black",
  },
  legendCheckboxContainer: {
    display: "grid",
    gridTemplateRows: "0.5rem 1fr 1rem 1fr 1rem 1fr 0.5rem",
    padding: "0 0.5rem",
    // border: "1px solid black",
  },
  legendBox: {
    width: "8rem",
    gridRow: "5/6",
    "& label": {
      fontSize: "0.85rem",
    }
  },
  legendElementsFieldSet: {
    gridRow: "4/5",
    borderRadius: "4px",
    border: "2px groove black",
  },
  legendElementsContainer: {
    display: "grid",
    gridTemplateRows: "1rem 3rem",
    gridTemplateColumns: "0.5rem 1fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5rem",
  },
}))

export function LegendTab(props) {
  const locClasses = legendStyle(props);
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Legend States
  return (
    <div className={locClasses.container}>
      <fieldset className={locClasses.legendCheckboxFieldSet}>
        <legend className={locClasses.legend}> Main settings </legend>
        <div className={locClasses.legendCheckboxContainer}>
          <LabeledCheckbox className={locClasses.legendBox}/>
        </div>
      </fieldset>
      <fieldset className={locClasses.legendElementsFieldSet}>
        <legend className={locClasses.legend}> Legend </legend>
        <div className={locClasses.legendElementsContainer}>
        </div>
      </fieldset>
    </div>
  )
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Internal Components
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%