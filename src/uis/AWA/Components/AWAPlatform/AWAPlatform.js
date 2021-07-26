import { makeStyles } from "@material-ui/core/styles";
import { ControlPanel } from "../ControlPanel/ControlPanel";
import { ModulePanel } from "../ModulePanel/ModulePanel";
import { SideBar } from "../SideBar/SideBar";

const useStyle = makeStyles({
  awaplatform: {
    display: "grid",
    gridTemplateColumns: "2rem minmax(200px, 1fr) minmax(800px, 6fr)",
  },
  sidebar: {
    display: "block",
    gridColumnStart: "1",
    gridColumnEnd: "2",
  },
  controlpanel: {
    display: "block",
    gridColumnStart: "2",
    gridColumnEnd: "3",
  },
  modulepanel: {
    display: "block",
    gridColumnStart: "3",
    gridColumnEnd: "4",
  }
})

function AWAPlatform(props) {
  const classes = useStyle();
  return (
    <div className={classes.awaplatform}>
      <div className={classes.sidebar}> <SideBar/> </div>
      <div className={classes.controlpanel}> <ControlPanel/> </div>
      <div className={classes.modulepanel}> <ModulePanel/> </div>
    </div>
  );
}

export default AWAPlatform;