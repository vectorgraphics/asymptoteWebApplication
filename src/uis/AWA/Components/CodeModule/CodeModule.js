import { makeStyles } from "@material-ui/core/styles";
import { EditorPane } from "./EditorPane/EditorPane";
import { PreviewPane } from "./PreviewPane/PreviewPane";
import { scrollbarStyler } from "../../../../utils/appTools";
import { useState } from "react";

const useStyle = makeStyles((theme) => ({
  codeModule: {
    display: "flex",
    flexFlow: "row nowrap",
    marginTop: "0.25rem",
    minHeight: "calc(100% - 0.25rem)",
    maxHeight: "calc(100% - 0.25rem)",
    justifyContent: "stretch",
    overflow: "auto",
    ...scrollbarStyler(),
  },
}));

export const CodeModule = (props) => {
  const locClasses = useStyle();
  const [previewState, setPreviewState] = useState(true);

  return (
    <div className={locClasses.codeModule}>
        <EditorPane finalStyle={editorFinalStyle} setPreviewState={setPreviewState}/>
        <PreviewPane finalStyle={previewFinalStyle} previewState={previewState} setPreviewState={setPreviewState}/>
    </div>
  )
};

const editorFinalStyle = {
  editorPane: {
    flex: "1 1 0",
  }
}
const previewFinalStyle = {
  previewPane: {
    flex: "1 1 0",
  }
}
