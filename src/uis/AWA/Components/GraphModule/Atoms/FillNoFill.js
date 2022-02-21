import {makeStyles} from "@material-ui/core/styles";
import {FormControlLabel, Radio, RadioGroup, useTheme} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  radioGroup: {
    marginLeft: "-0.25rem",
    minHeight: "2.5rem",
    maxHeight: "2.5rem",
  },
  radio: {
    color: "darkgray",
  },
  formRadioLabel: {
    color: "grey",
  },
}));

export function FillNoFill({className="", name="", labels=["fill", "nofill"], values=["Fill", "NoFill"], radioValue="", onSelect=() => {}, ...props}) {
  const locClasses = useStyle();

  return (
    <div className={className}>
      <RadioGroup
        className={locClasses.radioGroup} row name={name} value={radioValue}
        onChange={(event) => onSelect(event.target.value)}
      >
        <FormControlLabel
          classes={{label: locClasses.formRadioLabel}}
          label={labels[0]} labelPlacement="start" value={values[0]} control={<Radio/>}
        />
        <FormControlLabel
          classes={{label: locClasses.formRadioLabel}}
          label={labels[1]} labelPlacement="start" value={values[1]} control={<Radio/>}
        />
      </RadioGroup>
    </div>
  );
}

