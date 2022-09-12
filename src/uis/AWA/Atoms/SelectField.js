import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  inputLabel: {
    fontSize: (props) => (props.cssStyle.fontSize || "0.85rem"),
  },
  menuItem: {
    fontSize: (props) => (props.cssStyle.fontSize || "0.85rem"),
  },
  select: {
    minWidth: (props) => (props.cssStyle.minWidth || "7rem"),
    fontSize: (props) => (props.cssStyle.fontSize || "0.85rem"),
  }
}))

export const SelectField = ({label = "label", stateVar, onUpdate=()=>{}, elements=[], ...props}) => {
  if (props.cssStyle === undefined) {
    props.cssStyle = {};
  }
  const locClasses = useStyle(props);
  const handleChange = (event) => {
    onUpdate(event.target.value);
  };

  return (
    <FormControl>
      <InputLabel className={locClasses.inputLabel}>{label}</InputLabel>
      <Select classes={{root: locClasses.select}} value={stateVar} onChange={handleChange}>
        {elements.map((element) => <MenuItem classes={{root: locClasses.menuItem}} value={element.value}>{element.text}</MenuItem>)}
      </Select>
    </FormControl>
  );
};





