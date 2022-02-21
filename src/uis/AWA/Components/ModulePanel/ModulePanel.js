import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { CodeModule } from "../CodeModule/CodeModule";
import { GraphModule } from "../GraphModule/GraphModule";
import { idSelector } from "../../../../store/selectors";
import { scrollbarStyler } from "../../../../utils/appTools";


const useStyle = makeStyles((theme) => ({
  modulePanel: {
    display: "block",
    flex: "2 1 auto",
    minWidth: "37rem",
    overflow: "auto",
    ...scrollbarStyler(),
    backgroundColor: theme.palette.background.ModulePanel,
    zIndex: 1000,
  },
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
