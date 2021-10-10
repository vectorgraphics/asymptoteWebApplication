import { useDispatch, useSelector } from "react-redux";
import { idSelector, editorReRenderSelector } from "../../../../../../store/selectors";
import { makeStyles } from "@material-ui/core/styles";
import { enActionCreator, cmActionCreator } from "../../../../../../store/workspaces";
import { Btn } from "../../../../Atoms/Btn";
import PublishIcon from "@material-ui/icons/Publish";

const useStyle = makeStyles((theme) => ({
  btn: {
    margin: "0 0.5rem",
  },
  uploadBtnIcon: {
    color: theme.palette.icon.Upload,
  },
}))

export function Upload(props) {
  const locClasses = useStyle();
  const id = useSelector(idSelector);
  const editorReRender = useSelector(editorReRenderSelector);
  const dispatch = useDispatch();

  return (
      <Btn minWidth="6rem" maxWidth="6rem"
        className={locClasses.btn}
        startIcon={<PublishIcon className={locClasses.uploadBtnIcon}/>}
        onClick={(event) => uploadHandler(dispatch, id, editorReRender)}
      >
        Upload
      </Btn>
  );
}

function uploadHandler(dispatch, id, editorReRender) {
  const inputElement = document.createElement("input");
  inputElement.type = "file";
  inputElement.click();
  inputElement.addEventListener("change", function (event) {
    let reader = new FileReader();
    reader.addEventListener("load",  (event) => {
      dispatch(cmActionCreator.setCodeContent(id, event.target.result.toString()));
      dispatch(enActionCreator.reRenderEditor(id, editorReRender + 1));
    }, false);
    reader.readAsText(this.files[0]);
  }, false);
}