import { makeStyles } from "@material-ui/core/styles";
import { ControlMenu } from "./ControlMenu";
import { Workspace } from "./Workspace";

const useStyle = makeStyles((theme) => ({
  controlPanel: {
    display: "grid",
    backgroundColor: theme.palette.common.ControlPanel_Bg,
    gridTemplateRows: "2.5rem 2rem minmax(500px, 1fr) 15rem",
    flex: "1 1 auto",
    height: "100%",
  },
  controlMenu: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-around",
    alignItems: "center",
    gridRow: "1/2",
  },
  workspacePane: {
    display: "block",
    gridRow: "2/4",
    // backgroundColor: "red",
  },
  logoPane: {
    display: "block",
    gridRow: "4/5",
  },
  iframe: {
    display: "block",
    width: "100%",
  },
  versionBox: {
    display: "block",
    marginBottom: "2rem",
    fontSize: "1rem",
    fontWeight: "medium",
    color: "rgb(200, 200, 200)",
    // animationName: "fadeInVersion",
    // animationIterationCount: 1,
    // webkitAnimationTimingFunction: "ease-in",
    // animationDuration: "1s",
  }
}))

export function ControlPanel(props) {
  const classes = useStyle(props)
  return (
    <div className={classes.controlPanel}>
      <div className={classes.controlMenu}> <ControlMenu/> </div>
      <div className={classes.workspacePane}> <Workspace/> </div>
      <div className={classes.logoPane}>
        {/*<iframe className={classes.iframe} id="logo" title="logoFrame" src="./logo3d.html" frameBorder="0"></iframe>*/}
        {/*<div className={classes.versionBox}> {"placeholder"} </div>*/}
      </div>
    </div>
  );
}
