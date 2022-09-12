import { useRef } from "react";
import { makeStyles, TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyle = makeStyles((theme) => ({
  autoComplete: {
    width: (props) => (props.width || "12rem"),
    "& div": {
      fontSize: "0.85rem",
    },
    "& div > label": {
      fontSize: "0.85rem",
    },
    "& div > div": {
      paddingRight: "6px !important",
    },
    "& div > input": {
      maxWidth: "65%"
    }
  },
  paper: {
    fontSize: "0.85rem",
  },
  clearIndicator: {
    display: "none",
  }
}))

export const ComboBox = ({label="Combo Box", className={}, dataArray=[], property="name", ...props}) => {
  const locClasses = useStyle(props);
  const inputRef = useRef(null);

  return (
    <div className={className}>
      <Autocomplete
        {...props}
        className={locClasses.autoComplete}
        classes={{paper: locClasses.paper, clearIndicator: locClasses.clearIndicator}}
        size="small" options={dataArray}
        getOptionLabel={(option) => option[property]}
        getOptionSelected={(option, value) => option[property] === value[property]}
        renderInput={(params) => <TextField inputRef={inputRef} {...params} label={label} variant="outlined"/>}
      />
    </div>
  );
};
