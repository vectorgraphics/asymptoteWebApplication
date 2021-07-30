import { makeStyles } from "@material-ui/core/styles";
import { ControlPanel } from "../ControlPanel/ControlPanel";
import { ModulePanel } from "../ModulePanel/ModulePanel";
import { SideBar } from "../SideBar/SideBar";

const useStyle = makeStyles({
  awaplatform: {
    display: "flex",
    flexFlow: "row nowrap",
    minWidth: "64rem",
    minHeight: "50rem",
    justifyContent: "center",
    alignContent: "stretch",
    overflow: "hidden",
  },
  sidebar_container: {
    display: "block",
    flex: "1 1 auto",
    minWidth: "2rem",
    maxWidth: "2rem",
  },
  controlpanel_container: {
    display: "block",
    flex: "1 1 auto",
    minWidth: "14.1rem",
    maxWidth: "17.2rem",
  },
  modulepanel_container: {
    display: "block",
    flex: "2 1 auto",
    minWidth: "37rem",
  }
})

export function AWAPlatform(props) {
  const classes = useStyle();
  return (
    <div className={classes.awaplatform}>
    <div className={classes.sidebar_container}>         <SideBar/>      </div>
      <div className={classes.controlpanel_container}>  <ControlPanel/> </div>
      <div className={classes.modulepanel_container}>   <ModulePanel/>  </div>
    </div>
  );
}
