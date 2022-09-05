import { idSelector, cmInputSelector } from "../../../../../store/selectors.js";
import { cmActionCreator } from "../../../../../store/codeModule.js";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import { cmOutFormatSelector } from "../../../../../store/selectors.js";


const useStyle = makeStyles((theme) => ({
  radioGroup: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyItems: "flex-end",
    marginRight: "1rem",
  },
  formLabel: {
    flex: "0 0 auto",
    marginLeft: "0.5rem",
    color: theme.palette.text.primary,
  },
  radioCircle: {
    color: theme.palette.outline.radioCircle,
  }
}));


export function OutFormats(props) {
  const locClasses = useStyle();
  const id = useSelector(idSelector)
  const outFormat = useSelector(cmOutFormatSelector);
  const dispatch = useDispatch();

  return (
    <RadioGroup
      className={locClasses.radioGroup}
      name="outFormats" value={outFormat}
      onChange={(event) => dispatch(cmActionCreator.setOutFormat(id, event.target.value))}
    >
      <FormControlLabel classes={{label: locClasses.formLabel}}
        label="preview" labelPlacement="start" value="prev" control={<Radio classes={{root: locClasses.radioCircle}}/>}
      />
      <FormControlLabel classes={{label: locClasses.formLabel}}
        label="html" labelPlacement="start" value="html" control={<Radio classes={{root: locClasses.radioCircle}}/>}
      />
      <FormControlLabel classes={{label: locClasses.formLabel}}
        label="v3d" labelPlacement="start" value="v3d" control={<Radio classes={{root: locClasses.radioCircle}}/>}
      />
      <FormControlLabel classes={{label: locClasses.formLabel}}
        label="svg" labelPlacement="start" value="svg" control={<Radio classes={{root: locClasses.radioCircle}}/>}
      />
      <FormControlLabel classes={{label: locClasses.formLabel}}
        label="pdf" labelPlacement="start" value="pdf" control={<Radio classes={{root: locClasses.radioCircle}}/>}
      />
      <FormControlLabel classes={{label: locClasses.formLabel}}
        value="eps" label="eps" labelPlacement="start" control={<Radio classes={{root: locClasses.radioCircle}}/>}
      />
      <FormControlLabel classes={{label: locClasses.formLabel}}
        value="png" label="png" labelPlacement="start" control={<Radio classes={{root: locClasses.radioCircle}}/>}
      />
    </RadioGroup>
  );
}
