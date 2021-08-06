import { makeStyles } from "@material-ui/core/styles";
import { Controls } from "./Controls";
import { Tabs } from "./Tabs";

const useStyle = makeStyles((theme) => ({
  sideBar: {
    display: "grid",
    gridTemplateRows: "12rem minmax(calc(100vh - 24rem), 1fr) 6rem 6rem",
    flex: "1 1 auto",
    minWidth: "2rem",
    maxWidth: "2rem",
    height: "100%",
    fontWeight: "300",
    backgroundColor: theme.palette.background.SideBar,
    borderRight: "1px solid black",
  },
}));

export function SideBar(props) {
  const isCPExpanded = props.isCPExapnded;
  const setCPExpand = props.setCPExpand;
  const classes = useStyle(props);

  return (
    <div className={classes.sideBar}>
        <Tabs isCPExpanded={isCPExpanded} setCPExpand={setCPExpand}/>
        <Controls />
    </div>
  );
}
