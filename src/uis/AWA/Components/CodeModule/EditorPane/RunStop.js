import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UCIDSelector, idSelector, wsNameSelector, cmCurrentInputSelector, cmOutputSelector } from "../../../../../store/selectors.js";
import { fetchOptionObj, codeFormatter, toUrlEncoded } from '../../../../../utils/appTools.js';
import { cmActionCreator } from "../../../../../store/codeModule.js";
import { RunStopShell } from "../../../Atoms/RunStopShell.js";
import { isEqual } from "lodash";

export const RunStop = ({setPreviewState=()=>{}, ...props}) => {
  const previousInput = useRef({currentCode: "", outFormat: ""});
  const UCID = useSelector(UCIDSelector);
  const id = useSelector(idSelector, isEqual);
  const wsName = useSelector(wsNameSelector, isEqual);
  const currentInput = useSelector(cmCurrentInputSelector);
  const cmOutput = useSelector(cmOutputSelector, isEqual);
  const dispatch = useDispatch();
  let data = {};

  // console.log("runStop is rendered.");
  const disabled = (currentInput.currentCode.trim() === "")? true: false;

  return (
    <RunStopShell
      disableElevation={true} disabled={disabled}
      onRun={(event, setRunStatus, controller) => {
        if (!isEqual(currentInput, previousInput.current)) {
          previousInput.current = currentInput;
          setRunStatus(false);
          data = {
          reqType: (currentInput.outFormat === "prev")? "run": "download",
          UCID: UCID,
          workspaceId: id,
          workspaceName: wsName,
          parentModule: "CM",
          currentCode: codeFormatter(currentInput.currentCode),
          outFormat: currentInput.outFormat,
        };
        if (data.reqType === "run") {
          fetch("/", {...fetchOptionObj.postUrlEncode, signal: controller.signal, body: toUrlEncoded(data)})
            .then((resObj) => resObj.json()).then((response) => {
            dispatch(cmActionCreator.updateOutput(id, {...cmOutput, ...response}));
            setRunStatus(true);
            setPreviewState(true);
          }).catch(() => console.log("error happened"));
        } else if (data.reqType === "download") {
          fetch("/", {...fetchOptionObj.postUrlEncode, signal: controller.signal, body: toUrlEncoded(data)})
            .then((resObj) => resObj.json()).then((response) => {
              if (response.serverRes.resStatus === "SUCCESS" && response.serverRes.resType === "ASY_OUTPUT_CREATED") {
                delete(data.codeCode);
                fetch("/clients", {...fetchOptionObj.postUrlEncode, signal: controller.signal, body: toUrlEncoded(data)})
                  .then((resObj) => resObj.blob()).then((fileContent) => {
                  setRunStatus(true);
                  const link = document.createElement("a");
                  link.href = window.URL.createObjectURL(fileContent);
                  link.setAttribute("download", wsName.toString());
                  link.click();
                }).catch((err) => {});
              }
            }
          ).catch((err) => {});
        }
        } else {
          setPreviewState(true);
        }
      }}
      onStop={(event, setRunStatus, controller) => {
        setRunStatus(true);
      }}
    />
  );
};
