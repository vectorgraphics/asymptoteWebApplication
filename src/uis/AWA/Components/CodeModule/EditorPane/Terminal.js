import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { cmOutputSelector } from "../../../../../store/selectors";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { PanelCtrlBar } from "../../../Atoms/PanelCtrlBar.js";

import IconButton from '@material-ui/core/IconButton';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const useStyle = makeStyles((theme) => ({
  terminalCont: {
    display: "flex",
    flexFlow: "column nowrap",
    flex: "1 1 10rem",
    maxHeight: "15rem",
  },
  terminalBody: {
    flex: "1 1 auto",
    padding: "0.5rem",
    color: "whitesmoke",
    fontSize: "0.875rem",
    fontWeight: "100",
    backgroundColor: "#282C34",
  }
}));

export function Terminal({errorContent="", cmOutPut={}, closeTerminal=() => {}, ...props}) {
  const locClasses = useStyle();
  const [bodyState, setBodyState] = useState(false);
  const outPut = useSelector(cmOutputSelector);
  const theme = useTheme();

  // useEffect(() => {
  //   if (cmOutPut !== outPut) {
  //     setBodyState(true);
  //   }
  // }, [outPut]);

  return (
    (bodyState && (errorContent !== ""))?
    <div className={locClasses.terminalCont}>
      <PanelCtrlBar
        backgroundColor={theme.palette.background.headerType2}
        // titleBarComponent={<div style={{marginLeft: "0.5rem"}}> Terminal </div>}
        // onMin={}
        // onMax={}
        onClose={(event) => setBodyState(false)}
      />
      <div className={locClasses.terminalBody}> {errorContent} </div>
    </div>:
    null
  );
}


