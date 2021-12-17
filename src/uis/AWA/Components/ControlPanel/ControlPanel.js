import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { wsActionCreator } from "../../../../store/workspaces";
import { makeStyles } from "@material-ui/core/styles";
import { ControlMenu } from "./ControlMenu";
import { WorkspaceBody } from "./WorkspaceBody";
import { LogoPane } from "./LogoPane";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { createUID } from "../../../../utils/generalTools";


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
    position: "relative",
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
  fab: {
    position: "absolute",
    left: 0,
    top: "0.5rem",
    minWidth: "2rem",
    maxWidth: "2rem",
    minHeight: "2rem",
    maxHeight: "2rem",
    margin: "0 0.25rem",
    marginBottom: "0.2rem",
    verticalAlign: "middle",
    boxShadow: "none",
    color: "lightgray",
    backgroundColor: "transparent",
    "&:hover": {
      color: "lightgreen",
      backgroundColor: "transparent",
    }
  },
  logoPaneCont: {
    gridRow: "3/4",
    display: "block",
    backgroundColor: theme.palette.background.LogoPane,
  },
}));

export function ControlPanel({isCPExapnded=true, ...props}) {
  const locClasses = useStyle(props);
  const dispatch = useDispatch();

  return (
    <div className={(isCPExapnded)? locClasses.controlPanelShow: locClasses.controlPanelHide}>
      <div className={locClasses.controlMenuCont}>
        {(isCPExapnded)? <ControlMenu/>: null}
      </div>
      <div className={locClasses.workspaceCont}>
        <div className={locClasses.header}>
          {
            (isCPExapnded)
              ? <Fragment>
                  <Fab classes={{root: locClasses.fab}} size="small" disableFocusRipple={true}>
                    <AddIcon onClick={() => dispatch(wsActionCreator.add(createUID()))}/>
                  </Fab> Workspaces
                </Fragment>
              : null
          }
        </div>
        {(isCPExapnded)? <WorkspaceBody/>: null}
      </div>
      <div className={locClasses.logoPaneCont}>
        {(isCPExapnded)? <LogoPane/>: null}
      </div>
    </div>
  );
}
