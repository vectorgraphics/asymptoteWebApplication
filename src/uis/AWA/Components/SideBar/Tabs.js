import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Tooltip } from "@material-ui/core";


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
    fontSize: "1rem",
    textAlign: "center",
    writingMode: "vertical-lr",
    transform: "rotate(180deg)",
  },
}))


export function Tabs(props) {
  let isCPExpanded = props.isCPExpanded;
  const setCPExpand = props.setCPExpand;
  const theme = useTheme();
  const classes = useStyle();

  return (
    <div className={classes.tabCont}>
      <div className={classes.tab}>
        <button className={classes.button} onClick={event => setCPExpand(!isCPExpanded)}>
          {
            (isCPExpanded)
              ? <div className={classes.text} style={{color: "white"}}> {"collapse"} </div>
              : <div className={classes.text} style={{color: theme.palette.text.SideBarTabsActivated}}> {"expand"} </div>
          }
        </button>
      </div>
      {(!isCPExpanded)
        ?
        <div className={classes.tab}>
        <Tooltip title="LongWorkspaceName" placement="right">
          <div className={classes.text}> {checkLength("LongWorkspaceName")} </div>
        </Tooltip>
        </div>
        :
        <div className={classes.lowerTab}></div>
      }
    </div>
  );
}
function checkLength(arg) {
  const length = arg.length;
  if (length > 9) {
    return (arg.substr(0, 7)+ " ...");
  }
  return arg;
}