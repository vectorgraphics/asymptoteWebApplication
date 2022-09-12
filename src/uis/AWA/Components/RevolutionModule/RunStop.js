import { useSelector, useDispatch } from "react-redux";
import { UCIDSelector, idSelector, wsNameSelector, rmInputSelector} from "../../../../store/selectors.js";
import { useTheme } from "@material-ui/core/styles";
import { fetchOptionObj, toUrlEncoded } from '../../../../utils/appTools.js';
import { rmActionCreator } from "../../../../store/revolutionModule";
import { RunStopShell } from "../../Atoms/RunStopShell.js";
import { isEqual } from "lodash";

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

export const RunStop = ({inputValues={}, setPreviewState=()=>{}, ...props}) => {
  const UCID = useSelector(UCIDSelector);
  const id = useSelector(idSelector);
  const wsName = useSelector(wsNameSelector);
  const rmInput = useSelector(rmInputSelector);
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <RunStopShell
      finalStyle={basicStyle(theme)}
      onRun={(event, setRunStatus, controller) => {
        const {parentModule, output, ...dataModelInputs} = rmInput;
        if (!isEqual(inputValues, dataModelInputs)) {
          console.log("they are not equal.");
          setRunStatus(false);
          dispatch(rmActionCreator.setInputs(id, inputValues));
          const data = {
            reqType: "compile",
            UCID: UCID,
            workspaceId: id,
            workspaceName: wsName,
            parentModule: "RM",
            currentCode: "",
            argv: toUrlEncoded(inputValues),
            outFormat: "html",
          };
          fetch('/', {...fetchOptionObj.postUrlEncode, signal: controller.signal, body: toUrlEncoded(data)})
            .then((resObj) => resObj.json()).then((response) => {
            setRunStatus(true);
            dispatch(rmActionCreator.updateOutput(id, response));
            setPreviewState(true);
          }).catch(() => null);
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
