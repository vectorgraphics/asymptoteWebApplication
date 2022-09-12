import { useRef } from "react";
import { useSelector } from "react-redux";
import { previewPaneViewSelector, cmOutputSelector } from "../../../../../store/selectors";
import { PreviewPaneHeader } from "./PreviewPaneHeader.js";
import { makeStyles } from "@material-ui/core/styles";
import { Preview } from "../../../Molecules/Preview/Preview.js";
import { merge, isEqual } from "lodash";


const basicStyle = (theme) => ({
  previewPane: {
    display: "grid",
    gridTemplateRows: "max-content",
    alignItems: "stretch",
    borderLeft: `1px solid ${theme.palette.outline.panelBorder}`,
    backgroundColor: theme.palette.background.module,
    // border: "1px dashed white",
  },
});

const useStyle = makeStyles((theme) => ({
  previewPane: (finalStyle) => merge(basicStyle(theme), finalStyle).previewPane,
}));

export const PreviewPane = ({finalStyle={}, previewState=true, setPreviewState=()=>{},...props}) => {
  const locClasses = useStyle(finalStyle);
  const previewIframeRef = useRef(null);
  const cmOutput = useSelector(cmOutputSelector, isEqual);
  const previewPaneView = useSelector(previewPaneViewSelector, isEqual);

  // console.log("previewPane rendered");


  return (
    (previewPaneView)?
    <div className={locClasses.previewPane}>
      <PreviewPaneHeader onErase={() => previewIframeRef.current.src = ""} setPreviewState={setPreviewState}/>
      <Preview parentModule="cm" outputObj={cmOutput} iframeRef={previewIframeRef} previewState={previewState}/>
    </div>:
    null
    );
  };
