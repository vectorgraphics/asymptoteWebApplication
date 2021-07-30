import Tooltip from "@material-ui/core/Tooltip";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  tab_container: {
    display: "flex",
    flexFlow: "column nowrap",
    gridRow: "1/2",
    justifyContent: "center",
    backgroundColor: theme.palette.common.SidBarTabs_Bg,
  },
  tab: {
    display: "flex",
    flexFlow: "column nowrap",
    height: "6rem",
    color: "white",
    cursor: "default",
    border: "1px solid black",
  },
  text: {
    display: "block",
    height: "6rem",
    margin: "0 auto",
    fontSize: "1rem",
    textAlign: "center",
    writingMode: "vertical-lr",
    transform: "rotate(180deg)",
    // border: "1px solid white",
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