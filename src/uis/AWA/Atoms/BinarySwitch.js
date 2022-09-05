import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Switch } from '@material-ui/core';
import { merge } from "lodash";

const basicStyle = (theme) => ({
  switchCont: {
    display: "flex",
    flexFlow: "row nowrap",
    margin: "2rem",
    alignItems: "center",
    alignContent: "center",
    // border: "1px solid green",
  },
  switchRoot: {
    width: "3.5rem",
    height: 26,
    padding: 0,
    // border: '1px solid blue',
  },
  switchBase: {
    padding: 1,
    '&$switchChecked': {
      transform: 'translateX(30px)',
      color: "red",
      '& + $switchTrack': {
        backgroundColor: "grey",
        opacity: 1,
        border: `1px solid black`,
      },
    },
    // '&$focusVisible $thumb': {
    //   color: theme.palette.background.ModulePanel,
    //   border: '6px solid #fff',
    // },
  },
  switchThumb: {
    width: 24,
    height: 24,
  },
  switchTrack: {
    opacity: 1,
    backgroundColor: "grey",
    border: "1px solid black",
    borderRadius: 26 / 2,
    transition: theme.transitions.create(['background-color']),
  },
  switchChecked: {},
  switchLabels: {
    flex: "1 1 auto",
    height: "26px",
    textAlign: "center",
    color: theme.palette.text.awaPrimaryContrast,
  },
});

const useStyle = makeStyles((theme) => ({
  switchCont:    (finalStyle) => merge(basicStyle(theme), finalStyle).switchCont,
  switchRoot:    (finalStyle) => merge(basicStyle(theme), finalStyle).switchRoot,
  switchBase:    (finalStyle) => merge(basicStyle(theme), finalStyle).switchBase,
  switchThumb:   (finalStyle) => merge(basicStyle(theme), finalStyle).switchThumb,
  switchTrack:   (finalStyle) => merge(basicStyle(theme), finalStyle).switchTrack,
  switchChecked: (finalStyle) => merge(basicStyle(theme), finalStyle).switchChecked,
  switchLabels:  (finalStyle) => merge(basicStyle(theme), finalStyle).switchLabels,
}));


export function BinarySwitch({finalStyle={}, Labels=["left", "right"], switchInitialValue="right", onChange=()=>{}, ...props}) {
  const locClasses = useStyle(finalStyle)
  const [state, setState] = useState(() => {
    return !!Labels.indexOf(switchInitialValue);
  });

  return (
    <div className={locClasses.switchCont}>
      <p className={locClasses.switchLabels}> {Labels[0]} </p>
        <Switch
          // focusVisibleClassName={locClasses.focusVisible} disableRipple
          classes={{
            root: locClasses.switchRoot,
            switchBase: locClasses.switchBase,
            thumb: locClasses.switchThumb,
            track: locClasses.switchTrack,
            checked: locClasses.switchChecked,
          }}
          name="Binary-Switch"
          checked={state}
          onChange={(event) => {
            setState(!state);
            onChange(!state);
          }}
        />
      <p className={locClasses.switchLabels}> {Labels[1]} </p>
    </div>
  );
}
