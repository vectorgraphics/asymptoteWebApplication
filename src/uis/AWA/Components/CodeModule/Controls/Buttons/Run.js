import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UCIDSelector, idSelector, wsNameSelector, cmInputSelector, cmOutputSelector } from "../../../../../../store/selectors";
import { fetchOptionObj, codeFormatter, toUrlEncoded } from '../../../../../../utils/appTools';
import { cmActionCreator } from "../../../../../../store/codeModule";
import { Btn } from "../../../../Atoms/Btn";
import { makeStyles } from "@material-ui/core/styles";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from '@material-ui/icons/Stop';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyle = makeStyles((theme) => ({
  btn: {
    margin: "0 0.5rem",
  },
  span: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
  },
  runIcon: {
    marginLeft: "-0.5rem",
    marginRight: "0.25rem",
    color: theme.palette.icon.Run,
  },
  stopIcon: {
    color: theme.palette.icon.Stop,
  },
  progressIcon: {
    minWidth: "1.25rem",
    maxWidth: "1.25rem",
    minHeight: "1.25rem",
    maxHeight: "1.25rem",
    marginLeft: "0.5rem",
  }
}));

let controller = "";

export function Run(props) {
  const locClasses = useStyle(props);
  const [runStatus, setRunStatus] = useState(true);
  const UCID = useSelector(UCIDSelector);
  const id = useSelector(idSelector);
  const name = useSelector(wsNameSelector);
  const cmInput = useSelector(cmInputSelector);
  const cmOutput = useSelector(cmOutputSelector);
  const codeContent = cmInput.codeContent;
  const dispatch = useDispatch();

  return (
    (runStatus)?
    <Btn
      className={locClasses.btn} minWidth="6rem" maxWidth="6rem"
      onClick={(event) => {
        setRunStatus(false);
        const data = {
          reqType: (cmInput.outformat === "prev")? "run": "download",
          UCID: UCID,
          workspaceId: id,
          workspaceName: name,
          codeContent: codeFormatter(codeContent),
          outformat: cmInput.outformat,
          isUpdated: cmOutput.isUpdated,
        };
        controller = new AbortController();
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
                    link.setAttribute("download", name.toString());
                    link.click();
                }).catch((err) => {});
              }
            }
          ).catch((err) => {});
        }
      }}
    >
      <span className={locClasses.span}> <PlayArrowIcon className={locClasses.runIcon}/> Run </span>
    </Btn>:
    <Btn
      className={locClasses.btn} minWidth="6rem" maxWidth="6rem"
      onClick={(event) => {
        controller.abort();
        setRunStatus(true);
      }}
    >
      <span className={locClasses.span}>
        <StopIcon className={locClasses.stopIcon}/>
        Stop
        <CircularProgress className={locClasses.progressIcon}/>
      </span>
    </Btn>
  );
}
