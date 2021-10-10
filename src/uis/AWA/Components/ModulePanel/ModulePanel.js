import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { CodeModule } from "../CodeModule/CodeModule";
import { GraphModule } from "../GraphModule/GraphModule";
import { idSelector, resetRequestSelector } from "../../../../store/selectors";


const useStyle = makeStyles((theme) => ({
  modulePanel: {
    display: "block",
    flex: "2 1 auto",
    height: "100%",
    minWidth: "37rem",
    backgroundColor: theme.palette.background.ModulePanel,
  }
}));

export function ModulePanel(props) {
  const locClasses = useStyle();
  const id = useSelector(idSelector);
  const activeModule = useSelector((store) => store.workspaces.entities[id].activeModule);

  if (activeModule === "Code Module") {
    var moduleToRender = <CodeModule/>;
  } else if (activeModule === "Graph Module") {
    moduleToRender = <GraphModule/>;
  } else {
    moduleToRender = <CodeModule/>;
  }

  return (
    <div className={locClasses.modulePanel}> {moduleToRender} </div>
  );
}
