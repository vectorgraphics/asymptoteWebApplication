import { useDispatch, useSelector } from "react-redux";
import { idSelector } from "../../../../../store/selectors";
import { makeStyles } from "@material-ui/core/styles";
import { enActionCreator } from "../../../../../store/workspaces";
import { ArrowControllers } from "../ArrowControllers";


const useStyle = makeStyles((theme) => ({
  header: {
    display: "flex",
    flexFlow: "row nowrap",
    flex: "1 1 auto",
    minHeight: "2rem",
    maxHeight: "2rem",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.background.Header2,
    "&::selection": {
      backgroundColor: "transparent",
    }
  },
  body: {
    minWidth: "10rem",
    marginRight: "0.5rem",
  },
}));

export function PreviewHeader(props) {
  const locClasses = useStyle();
  const id = useSelector(idSelector);
  const editorPaneView = useSelector((store) => {
    return (id)? store.workspaces.entities[id].editorPaneView: true;
  });
  const dispatch = useDispatch();

  return (
    <div className={locClasses.header}>
      <ArrowControllers
        pane="preview" status={editorPaneView}
        onClick={(event) => dispatch(enActionCreator.setEditorPaneView(id, !editorPaneView))}/>
      <div className={locClasses.body}>
        {/*{"this is the preview header"}*/}
      </div>
    </div>
  );
}
