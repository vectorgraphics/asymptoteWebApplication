import { useSelector } from "react-redux";
import { idSelector } from "../../../../../store/selectors";
import { makeStyles } from "@material-ui/core/styles";
import { PreviewPaneHeader } from "./PreviewPaneHeader.js";
import { Preview } from "../../../Molecules/Preview/Preview.js";
import { merge } from "lodash";

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

export function PreviewPane({finalStyle={}, ...props}) {
  const locClasses = useStyle(finalStyle);
  const id = useSelector(idSelector);
  // const cmOutput = useSelector(cmOutputSelector);

  return (
    <div className={locClasses.previewPane}>
      <PreviewPaneHeader/>
      <Preview outputObj={{}}/>
    </div>
  );
}
