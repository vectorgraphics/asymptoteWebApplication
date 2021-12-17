import { useSelector, useDispatch } from "react-redux";
import { idSelector, cmOutputSelector } from "../../../../../store/selectors";
import { makeStyles } from "@material-ui/core/styles";
import { EditorHeader } from "./EditorHeader";
import { Editor } from "./Editor";
import { Terminal } from "./Terminal";
import {cmActionCreator} from "../../../../../store/workspaces";

const useStyle = makeStyles((theme) => ({
  editorPane: {
    display: "flex",
    flexFlow: "column nowrap",
    flex: "1 1 0",
    minHeight: "100%",
    borderRight: "1px solid grey",
  },
}));

export function EditorPane(props) {
  const locClasses = useStyle();
  const id = useSelector(idSelector);
  const cmOutput = useSelector(cmOutputSelector);
  const editorPaneView = useSelector((store) => (id)? store.workspaces.entities[id].editorPaneView: true);
  const dispatch = useDispatch();
  const stdout = (id)? cmOutput.stdout: "";
  const stderr = (id)? cmOutput.stderr: "";

  return (
    (editorPaneView)?
    <div className={locClasses.editorPane}>
      <EditorHeader/>
      <Editor/>
      {
        (stdout !== "" || stderr !== "")
        ? <Terminal
            errorContent={stderr + stdout}
            closeTerminal={() => {dispatch(cmActionCreator.updateOutput(id, {...cmOutput, stdout: "", stderr: ""}))}}/>
        : null
      }
    </div>:
    null
  );
}

