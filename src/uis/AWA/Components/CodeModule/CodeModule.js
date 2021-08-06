import { makeStyles } from "@material-ui/core/styles";
import { EditorPane } from "./Editor/EditorPane";
import { Controls } from "./Controls/Controls";
import { PreviewPane } from "./Preview/PreviewPane";


const useStyle = makeStyles((theme) => ({
  codeModule: {
    display: "grid",
    minHeight: "minmax(500px, 1fr)",
    gridTemplateRows: "2.5rem minmax(500px, 1fr)",
    // backgroundColor: "white",
  },
  workingPanes: {
    gridRow: "2/3",
    display: "flex",
    flexFlow: "row nowrap",
    minHeight: "calc(100vh - 2.5rem)",
    // border: "1px solid white",
  },
}));

export function CodeModule(props) {
  const classes = useStyle();
  return (
    <div className={classes.codeModule}>
      <Controls/>
      <div className={classes.workingPanes}>
        <EditorPane/>
        <PreviewPane/>
      </div>
    </div>
  )
}
