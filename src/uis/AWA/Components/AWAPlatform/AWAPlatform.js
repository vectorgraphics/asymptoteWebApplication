import { useState } from "react";
import { useDispatch } from "react-redux";
import { glActionCreator } from "../../../../store/globals";
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

export function AWAPlatform({UCID=0, asyVersion="unknown", ...props}) {
  const locClasses = useStyle(props);
  const [isCPExpanded, setCPExpand] = useState(true);
  const dispatch = useDispatch();
  dispatch(glActionCreator.setClientId(UCID));
  dispatch(glActionCreator.setAsyVersion(asyVersion));

  return (
    <div className={locClasses.awaPlatform} >
      <SideBar isCPExapnded={isCPExpanded} setCPExpand={setCPExpand}/>
      <ControlPanel isCPExapnded={isCPExpanded}/>
      <ModulePanel/>
    </div>
  );
}
