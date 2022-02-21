import { useDispatch, useSelector } from "react-redux";
import { idSelector, editorReRenderSelector } from "../../../../../../store/selectors";
import { makeStyles } from "@material-ui/core/styles";
import { enActionCreator } from "../../../../../../store/workspaces";
import { cmActionCreator } from "../../../../../../store/codeModule";
import { Btn } from "../../../../Atoms/Btn";
import PublishIcon from "@material-ui/icons/Publish";

const useStyle = makeStyles((theme) => ({
  btn: {
    margin: "0 0.5rem",
  },
  span: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
  },
  uploadIcon: {
    marginLeft: "-0.5rem",
    marginRight: "0.5rem",
    color: theme.palette.icon.Upload,
  },
}))

export function Upload(props) {
  const locClasses = useStyle();
  const id = useSelector(idSelector);
  const editorReRender = useSelector(editorReRenderSelector);
  const dispatch = useDispatch();

  return (
      <Btn
        className={locClasses.btn} minWidth="6rem" maxWidth="6rem"
        onClick={(event) => uploadHandler(dispatch, id, editorReRender)}
      >
        <span className={locClasses.span}> <PublishIcon className={locClasses.uploadIcon}/> Upload </span>
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