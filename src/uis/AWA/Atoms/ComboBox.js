import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
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
    }
  },
  paper: {
    fontSize: "0.85rem",
  },
  inputRoot: {
    padding: "6px",
  },
  clearIndicator: {
    display: "none",
  }
}))

export function ComboBox({label="Combo Box", className={}, dataArray=[], property="name", ...props}) {
  const locClasses = useStyle(props);
  return (
    <div className={className}>
      <Autocomplete
        {...props}
        className={locClasses.autoComplete}
        classes={{paper: locClasses.paper, clearIndicator: locClasses.clearIndicator}}
        size="small" options={dataArray}
        getOptionLabel={(option) => option[property]}
        getOptionSelected={(option, value) => option[property] === value[property]}
        renderInput={(params) => <TextField {...params} label={label} variant="outlined"/>}
      />
    </div>
  );
}
