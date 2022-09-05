import { Fragment, useState } from "react";
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

export function RunStopShell({finalStyle={}, className="", variant="contained", onRun=() => {}, onStop=() => {}, ...props}) {
  const locClasses = useStyle(finalStyle);
  const [runStatus, setRunStatus] = useState(true);
  return (
    <Button
      className={className}
      classes={{root: locClasses.root}} variant={variant} {...props}
      onClick={(event) => {
        if (runStatus) {
          controller = new AbortController();
          setRunStatus(false);
          onRun(event, setRunStatus, controller);
        } else {
          controller.abort();
          setRunStatus(true);
          onStop(event, setRunStatus, controller);
        }
      }}
    >
      {
        (runStatus)?
          <RunIcon className={locClasses.runIcon}/>:
          <Fragment>
            <StopIcon className={locClasses.stopIcon}/>
            <CircularProgress className={locClasses.progressIcon}/>
          </Fragment>
      }
    </Button>
  );
}
