import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Tooltip } from "@material-ui/core";
import { useSelector } from "react-redux";
import { idSelector, wsNameSelector } from "../../../../store/selectors";

const useStyle = makeStyles((theme) => ({
  WsStateTabsCont: {
    display: "grid",
    gridAutoFlow: "row",
    minWidth: "2rem",
    maxWidth: "2rem",
    backgroundColor: theme.palette.background.SideBarTabs,
  },
  commonTabsStyle: {
    display: "grid",
    "min-width": "2rem",
    "min-height": "6rem",
    "max-height": "6rem",
    "justify-content": "center",
    "justify-items": "center",
    color: theme.palette.text.awaSecondaryContrast,
    border: "none",
    cursor: "default",
    "border-bottom": "1px solid black",
  },
  stateTab: {
    extend: "commonTabsStyle",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.background.SideBarTabsHover,
    },
    borderRight: "1px solid black",
  },
  wsNameTab: {
    extend: "commonTabsStyle",
    padding: "0.125rem 0",
    transition: "min-height 0.25s linear, max-height 0.25s linear",
    borderRight: "1px solid black",
  },
  hideWsNameTab: {
    extend: "commonTabsStyle",
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
  const wsName = useSelector(wsNameSelector);

  return (
    <div className={locClasses.WsStateTabsCont}>
      <div
        className={locClasses.stateTab}
        onClick={(event) => setCPExpandState(!isCPExpanded)}>
          <p className={locClasses.tabsText} style={(isCPExpanded)? {}: {color: theme.palette.text.active}}>
            {(isCPExpanded)? "Collapse": "Expand"}
          </p>
      </div>
      <div className={(isCPExpanded)? locClasses.hideWsNameTab: locClasses.wsNameTab}>
        <Tooltip title={wsName} placement="right">
          <span className={locClasses.tabsText}> {wsName} </span>
        </Tooltip>
      </div>
    </div>
  );
}
