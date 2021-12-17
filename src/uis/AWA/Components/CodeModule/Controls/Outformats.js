import { idSelector, cmInputSelector } from "../../../../../store/selectors";
import { cmActionCreator } from "../../../../../store/workspaces";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { RadioGroup, Radio, FormControlLabel } from '@material-ui/core';


const useStyle = makeStyles((theme) => ({
  radioGroup: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyItems: "flex-end",
    marginRight: "1rem",
    minHeight: "2.5rem",
    maxHeight: "2.5rem",
  },
  formLabel: {
    flex: "0 0 auto",
    color: "whitesmoke",
  },
  leadingRadio: {
    color: "white",
    marginRight: "2rem",
  },
  radio: {
    color: "white",
  }
}));


export function Outformats(props) {
  const colorSelected = useTheme().palette.radioAndCheckbox.selected;
  const locClasses = useStyle();
  const id = useSelector(idSelector)
  const outformat = useSelector(cmInputSelector).outformat;
  const dispatch = useDispatch();

  return (
    <RadioGroup
      className={locClasses.radioGroup}
      name="outformats" value={outformat}
      onChange={(event) => dispatch(cmActionCreator.setOutFormat(id, event.target.value))}
    >
      <FormControlLabel classes={{label: locClasses.formLabel}}
        value="prev"
        control={<Radio classes={{root: locClasses.leadingRadio}} color={colorSelected}/>}
        label="preview"
        labelPlacement="start"
      />
      <FormControlLabel classes={{label: locClasses.formLabel}}
        value="html"
        control={<Radio classes={{root: locClasses.radio}} color={colorSelected}/>}
        label="html"
        labelPlacement="start"
      />
      <FormControlLabel classes={{label: locClasses.formLabel}}
        value="svg"
        control={<Radio classes={{root: locClasses.radio}} color={colorSelected}/>}
        label="svg"
        labelPlacement="start"
      />
      <FormControlLabel classes={{label: locClasses.formLabel}}
        value="pdf"
        control={<Radio classes={{root: locClasses.radio}} color={colorSelected}/>}
        label="pdf"
        labelPlacement="start"
      />
      <FormControlLabel classes={{label: locClasses.formLabel}}
        value="eps"
        control={<Radio classes={{root: locClasses.radio}} color={colorSelected}/>}
        label="eps"
        labelPlacement="start"
      />
      <FormControlLabel classes={{label: locClasses.formLabel}}
        value="png"
        control={<Radio classes={{root: locClasses.radio}} color={colorSelected}/>}
        label="png"
        labelPlacement="start"
      />
    </RadioGroup>
  );
}
