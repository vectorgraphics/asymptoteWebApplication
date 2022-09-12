import { useDispatch } from "react-redux";
import { wsActionCreator } from "../../../../store/workspaces";
import { makeStyles, Fab } from "@material-ui/core";
import { GlobalControls } from "./GlobalControls.js";
import { WorkspaceBody } from "./WorkspaceBody";
import { LogoPane } from "./LogoPane";
import { createUID } from "../../../../utils/appTools";
import { Add as AddIcon } from "@material-ui/icons";


const useStyle = makeStyles((theme) => ({
  ctrlPanel: {
    display: "grid",
    gridTemplateRows: "2.5rem 3rem 1fr 15rem",
    alignContent: "stretch",
    minWidth: "18.5rem",
    maxWidth: "calc(18.5rem + 1px)",
    minHeight: "100%",
    transition: "min-width 0.25s linear, max-width 0.25s linear",
    backgroundColor: theme.palette.background.panel,
  },
  hideCtrlPanel: {
    display: "grid",
    gridTemplateRows: "2.5rem 3rem 1fr 15rem",
    minWidth: 0,
    maxWidth: 0,
    transition: "min-width 0.25s linear, max-width 0.25s linear",
  },
}));

export const ControlPanel = ({isCPExpanded=true, ...props}) => {
  const locClasses = useStyle(props);

  return (
    <div className={(isCPExpanded)? locClasses.ctrlPanel: locClasses.hideCtrlPanel}>
      <GlobalControls/>
      <WorkspaceHeader/>
      <WorkspaceBody/>
      <LogoPane/>
    </div>
  );
};

const intUseStyle = makeStyles((theme) => ({
  header: {
    position: "relative",
    gridRow: "2/3",
    display: "flex",
    flexFlow: "row nowrap",
    minHeight: "3rem",
    maxHeight: "3rem",
    minWidth: "18.5rem",
    maxWidth: "18.5rem",
    fontFamily: "Roboto",
    alignItems: "center",

    backgroundColor: theme.palette.background.headerType2,
    boxShadow: theme.shadows[2],
    textShadow: "-2px 2px 3px black",
  },
  addBtnCont: {
    position: "absolute",
    maxWidth: "2rem",
    maxHeight: "2rem",
    marginLeft: "0.25rem",
    boxShadow: "none",
    // border: "1px solid red",
  },
  fab: {
    minWidth: "2rem",
    maxWidth: "2rem",
    minHeight: "2rem",
    maxHeight: "2rem",
    boxShadow: "none",
    color: theme.palette.icon.add,
    backgroundColor: "transparent",
    "&:hover": {
      color: theme.palette.icon.addHover,
      backgroundColor: "transparent",
    },
    // border: "1px solid blue",
  },
  title: {
    flex: "1 1 auto",
    minWidth: "18.5rem",
    maxWidth: "18.5rem",
    fontSize: "1.5rem",
    fontWeight: "800",
    color: theme.palette.text.commonLight,
    textAlign: "center",
    // border: "1px solid green",
  }
}));


export function WorkspaceHeader(props) {
  const locClasses = intUseStyle();
  const dispatch = useDispatch();

  return (
    <div className={locClasses.header}>
      <div className={locClasses.addBtnCont}>
        <Fab classes={{root: locClasses.fab}} size="small" disableFocusRipple={true}>
          <AddIcon onClick={() => dispatch(wsActionCreator.add(createUID("ws-")))}/>
        </Fab>
      </div>
      <div className={locClasses.title}> Workspaces </div>
    </div>
  );
}

