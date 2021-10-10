import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ControlPanel } from "../ControlPanel/ControlPanel";
import { ModulePanel } from "../ModulePanel/ModulePanel";
import { SideBar } from "../SideBar/SideBar";

const useStyle = makeStyles({
  awaPlatform: {
    display: "flex",
    flexFlow: "row nowrap",
    minWidth: "64rem",
    minHeight: "50rem",
    height: "100vh",
    justifyContent: "center",
    alignContent: "stretch",
    overflow: "hidden",
  },
})

export function AWAPlatform(props) {
  const locClasses = useStyle(props);
  const [isCPExpanded, setCPExpand] = useState(true);

  return (
    <div className={locClasses.awaPlatform} >
      <SideBar isCPExapnded={isCPExpanded} setCPExpand={setCPExpand}/>
      <ControlPanel isCPExapnded={isCPExpanded}/>
      <ModulePanel/>
    </div>
  );
}
