import { makeStyles, useTheme } from "@material-ui/core/styles";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const useStyle = makeStyles((theme) => ({
  radioGroup: {
    flexWrap: "nowrap",
    marginRight: "1rem",
    minHeight: "2.5rem",
    maxHeight: "2.5rem",
  },
  formLabel: {
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
  const colorSelected = useTheme().palette.radioAndCheckbox.selected
  const classes = useStyle();
  return (
    <RadioGroup className={classes.radioGroup} row name="outformats" defaultValue="prev">
      <FormControlLabel classes={{label: classes.formLabel}}
        value="prev"
        control={<Radio classes={{root: classes.leadingRadio}} color={colorSelected} />}
        label="preview"
        labelPlacement="start"
      />
      <FormControlLabel classes={{label: classes.formLabel}}
        value="html"
        control={<Radio classes={{root: classes.radio}} color={colorSelected} />}
        label="html"
        labelPlacement="start"
      />
      <FormControlLabel classes={{label: classes.formLabel}}
        value="svg"
        control={<Radio classes={{root: classes.radio}} color={colorSelected} />}
        label="svg"
        labelPlacement="start"
      />
      <FormControlLabel classes={{label: classes.formLabel}}
        value="pdf"
        control={<Radio classes={{root: classes.radio}} color={colorSelected} />}
        label="pdf"
        labelPlacement="start"
      />
      <FormControlLabel classes={{label: classes.formLabel}}
        value="eps"
        control={<Radio classes={{root: classes.radio}} color={colorSelected} />}
        label="eps"
        labelPlacement="start"
      />
      <FormControlLabel classes={{label: classes.formLabel}}
        value="png"
        control={<Radio classes={{root: classes.radio}} color={colorSelected} />}
        label="png"
        labelPlacement="start"
      />
    </RadioGroup>
  );
}
