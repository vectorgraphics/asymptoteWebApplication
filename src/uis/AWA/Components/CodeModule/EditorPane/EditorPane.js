import { useSelector } from "react-redux";
import { editorPaneViewSelector, cmOutputSelector } from "../../../../../store/selectors";
import { makeStyles } from "@material-ui/core/styles";
import { EditorPaneHeader } from "./EditorPaneHeader.js";
import { Editor } from "./Editor";
import { Terminal } from "./Terminal";
import { merge, isEqual } from "lodash";


const basicStyle = (theme) => ({
  editorPane: {
    display: "grid",
    gridTemplateRows: "2rem 1fr",
    alignItems: "stretch",
    borderRight: `1px solid ${theme.palette.outline.panelBorder}`,
    backgroundColor: theme.palette.background.panel,
  },
});

const useStyle = makeStyles((theme) => ({
  editorPane: (finalStyle) => merge(basicStyle(theme), finalStyle).editorPane,
}));

export const EditorPane = ({finalStyle={}, setPreviewState=()=>{}, ...props}) => {
  const locClasses = useStyle(finalStyle);
  const cmOutput = useSelector(cmOutputSelector, isEqual);
  const editorPaneView = useSelector(editorPaneViewSelector, isEqual);

  // console.log("editorPane rendered");
  const {stdout="", stderr=""} = cmOutput;

  return (
    (editorPaneView)?
    <div className={locClasses.editorPane}>
      <EditorPaneHeader setPreviewState={setPreviewState}/>
      <Editor/>
      <Terminal content={stderr + stdout}
      />
    </div>:
    null
    );
  };
  // closeTerminal={() => {dispatch(cmActionCreator.updateOutput(id, {...cmOutput, stdout: "", stderr: ""}))}}














