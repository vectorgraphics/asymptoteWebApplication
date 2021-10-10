import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Tooltip } from "@material-ui/core";
import { useSelector } from "react-redux";
import { idSelector } from "../../../../store/selectors";
import {checkedoutWorkspaceId} from "../../../../store/workspaces";

const useStyle = makeStyles((theme) => ({
  tabCont: {
    display: "flex",
    flexFlow: "column nowrap",
    gridRow: "1/2",
    justifyContent: "center",
    backgroundColor: theme.palette.background.SideBarTabs,
  },
  tab: {
    display: "flex",
    flexFlow: "column nowrap",
    minHeight: "6rem",
    maxHeight: "6rem",
    justifyContent: "center",
    color: "white",
    cursor: "default",
    border: "none",
    borderBottom: "1px solid black",
  },
  button: {
    display: "block",
    height: "6rem",
    padding: 0,
    margin: 0,
    color: "white",
    outline: "none",
    border: "none",
    cursor: "pointer",
    backgroundColor: "inherit",
    "&:hover": {
      backgroundColor: theme.palette.background.SideBarTabsHover,
    }
  },
  lowerTab: {
    display: "flex",
    flexFlow: "column nowrap",
    minHeight: "6rem",
    maxHeight: "6rem",
    cursor: "default",
    border: "none",
    backgroundColor: theme.palette.background.SideBar,
  },
  text: {
    display: "block",
    margin: "0 auto",
    padding: "0.125rem 0",
    fontSize: "1rem",
    textAlign: "center",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    writingMode: "vertical-lr",
    transform: "rotate(180deg)",
  },
}))

export function Tabs(props) {
  const locClasses = useStyle();
  const theme = useTheme();
  let isCPExpanded = props.isCPExpanded;
  const setCPExpand = props.setCPExpand;
  const id = useSelector(idSelector);
  const wsName = useSelector((store) => store.workspaces.entities[id].name);

  return (
    <div className={locClasses.tabCont}>
      <div className={locClasses.tab}>
        <button className={locClasses.button} onClick={(event) => setCPExpand(!isCPExpanded)}>
          {
            (isCPExpanded)
              ? <div className={locClasses.text} style={{color: "white"}}> {"Collapse"} </div>
              : <div className={locClasses.text} style={{color: theme.palette.text.SideBarTabsActivated}}> {"Expand"} </div>
          }
        </button>
      </div>
      {(!isCPExpanded)
        ? <div className={locClasses.tab}>
            <Tooltip title={wsName} placement="right">
             <div className={locClasses.text}> {wsName} </div>
            </Tooltip>
          </div>
        : <div className={locClasses.lowerTab}/>
      }
    </div>
  );
}
