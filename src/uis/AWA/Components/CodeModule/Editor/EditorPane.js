import { makeStyles } from "@material-ui/core/styles";
import { EditorHeader } from "./EditorHeader";
import { Editor } from "./Editor";


const useStyle = makeStyles((theme) => ({
  editorPane: {
    display: "flex",
    flexFlow: "column nowrap",
    flex: "1 1 auto",
    minWidth: "50%",
    minHeight: "100%",
    borderRight: "1px solid grey",
  },
}))

export function EditorPane(props) {
  const classes = useStyle();
  return (
    <div className={classes.editorPane}>
      <EditorHeader/>
      <Editor/>
    </div>
  );
}

