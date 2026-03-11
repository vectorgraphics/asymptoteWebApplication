import { useDispatch, useSelector } from "react-redux";
import { StyledButton } from "../../components/StyledComponents.jsx";
import { UploadIcon } from '../../../assets/icons/AppIcons.jsx';
import { selectCurrentWs } from "../../../state/slices/workspacesSlice.js";
import { setCurrentCode } from "../../../state/slices/inputsSlice.js";
// import { editorLineNumber } from "../../../state/slices/cmSettingsSlice.jsx";


const iconCSS = {
  height: "1.75rem",
  flexGrow: 1,
  py: "2px",
  color: "blue",
}

export const UploadBtn = () => {
  const dispatch = useDispatch();
  const currentWs = useSelector(selectCurrentWs);
  const isCompiling = currentWs.isCompiling;
  const isDownloading = currentWs.isDownloading;

  const upload = () => {
  const inputElement = document.createElement("input");
  inputElement.type = "file";
  inputElement.click();
    inputElement.addEventListener("change", function (changeEvent) {
      let reader = new FileReader();
      reader.addEventListener("load", (loadEvent) => {
        dispatch(setCurrentCode(loadEvent.target.result.toString()));
      }, false)
      reader.readAsText(this.files[0]);
    }, false);
  }

  return (
    <StyledButton
      sx={{
        "&.Mui-disabled": {
          bgcolor: "btnHover"
        }
      }}
      variant="contained"
      onClick={upload}
      disabled={isCompiling || isDownloading}
    >
      <UploadIcon sx={{...iconCSS}} />
    </StyledButton>
  )
};
