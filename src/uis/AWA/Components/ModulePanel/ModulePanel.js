import { makeStyles } from "@material-ui/core/styles";
import { CodeModule } from "../CodeModule/CodeModule";

const useStyle = makeStyles((theme) => ({
  modulepanel: {
    display: "block",
    height: "100%",
    backgroundColor: theme.palette.common.ModulePanel_Bg,
    // borderLeft: `2px solid ${theme.palette.common.ControlPanel_Bg}`,
  }
}))

export function ModulePanel(props) {
  const classes = useStyle();
  return (
    <div className={classes.modulepanel}>
      <CodeModule/>
    </div>
  );
}
