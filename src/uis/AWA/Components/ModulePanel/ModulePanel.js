import { makeStyles } from "@material-ui/core/styles";
import { CodeModule } from "../CodeModule/CodeModule";


const useStyle = makeStyles((theme) => ({
  modulepanel: {
    display: "block",
    minHeight: "100vh",
    backgroundColor: theme.palette.common.ModulePanel_Bg,
    borderLeft: "2px solid theme.palette.common.ModulePanel_Bg",
  }
}))

export function ModulePanel(props) {
  const classes = useStyle();
  return (
    <div className={classes.modulepanel}>
      <CodeModule />
    </div>
  );
}
