import { idSelector, cmInputSelector } from "../../../../../store/selectors";
import { cmActionCreator } from "../../../../../store/codeModule";
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
    color: theme.palette.text.RadioBtn,
  },
  leadingRadio: {
    marginRight: "2rem",
  },
}));


export function OutFormats(props) {
  const locClasses = useStyle();
  const id = useSelector(idSelector)
  const outFormat = useSelector(cmInputSelector).outFormat;
  const dispatch = useDispatch();

  return (
    <RadioGroup
      className={locClasses.radioGroup}
      name="outFormats" value={outFormat}
      onChange={(event) => dispatch(cmActionCreator.setOutFormat(id, event.target.value))}
    >
      <FormControlLabel classes={{label: locClasses.formLabel}}
        label="preview" labelPlacement="start" value="prev" control={<Radio/>}
      />
      <FormControlLabel classes={{label: locClasses.formLabel}}
        label="html" labelPlacement="start" value="html" control={<Radio/>}
      />
      <FormControlLabel classes={{label: locClasses.formLabel}}
        label="v3d" labelPlacement="start" value="v3d" control={<Radio/>}
      />
      <FormControlLabel classes={{label: locClasses.formLabel}}
        label="svg" labelPlacement="start" value="svg" control={<Radio/>}
      />
      <FormControlLabel classes={{label: locClasses.formLabel}}
        label="pdf" labelPlacement="start" value="pdf" control={<Radio/>}
      />
      <FormControlLabel classes={{label: locClasses.formLabel}}
        value="eps" label="eps" labelPlacement="start" control={<Radio/>}
      />
      <FormControlLabel classes={{label: locClasses.formLabel}}
        value="png" label="png" labelPlacement="start" control={<Radio/>}
      />
    </RadioGroup>
  );
}
