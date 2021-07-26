import Tooltip from "@material-ui/core/Tooltip";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  tab_container: {
    display: "flex",
    flexFlow: "column nowrap",
    alignContent: "center",
    backgroundColor: theme.palette.common.SidBarTabs_Bg,
  },
  tab: {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    height: "6rem",
    fontSize: "1rem",
    color: "white",
    border: "1px solid black",
  },
  text: {
    display: "block",
    fontSize: "1rem",
    lineHeight: "2.1rem",
    writingMode: "vertical-lr",
    transform: "rotate(180deg)",
    // border: "1px solid black",
  },
}))

const isCollapsed = false;

export function Tabs(props) {
  const classes = useStyle();
  return (
    <div className={classes.tab_container}>
      <div className={classes.tab}>
        <div className={classes.text}> {(isCollapsed)? "expand": "collapse"} </div>
      </div>
      <div className={classes.tab}>
      <Tooltip title="LongWorkspaceName" placement="right">
        <div className={classes.text}> {checkLength("LongWorkspaceName")} </div>
      </Tooltip>
      </div>
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