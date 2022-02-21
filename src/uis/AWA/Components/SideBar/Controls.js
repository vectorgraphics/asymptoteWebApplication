import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SettingsPanel } from "../Settings/SettingsPanel";

import SettingsIcon from "@material-ui/icons/Settings";
import HomeIcon from "@material-ui/icons/Home";

const useStyle = makeStyles((theme) => ({
  controlTabsCont: {
    display: "block",
    margin: "0 auto",
    marginBottom: "100%",
    // border: "1px solid white",
  },
  controlBtn: {
    display: "block",
    minHeight: "4rem",
    color: theme.palette.icon.SideBarControls,
    "&:hover": {
      color: theme.palette.icon.SideBarControlsHover,
    },
  },
  link: {
    color: theme.palette.icon.SideBarControls,
    "&:hover": {
      color: "inherit",
    }
  }
}));

export function Controls(props) {
  const locClasses = useStyle();
  const [panelState, setPanelState] = useState(false);

  return (
    <div className={locClasses.controlTabsCont}>
      <div className={locClasses.controlBtn} onClick={() => setPanelState(!panelState)}>
        <SettingsIcon/>
      </div>
      <div className={locClasses.controlBtn}>
        <a className={locClasses.link} href={"https://asymptote.sourceforge.io/"} target="_blank" rel="noreferrer">
          <HomeIcon />
        </a>
      </div>
      <SettingsPanel isOpen={panelState} onClose={() => setPanelState(!panelState)}/>
    </div>
  );
}
