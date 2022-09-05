import { useSelector, useDispatch } from "react-redux";
import { idSelector, editorPaneViewSelector, cmOutputSelector } from "../../../../../store/selectors";
import { makeStyles } from "@material-ui/core/styles";
import { cmActionCreator } from "../../../../../store/codeModule";
import { EditorPaneHeader } from "./EditorPaneHeader.js";
import { Editor } from "./Editor";
import { Terminal } from "./Terminal";
import { merge } from "lodash";


const basicStyle = (theme) => ({
  editorPane: {
    display: "grid",
    gridTemplateRows: "2rem 1fr",
    alignItems: "stretch",
    borderRight: `1px solid ${theme.palette.outline.panelBorder}`,
    backgroundColor: theme.palette.background.module,
  },
});

const useStyle = makeStyles((theme) => ({
  editorPane: (finalStyle) => merge(basicStyle(theme), finalStyle).editorPane,
}));

export function EditorPane({finalStyle={}, ...props}) {
  const locClasses = useStyle(finalStyle);
  const id = useSelector(idSelector);
  const cmOutput = useSelector(cmOutputSelector);
  const editorPaneView = useSelector(editorPaneViewSelector);
  const dispatch = useDispatch();

  const stdout = (id)? cmOutput.stdout: "";
  const stderr = (id)? cmOutput.stderr: "";

  return (
    (editorPaneView)?
    <div className={locClasses.editorPane}>
      <EditorPaneHeader/>
      <Editor/>
      <Terminal
        errorContent={stderr + stdout}
        // closeTerminal={() => {dispatch(cmActionCreator.updateOutput(id, {...cmOutput, stdout: "", stderr: ""}))}}
      />
    </div>:
    null
  );
}














