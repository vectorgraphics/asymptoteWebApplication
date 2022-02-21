import { makeStyles } from "@material-ui/core/styles";
import { Controls } from "./Controls";
import { WsStateTabs } from "./wsStateTabs";

const useStyle = makeStyles((theme) => ({
  sideBar: {
    flex: "1 1 auto",
    display: "grid",
    gridAutoFlow: "row",
    justifyContent: "center",
    alignContent: "space-between",
    alignItems: "center",
    minWidth: "2rem",
    maxWidth: "2rem",
    fontWeight: "300",
    backgroundColor: theme.palette.background.SideBar,
    borderRight: "1px solid black",
    zIndex: 1000,
  },
}));

export function SideBar({isCPExpanded=false, setCPExpandState=()=>{}, ...props}) {
  const locClasses = useStyle(props);

  return (
    <div className={locClasses.sideBar}>
      <WsStateTabs isCPExpanded={isCPExpanded} setCPExpandState={setCPExpandState}/>
      <Controls/>
    </div>
  );
}
