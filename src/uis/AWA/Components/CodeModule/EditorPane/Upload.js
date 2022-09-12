import { useDispatch, useSelector } from "react-redux";
import { idSelector, editorReRenderSelector } from "../../../../../store/selectors.js";
import { makeStyles, Button } from "@material-ui/core";
import { enActionCreator } from "../../../../../store/workspaces.js";
import { cmActionCreator } from "../../../../../store/codeModule.js";
import { Publish as UploadIcon} from "@material-ui/icons";

const useStyle = makeStyles((theme) => ({
  root: {
    minWidth: "4rem",
    maxWidth: "4rem",
    minHeight: "1.5rem",
    padding: "0",
    fontSize: "0.875rem",
    borderRadius: "1px",
    "& span": {},
  },
  uploadIcon: {
    color: theme.palette.icon.upload,
  },
}))

export const Upload = (props) => {
  const locClasses = useStyle();
  const id = useSelector(idSelector);
  const editorReRender = useSelector(editorReRenderSelector);
  const dispatch = useDispatch();

  return (
      <Button
        classes={{root: locClasses.root}} variant={"contained"} disableElevation={true}
        onClick={(event) => uploadHandler(dispatch, id, editorReRender)}
      >
        <UploadIcon className={locClasses.uploadIcon}/>
      </Button>
  );
};

function uploadHandler(dispatch, id, editorReRender) {
  const inputElement = document.createElement("input");
  inputElement.type = "file";
  inputElement.click();
  inputElement.addEventListener("change", function (event) {
    let reader = new FileReader();
    reader.addEventListener("load",  (event) => {
      dispatch(cmActionCreator.setCurrentCode(id, event.target.result.toString()));
      dispatch(enActionCreator.reRenderEditor(id, editorReRender + 1));
    }, false);
    reader.readAsText(this.files[0]);
  }, false);
}
