import { makeStyles } from "@material-ui/core/styles";
import { ControlMenu } from "./ControlMenu";
import { Workspace } from "./Workspace";
import { LogoPane } from "./LogoPane";

const useStyle = makeStyles((theme) => ({
  controlPanelShow: {
    display: "grid",
    flex: "1 0 auto",
    gridTemplateRows: "2.5rem minmax(500px, 1fr) 15rem",
    minWidth: "248px",
    maxWidth: "300px",
    height: "100%",
    borderRight: "1px solid black",
    transition: "min-width 0.1s linear, max-width 0.1s linear",
  },
  controlPanelHide: {
    display: "grid",
    flex: "1 1 auto",
    gridTemplateRows: "2.5rem minmax(500px, 1fr) 15rem",
    minWidth: 0,
    maxWidth: 0,
    height: "100%",
    transition: "min-width 0.1s linear, max-width 0.1s linear",
  },
  controlMenuCont: {
    gridRow: "1/2",
    display: "flex",
    maxWidth: "100%",
    flexFlow: "row nowrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: theme.palette.background.ControlPanel,
  },
  workspaceCont: {
    gridRow: "2/3",
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch",
    backgroundColor: theme.palette.background.WorkspaceCont,
  },
  header: {
    display: "block",
    flex: "1 1 auto",
    lineHeight: "3rem",
    textAlign: "center",
    minHeight: "3rem",
    maxHeight: "3rem",
    color: "white",
    fontSize: "1.5rem",
    fontWeight: "800",
    backgroundColor: theme.palette.background.Header1,
    boxShadow: theme.shadows[2],
    textShadow: "-2px 2px 3px black",
  },
  body: {
    paddingTop: "0.75rem",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "0.5rem",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.5)",
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.5)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "darkgrey",
      outline: "1px solid slategrey",
    },
  },
  logoPaneCont: {
    gridRow: "3/4",
    display: "block",
    backgroundColor: theme.palette.background.LogoPane,
  },
}));

export function ControlPanel(props) {
  const classes = useStyle(props);
  return (
    <div className={(props.isCPExapnded)? classes.controlPanelShow: classes.controlPanelHide}>
      <div className={classes.controlMenuCont}>
        {(props.isCPExapnded)? <ControlMenu/>: null}
      </div>
      <div className={classes.workspaceCont}>
        <div className={classes.header}> Workspaces </div>
        <div className={classes.body}>
          {(props.isCPExapnded)? <Workspace/>: null}
        </div>
      </div>
      <div className={classes.logoPaneCont}>
        {/*{(props.isCPExapnded)? <LogoPane/>: null}*/}
      </div>
    </div>
  );
}
