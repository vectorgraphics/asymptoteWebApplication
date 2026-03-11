import { useRef } from "react";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { StyledButton } from "../../components/StyledComponents.jsx";
import { CompileIcon, StopIcon } from "../../../assets/icons/AppIcons.jsx";
import { setIsCompiling, selectCurrentWs } from "../../../state/slices/workspacesSlice.js";
import { selectCurrentWsId } from "../../../state/slices/workspacesInfoSlice.js";
import { setSubmittedCode } from "../../../state/slices/inputsSlice.js";
import { setOutput } from "../../../state/slices/outputsSlice.js";
import { xFetch } from "../../../utils/xFetch.js";

const iconCSS = {
  height: "1.75rem",
  py: "2px",
  color: "blue"
}

export const CompileBtn = ({codeInEditor=""}) => {
  const dispatch = useDispatch();
  const currentWsId = useSelector(selectCurrentWsId);
  const isCompiling = useSelector(selectCurrentWs).isCompiling;
  const isDownloading = useSelector(selectCurrentWs).isDownloading;
  const ref = useRef(new AbortController());

  return <StyledButton
    sx={{
      "&.Mui-disabled": {
        bgcolor: "btnHover"
      }
    }}
    variant="contained"
    loadingPosition="end"
    onClick={(event) => {
      dispatch(setIsCompiling(!isCompiling));
      dispatch(setSubmittedCode(codeInEditor.current));
      const controller = ref.current;
      const abortSignal = controller.signal;
      if (!isCompiling) {
        xFetch.setSignal(abortSignal).compile(currentWsId, "html", {codeText: codeInEditor.current})
          .then(response => response.json())
          .then((response) => dispatch(setOutput(response)))
          .finally(() => dispatch(setIsCompiling(false)))
          .catch((err) => console.log(err));
      } else {
        setIsCompiling(false);
        controller.abort("User canceled the request");
        ref.current = new AbortController();
      }
    }}
    endIcon={(isCompiling) ? <CircularProgress size={20} sx={{color: "red"}} /> : null}
    disabled={isDownloading}
  >
    {
      (isCompiling)? 
        <StopIcon sx={{...iconCSS, color: "red"}} /> :
        <CompileIcon sx={{...iconCSS, color: "green"}} />
    }
  </StyledButton>
}


