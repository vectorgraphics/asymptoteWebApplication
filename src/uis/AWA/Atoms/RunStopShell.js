import { useState } from "react";
import { makeStyles, Button, CircularProgress } from "@material-ui/core";
import { PlayArrow as RunIcon, Stop as StopIcon } from "@material-ui/icons";
import { merge } from "lodash";

const basicStyle = (theme) => ({
  root: {
    minWidth: "4rem",
    maxWidth: "4rem",
    minHeight: "1.5rem",
    maxHeight: "1.5rem",
    padding: "0",
    fontSize: "0.875rem",
    borderRadius: "1px",
    "& span": {
      position: "relative",
      display: "grid",
      // border: "1px solid green",
    },
  },
  runIcon: {
    placeSelf: "center",
    color: theme.palette.icon.run,
  },
  stopIcon: {
    placeSelf: "center",
    color: theme.palette.icon.stop,
  },
  progressIcon: {
    position: "absolute",
    placeSelf: "center",
    minWidth: "1.49rem",
    maxWidth: "1.49rem",
    minHeight: "1.49rem",
    maxHeight: "1.49rem",
    color: "blue",
    // border: "1px solid black",
  }
});

const useStyle = makeStyles((theme) => ({
  root: (finalStyle) => merge(basicStyle(theme), finalStyle).root,
  runIcon: (finalStyle) => merge(basicStyle(theme), finalStyle).runIcon,
  stopIcon: (finalStyle) => merge(basicStyle(theme), finalStyle).stopIcon,
  progressIcon: (finalStyle) => merge(basicStyle(theme), finalStyle).progressIcon,
}));

let controller = "";

export const RunStopShell = ({
  finalStyle={}, className="", variant="contained", disabled=false, onRun=()=>{}, onStop=()=>{}, ...props
}) => {
  const locClasses = useStyle(finalStyle);
  const [runStatus, setRunStatus] = useState(true);

  if (runStatus) {
    return (
      <Button
        className={className} classes={{root: locClasses.root}} variant={variant} disabled={disabled}  {...props}
        onClick={(event) => {
            controller = new AbortController();
            onRun(event, setRunStatus, controller);
        }}
      >
        <RunIcon className={locClasses.runIcon} style={(disabled)? {color: "grey"}: {}}/>
      </Button>
    );
  } else {
    return (
      <Button
        className={className} classes={{root: locClasses.root}} variant={variant} disabled={disabled}  {...props}
        onClick={(event) => {
            controller.abort();
            onStop(event, setRunStatus, controller);
        }}
      >
        <>
          <StopIcon className={locClasses.stopIcon}/>
          <CircularProgress className={locClasses.progressIcon}/>
        </>
      </Button>
    );
  }
};
