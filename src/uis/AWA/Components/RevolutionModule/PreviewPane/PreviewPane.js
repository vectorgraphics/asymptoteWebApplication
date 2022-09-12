import { useRef } from "react";
import { useSelector } from "react-redux";
import { rmOutputSelector } from "../../../../../store/selectors";
import { makeStyles } from "@material-ui/core/styles";
import { PreviewPaneHeader } from "./PreviewPaneHeader.js";
import { Preview } from "../../../Molecules/Preview/Preview.js";
import { isEqual, merge } from "lodash";

const basicStyle = (theme) => ({
  previewPane: {
    flex: "1 1 auto",
    display: "grid",
    gridTemplateRows: "max-content",
    alignItems: "stretch",
    backgroundColor: theme.palette.background.panel,
    // border: "1px solid blue",
  },
});

const useStyle = makeStyles((theme) => ({
  previewPane: (finalStyle) => merge(basicStyle(theme), finalStyle).previewPane,
}));

export const PreviewPane = ({finalStyle={}, previewState=true, setPreviewState=()=>{}, ...props}) => {
  const locClasses = useStyle(finalStyle);
  const previewIframeRef = useRef(null);
  const rmOutput = useSelector(rmOutputSelector, isEqual);

  return (
    <div className={locClasses.previewPane}>
      <PreviewPaneHeader onErase={() => setPreviewState(false)}/>
      <Preview
        finalStyle={iframeFinalStyle} parentModule="rm"
        outputObj={rmOutput} iframeRef={previewIframeRef}
        previewState={previewState}
        />
    </div>
  );
};

const iframeFinalStyle = {
  iframe: {
    minHeight: "100%",
  }
}