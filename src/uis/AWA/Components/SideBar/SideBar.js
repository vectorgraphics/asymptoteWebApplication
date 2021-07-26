import { makeStyles } from "@material-ui/core/styles";
import { Controls } from "./Controls";
import { Tabs } from "./Tabs";

const useStyle = makeStyles((theme) => ({
  sidebar: {
    display: "flex",
    flexFlow: "column nowrap",
    minHeight: "800px",
    height: "100vh",
    justifyContent: "space-between",
    fontFamily: theme.typography.fontFamily,
    fontWeight: "300",
    backgroundColor: theme.palette.common.SidBar_Bg,
  },
}))

export function SideBar(props) {
  const classes = useStyle(props);
  return (
    <div className={classes.sidebar}>
        <Tabs />
        <Controls />
    </div>
  );
}
