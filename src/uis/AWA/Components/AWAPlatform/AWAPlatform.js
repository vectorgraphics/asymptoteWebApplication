import { useState } from "react";
import { useDispatch } from "react-redux";
import { glActionCreator } from "../../../../store/globals";
import { makeStyles } from "@material-ui/core/styles";
import { ControlPanel } from "../ControlPanel/ControlPanel";
import { ModulePanel } from "../ModulePanel/ModulePanel";
import { SideBar } from "../SideBar/SideBar";

const useStyle = makeStyles((theme) => ({
  awaPlatform: {
    display: "flex",
    flexFlow: "row nowrap",
    minWidth: "64rem",
    height: "100vh",
    minHeight: "38.5rem",
    maxHeight: "100vh",
    justifyContent: "center",
    alignItems: "stretch",
    alignContent: "stretch",
    backgroundColor: theme.palette.background.panel,
  },
}));

console.log("awaPlatform is rendered");

export const AWAPlatform = ({UCID=0, asyVersion="unknown", ...props}) => {
  const locClasses = useStyle(props);
  const [isCPExpanded, setCPExpandState] = useState(true);
  const dispatch = useDispatch();
  dispatch(glActionCreator.setClientId(UCID));
  dispatch(glActionCreator.setAsyVersion(asyVersion));

  return (
    <div className={locClasses.awaPlatform} >
      <SideBar isCPExpanded={isCPExpanded} setCPExpandState={setCPExpandState}/>
      <ControlPanel isCPExpanded={isCPExpanded}/>
      <ModulePanel/>
    </div>
  );
};
