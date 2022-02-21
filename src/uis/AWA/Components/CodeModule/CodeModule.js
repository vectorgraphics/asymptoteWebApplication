import { makeStyles } from "@material-ui/core/styles";
import { EditorPane } from "./Editor/EditorPane";
import { CtrlBar } from "./Controls/CtrlBar";
import { PreviewPane } from "./Preview/PreviewPane";

const useStyle = makeStyles((theme) => ({
  codeModule: {
    display: "grid",
    minHeight: "minmax(500px, 1fr)",
    gridTemplateRows: "2.5rem minmax(500px, 1fr)",
  },
  workingPanes: {
    gridRow: "2/3",
    display: "flex",
    flexFlow: "row nowrap",
    minHeight: "calc(100vh - 2.5rem)",
  },
}));

export function CodeModule(props) {
  const locClasses = useStyle();

  return (
    <div className={locClasses.codeModule}>
      <CtrlBar/>
      <div className={locClasses.workingPanes}>
        <EditorPane/>
        <PreviewPane/>
      </div>
    </div>
  )
}
