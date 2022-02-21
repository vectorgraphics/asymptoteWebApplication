import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Tooltip } from "@material-ui/core";
import { useSelector } from "react-redux";
import { idSelector } from "../../../../store/selectors";

const useStyle = makeStyles((theme) => ({
  WsStateTabsCont: {
    display: "grid",
    gridAutoFlow: "row",
    minWidth: "2rem",
    maxWidth: "2rem",
    backgroundColor: theme.palette.background.SideBarTabs,
  },
  stateTab: {
    ...commonTabsStyle,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.background.SideBarTabsHover,
    },
    borderRight: "1px solid black",
  },
  wsNameTab: {
    ...commonTabsStyle,
    padding: "0.125rem 0",
    transition: "min-height 0.25s linear, max-height 0.25s linear",
    borderRight: "1px solid black",
  },
  hideWsNameTab: {
    ...commonTabsStyle,
    minHeight: 0,
    maxHeight: 0,
    borderBottom: "none",
    transition: "min-height 0.25s linear, max-height 0.25s linear, border-bottom 0.25s linear 0.22s",
  },
  tabsText: {
    fontSize: "1rem",
    textAlign: "center",
    textOverflow: "ellipsis",
    overflow: "hidden",
    writingMode: "vertical-lr",
    transform: "rotate(180deg)",
    // border: "1px solid white",
  },
}))

export function WsStateTabs({isCPExpanded=false, setCPExpandState=() => {}, ...props}) {
  const locClasses = useStyle();
  const theme = useTheme();

  const id = useSelector(idSelector);
  const wsName = useSelector((store) => store.workspaces.entities[id].name);

  return (
    <div className={locClasses.WsStateTabsCont}>
      <div
        className={locClasses.stateTab}
        onClick={(event) => setCPExpandState(!isCPExpanded)}>
          <p className={locClasses.tabsText} style={(isCPExpanded)? {}: {color: theme.palette.text.SideBarTabsClicked}}> {"Expand"} </p>
      </div>
      <div className={(isCPExpanded)? locClasses.hideWsNameTab: locClasses.wsNameTab}>
        <Tooltip title={wsName} placement="right">
          <span className={locClasses.tabsText}> {wsName} </span>
        </Tooltip>
      </div>
    </div>
  );
}


const commonTabsStyle = {
  display: "grid",
  minWidth: "2rem",
  minHeight: "6rem",
  maxHeight: "6rem",
  justifyContent: "center",
  justifyItems: "center",
  color: "white",
  border: "none",
  cursor: "default",
  borderBottom: "1px solid black",
}