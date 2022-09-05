import { useDispatch, useSelector } from "react-redux";
import { idSelector, editorPaneViewSelector } from "../../../../../store/selectors";
import { enActionCreator } from "../../../../../store/workspaces";
import { makeStyles } from "@material-ui/core/styles";
import { OutFormats } from "./OutFormats.js";
import { ArrowControllers } from "../ArrowControllers";
import { EraserSVG } from "../../../../../assets/svgs/appwideSvgs.js";


const useStyle = makeStyles((theme) => ({
  headerCont: {
    display: "flex",
    flexFlow: "row nowrap",
    minHeight: "2rem",
    maxHeight: "2rem",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.background.headerType1,
    "&::selection": {
      backgroundColor: "transparent",
    }
  },
  headerBody: {
    display: "flex",
    flexFlow: "row nowrap",
    minHeight: "1.5rem",
    maxHeight: "1.5rem",
    minWidth: "12rem",
    alignItems: "center",
  },
  eraserIcon: {
    minWidth: "1rem",
    maxWidth: "1rem",
    minHeight: "1rem",
    maxHeight: "1rem",
    marginTop: "-0.5rem",
    margin: "0 1rem",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.icon.erase,
    },
  }
}));

export function PreviewPaneHeader(props) {
  const locClasses = useStyle();
  const id = useSelector(idSelector);
  const editorPaneView = useSelector(editorPaneViewSelector);
  const dispatch = useDispatch();

  return (
    <div className={locClasses.headerCont}>
      <ArrowControllers
        pane="preview" status={editorPaneView}
        onClick={(event) => dispatch(enActionCreator.setEditorPaneView(id, !editorPaneView))}/>
      <div className={locClasses.headerBody}>
        <OutFormats/>
        <div className={locClasses.eraserIcon}> <EraserSVG/> </div>
      </div>
    </div>
  );
}
