import { useDispatch, useSelector } from "react-redux";
import { UCIDSelector, idSelector, wsNameSelector, cmCodeSelector, cmOutFormatSelector, cmOutputSelector} from "../../../../../store/selectors.js";
import { useTheme } from "@material-ui/core/styles";
import { fetchOptionObj, codeFormatter, toUrlEncoded } from '../../../../../utils/appTools.js';
import { cmActionCreator } from "../../../../../store/codeModule.js";
import { RunStopShell } from "../../../Atoms/RunStopShell.js";

const basicStyle = (theme) => ({
  root: {},
});

export function RunStop(props) {
  const UCID = useSelector(UCIDSelector);
  const id = useSelector(idSelector);
  const wsName = useSelector(wsNameSelector);
  const code = useSelector(cmCodeSelector);
  const outFormat = useSelector(cmOutFormatSelector);
  const cmOutput = useSelector(cmOutputSelector);
  const dispatch = useDispatch();
  const theme = useTheme();

  const data = {
    reqType: (outFormat === "prev")? "run": "download",
    UCID: UCID,
    workspaceId: id,
    workspaceName: wsName,
    parentModule: "Code Module",
    code: {
      lastSuccessful: code.lastSuccessful,
      lastFailed: code.lastFailed,
      currentContent: codeFormatter(code.currentContent),
    },
    commands: [""],
    outFormat: outFormat,
  };

  return (
    <RunStopShell
      finalStyle={basicStyle(theme)} disableElevation={true}
      onRun={(event, setRunStatus, controller) => {
        if (data.reqType === "run") {
          fetch('/', {...fetchOptionObj.postUrlEncode, signal: controller.signal, body: toUrlEncoded(data)})
            .then((resObj) => resObj.json()).then((responseContent) => {
            setRunStatus(true);
            dispatch(cmActionCreator.updateOutput(id, {...cmOutput, ...responseContent}));
          }).catch(() => null);
        } else if (data.reqType === "download") {
          fetch('/', {...fetchOptionObj.postUrlEncode, signal: controller.signal, body: toUrlEncoded(data)})
            .then((resObj) => resObj.json()).then((responseContent) => {
              if (responseContent.responseType === "ASY_OUTPUT_CREATED") {
                delete (data.codeContent);
                fetch('/clients', {...fetchOptionObj.postUrlEncode, signal: controller.signal, body: toUrlEncoded(data)})
                  .then((resObj) => resObj.blob()).then((responseContent) => {
                  setRunStatus(true);
                  const link = document.createElement("a");
                  link.href = window.URL.createObjectURL(responseContent);
                  link.setAttribute("download", wsName.toString());
                  link.click();
                }).catch((err) => {});
              }
            }
          ).catch((err) => {});
        }
      }}
    />
  );
}
