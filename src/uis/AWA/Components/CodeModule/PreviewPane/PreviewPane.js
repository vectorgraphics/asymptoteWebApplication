import { useSelector } from "react-redux";
import { idSelector, previewPaneViewSelector, cmOutputSelector } from "../../../../../store/selectors";
import { PreviewPaneHeader } from "./PreviewPaneHeader.js";
import { makeStyles } from "@material-ui/core/styles";
import { Preview } from "../../../Molecules/Preview/Preview.js";
import { merge } from "lodash";


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

export function PreviewPane({finalStyle={}, ...props}) {
  const locClasses = useStyle(finalStyle);
  const id = useSelector(idSelector);
  const cmOutput = useSelector(cmOutputSelector);
  const previewPaneView = useSelector(previewPaneViewSelector);

  return (
    (previewPaneView)?
    <div className={locClasses.previewPane}>
      <PreviewPaneHeader/>
      <Preview outputObj={cmOutput}/>
    </div>:
    null
  );
}
