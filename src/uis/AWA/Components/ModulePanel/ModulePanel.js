import { makeStyles } from "@material-ui/core/styles";
import { CodeModule } from "../CodeModule/CodeModule";
import { GraphModule } from "../GraphModule/GraphModule";

const useStyle = makeStyles((theme) => ({
  modulePanel: {
    display: "block",
    flex: "2 1 auto",
    height: "100%",
    minWidth: "37rem",
    backgroundColor: theme.palette.background.ModulePanel,
  }
}))

export function ModulePanel(props) {
  const classes = useStyle();
  return (
    <div className={classes.modulePanel}>
      <CodeModule/>
      {/*<GraphModule/>*/}
    </div>
  );
}
