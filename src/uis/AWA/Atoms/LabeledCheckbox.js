import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Checkbox } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateRows: "2rem",
    gridTemplateColumns: "5rem 1rem 2rem",
    minHeight: "3rem",
    maxHeight: "3rem",
  },
  label: {
    gridRow: "1/2",
    gridColumn: "1/2",
    lineHeight: "2rem",
    textAlign: "center",
  },
  checkbox: {
    gridRow: "1/2",
    gridColumn: "3/4",
  }
}))

export const LabeledCheckbox = ({labelText="Legend", className={}, ...props}) => {
  const locClasses = useStyle();
  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className={className}>
      <div className={locClasses.container}>
        <div className={locClasses.label}> {`${labelText} :`} </div>
        <Checkbox
          {...props}
          className={locClasses.checkbox}
          checked={checked} color="primary"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
