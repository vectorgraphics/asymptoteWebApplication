import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { cmOutputSelector } from "../../../../../store/selectors";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { PanelCtrlBar } from "../../../Atoms/PanelCtrlBar.js";

const useStyle = makeStyles((theme) => ({
  terminalCont: {
    display: "flex",
    flexFlow: "column nowrap",
    flex: "1 1 10rem",
    maxHeight: "15rem",
  },
  terminalBody: {
    flex: "1 1 auto",
    minHeight: "10rem",
    padding: "0.5rem",
    color: theme.palette.text.awaPrimaryContrast,
    fontSize: "0.875rem",
    fontWeight: "100",
    backgroundColor: theme.palette.background.panel,
  }
}));

export const Terminal = ({content="", closeTerminal=() => {}, ...props}) => {
  const locClasses = useStyle();
  const [minimized, setMinimized] = useState(false);
  const [display, setDisplay] = useState(() => content !== "");

  if (display) {
    if (minimized) {
      return (
        <div className={locClasses.terminalCont}>
          <PanelCtrlBar onMin={() => setMinimized(true)} onMax={() => setMinimized(false)} onClose={(event) => setDisplay(false)}/>
        </div>
      );
    } else {
      return (
        <div className={locClasses.terminalCont}>
          <PanelCtrlBar onMin={() => setMinimized(true)} onMax={() => setMinimized(false)} onClose={(event) => setDisplay(false)}/>
          <div className={locClasses.terminalBody}> {content} </div>
        </div>
      );
    }
  } else {
    return null;
  }
};


