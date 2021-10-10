import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UCISelector, idSelector, wsNameSelector,
  codeContentSelector, cmOutputSelector, cmInputSelector
} from "../../../../../../store/selectors";
import { fetchOptionObj, codeFormatter, toUrlEncoded } from '../../../../../../utils/generalTools';
import { cmActionCreator } from "../../../../../../store/workspaces";
import { Btn } from "../../../../Atoms/Btn";
import { makeStyles } from "@material-ui/core/styles";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from '@material-ui/icons/Stop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {  } from "crypto-js/sha256";


const useStyle = makeStyles((theme) => ({
  btn: {
    margin: "0 0.5rem",
  },
  runBtnIcon: {
    color: theme.palette.icon.Run,
  },
  stopBtnIcon: {
    color: theme.palette.icon.Stop,
  },
  progress: {
    minWidth: "1.25rem",
    maxWidth: "1.25rem",
    minHeight: "1.25rem",
    maxHeight: "1.25rem",
    marginLeft: "0.5rem",
  }
}));

export function Run(props) {
  const locClasses = useStyle(props);
  const [runStatus, setRunStatus] = useState(true);
  const UCI = useSelector(UCISelector);
  const id = useSelector(idSelector);
  const name = useSelector(wsNameSelector);
  const cmInput = useSelector(cmInputSelector);
  const cmOutput = useSelector(cmOutputSelector);
  const codeContent = useSelector(codeContentSelector);
  const dispatch = useDispatch();
  let controller = null;

  return (
    (runStatus)?
    <Btn
      className={locClasses.btn}
      minWidth="6rem"
      maxWidth="6rem"
      startIcon={<PlayArrowIcon className={locClasses.runBtnIcon}/>}
      onClick={(event) => {
        setRunStatus(false);
        const data = {
          reqType: (cmInput.outformat = "prev")? "run": "download",
          UCI: UCI,
          workspaceId: id,
          workspaceName: name,
          codeContent: codeFormatter(codeContent),
          outformat: (cmInput.outformat === "prev")? "html": cmInput.outformat,
        };
        controller = new AbortController();
        fetch('/', {...fetchOptionObj.postUrlEncode, signal: controller.signal, body: toUrlEncoded(data)})
          .then((resObj) => resObj.json()).then((responseContent) => {
          dispatch(cmActionCreator.updateOutput(id, {...cmOutput, ...responseContent}));
        }).catch(() => null);
      }}
    >
      Run
    </Btn>:
    <Btn
      className={locClasses.btn}
      minWidth="6rem"
      maxWidth="6rem"
      startIcon={<StopIcon className={locClasses.stopBtnIcon}/>}
      onClick={(event) => {
        controller.abort();
        setRunStatus(true);
      }}
    >
      Stop
      <CircularProgress className={locClasses.progress}/>
    </Btn>
  );
}
