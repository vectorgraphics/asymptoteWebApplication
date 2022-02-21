import { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ClickAwayListener, TextField } from '@material-ui/core';
import { ChromePicker } from "react-color";

const useStyle = makeStyles((theme) => ({
  textField: {
    marginTop: "-0.5rem",
    minWidth: (obj) => obj.width,
  },
  colorWheel: {
    position: "absolute",
    top: "-1rem",
    left: 0
  }
}))

export function ColorWheel({isOpen=false, width="12rem", label, startColor="", onPickColor=() => {}, ...props}) {
  const locClasses = useStyle({width: width});
  const [open, setOpen] = useState(isOpen);
  const pickedColor = useRef(startColor);
  const colorWheelValue = useRef(startColor);

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
        pickedColor.current = startColor;
        colorWheelValue.current = pickedColor.current;
        break;
    }
  }
  const handleClickAway = () => {
    setOpen(false);
    onPickColor(colorWheelValue.current);
  };
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      {
        (open)
          ? <div className={locClasses.colorWheel}>
              <ChromePicker width={width} color={startColor} onChange={handleChangeColor}/>
            </div>
          : <TextField
              classes={{root: locClasses.textField}} size="small" label={label}
              value={pickedColor.current} onClick={() => setOpen(true)}
            />
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

