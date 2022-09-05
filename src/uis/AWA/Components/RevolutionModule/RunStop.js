import { useSelector, useDispatch } from "react-redux";
import { UCIDSelector, idSelector, wsNameSelector, cmCodeSelector, cmOutFormatSelector, cmOutputSelector } from "../../../../store/selectors.js";
import { useTheme } from "@material-ui/core/styles";
import { fetchOptionObj, codeFormatter, toUrlEncoded } from '../../../../utils/appTools.js';
import { cmActionCreator } from "../../../../store/codeModule.js";
import { RunStopShell } from "../../Atoms/RunStopShell.js";

const basicStyle = (theme) => ({
  root: {
    minWidth: "7rem",
    maxWidth: "7rem",
    minHeight: "2rem",
    maxHeight: "2rem",
    placeSelf: "center",
    backgroundColor: theme.palette.common.white,
    "&:hover": {
      // backgroundColor: theme.palette.common.grey[600],
    }
  },
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
    reqType: "run",
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
      finalStyle={basicStyle(theme)}
      onRun={(event, setRunStatus, controller) => {
        fetch('/', {...fetchOptionObj.postUrlEncode, signal: controller.signal, body: toUrlEncoded(data)})
          .then((resObj) => resObj.json()).then((responseContent) => {
          setRunStatus(true);
          dispatch(cmActionCreator.updateOutput(id, {...cmOutput, ...responseContent}));
        }).catch(() => null);
      }}
    />
  );
}
