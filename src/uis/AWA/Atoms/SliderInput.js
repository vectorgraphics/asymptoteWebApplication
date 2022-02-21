import { useState } from 'react';
import { makeStyles, Grid, Typography, Slider, Input } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: (styleObj) => styleObj.width || "8rem",
    marginTop: "0.5rem",
  },
  slider: {
    color: "dimgrey",
  },
  input: {
    width: (styleObj) => styleObj.inputWwidth || "3rem",
  },
  underline: {
    "&::before": {
      marginTop: "-1rem",
      border: "none",
    },
  },
  Root: {
    fontSize: "0.875rem",
  }
});

export function SliderInput({defaultValue=1, styleObj={}, onSliderChange=() => {}, ...props}) {
  const locClasses = useStyles(styleObj);
  const [value, setValue] = useState(defaultValue);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    onSliderChange(newValue);
  };

  const handleInputChange = (event) => {
    setValue((event.target.value === "") ? "" : Number(event.target.value));
    onSliderChange(Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 1) {
      setValue(1);
    }
  };

  return (
    <div className={props.className}>
      <div className={locClasses.root}>
        <Typography variant="caption"> Relative Position </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Slider
              classes={{root: locClasses.slider}} value={typeof value === 'number' ? value : 0}
              min={0} max={1} step={0.05}
              onChange={handleSliderChange}
            />
          </Grid>
          <Grid item>
            <Input
              classes={{root: locClasses.Root, underline: locClasses.underline, input: locClasses.input}}
              className={locClasses.input} value={value} margin="dense" disableUnderline={true}
              inputProps={{step: 0.05, min: 0, max: 1, type: 'number'}}
              onChange={handleInputChange} onBlur={handleBlur}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}