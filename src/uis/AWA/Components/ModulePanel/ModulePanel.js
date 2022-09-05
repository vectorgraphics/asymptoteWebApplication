import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { CodeModule } from "../CodeModule/CodeModule";
import { GraphModule } from "../GraphModule/GraphModule";
import { RevolutionModule } from "../RevolutionModule/RevolutionModule";
import { idSelector } from "../../../../store/selectors";
import {scrollbarStyler} from "../../../../utils/appTools.js";

const useStyle = makeStyles((theme) => ({
  modulePanel: {
    flex: "2 1 auto",
    display: "flex",
    flexFlow: "column nowrap",
    minHeight: "100%",
    minWidth: "37rem",
    alignContent: "stretch",
    alignItems: "stretch",
    borderLeft: "1px solid black",
    backgroundColor: theme.palette.background.module,
    zIndex: 1000,
  },
}));

export function ModulePanel(props) {
  const locClasses = useStyle();
  const id = useSelector(idSelector);
  const activeModule = useSelector((store) => store.workspaces.entities[id].activeModule);
  let moduleToRender;

  switch (activeModule) {
    case "Code Module":
      moduleToRender = <CodeModule/>;
      break;
    case "Graph Module":
      moduleToRender = <GraphModule/>;
      break;
    case "Solid of Revolution":
      moduleToRender = <RevolutionModule/>;
      break;
    default:
      moduleToRender = <CodeModule/>;
    break;
  }

  return (
    <div className={locClasses.modulePanel}> {moduleToRender} </div>
  );
}
