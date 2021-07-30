import { makeStyles } from "@material-ui/core/styles";
import { Controls } from "./Controls";
import { Tabs } from "./Tabs";

const useStyle = makeStyles((theme) => ({
  sidebar: {
    flex: "1 1 auto",
    display: "grid",
    height: "100%",
    gridTemplateRows: "12rem minmax(calc(100vh - 24rem), 1fr) 6rem 6rem",
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
