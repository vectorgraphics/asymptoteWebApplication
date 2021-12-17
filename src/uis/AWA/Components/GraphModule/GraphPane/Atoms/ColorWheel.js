import { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ClickAwayListener, TextField } from '@material-ui/core';
import { ChromePicker } from "react-color";

const useStyle = makeStyles((theme) => ({
  textField: {
    minWidth: (styleObj) => styleObj.textFieldWidth,
  },
}))

export function ColorWheel({isOpen=false, startColor="#FFFFFF", clickAway=() => {}, textFieldWidth="11.25rem", ...props}) {
  const locClasses = useStyle({textFieldWidth: textFieldWidth});
  const [open, setOpen] = useState(isOpen);
  const pickedColor = useRef("#FFFFFF");
  const colorWheelValue = useRef("#FFFFFF");

  function handleChangeColor(color, event) {
    switch (color.source) {
      case "hex":
        pickedColor.current = `${color.hex}`;
        colorWheelValue.current = pickedColor.current;
        break;
      case "rgb":
        pickedColor.current = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
        colorWheelValue.current = pickedColor.current;
        break;
      case "hsl":
        pickedColor.current = `hsla(${twoDigitsRound(color.hsl.h)}, ${twoDigitsRound(color.hsl.s)}, ${color.hsl.l}, ${twoDigitsRound(color.hsl.a)})`;
        colorWheelValue.current = `hsl(${color.hsl.h}, ${color.hsl.s}, ${color.hsl.l})`;
        break;
      default:
        pickedColor.current = "#FFFFFF";
        colorWheelValue.current = pickedColor.current;
        break;
    }
  }
  const handleClickAway = () => {
    setOpen(false);
    clickAway(colorWheelValue.current);
  };
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      {
        (open)
          ? <ChromePicker width="12.5rem" color={startColor} onChange={handleChangeColor}/>
          : <TextField classes={{root: locClasses.textField}} size="small" label="picked color" value={pickedColor.current} onClick={() => setOpen(true)}/>
      }
    </ClickAwayListener>
  );
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%        Internal Functions
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function twoDigitsRound(number) {
  const timesHundred = number*100;
  return Math.floor(timesHundred)/100;
}

