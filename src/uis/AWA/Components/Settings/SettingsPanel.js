import {makeStyles, Dialog, DialogContent, Button, DialogActions, IconButton} from '@material-ui/core';
import { VerticalTabbing } from "./VerticalTabbing";
import { ThemeTab } from "./Tabs/ThemeTab";
import { AboutTab } from "./Tabs/AboutTab";
import { scrollbarStyler } from "../../../../utils/appTools.js";
import CancelIcon from "@material-ui/icons/Cancel";

const usePanelStyle = makeStyles((theme) => ({
  dialog: {
    minWidth: "38rem",
    maxWidth: "38rem",
    minHeight: "25rem",
    maxHeight: "28rem",
    boxShadow: theme.shadows[5],
    backgroundColor: theme.palette.background.dialog,
    overflow: "hidden",
  },
  dialogContent: {
    minWidth: "38rem",
    padding: 0,
    margin: 0,
    marginBottom: "0.5rem",
    "&:first-child": {
      padding: 0,
    },
    ...scrollbarStyler(),
  },
  panelTitle: {
    position: "relative",
    minWidth: "100%",
    minHeight: "1.75rem",
    maxHeight: "1.75rem",
    margin: "0 auto",
    marginBottom: "2rem",
    textAlign: "center",
    lineHeight: "1.75rem",
    color: theme.palette.text.awaPrimaryContrast,          // must be adjusted upon use
    backgroundColor: "grey",                               // must be adjusted upon use
  },
  iconBtn: {
    position: "absolute",
    top: 0,
    left: "calc(100% - 1.75rem)",
    minWidth: "1.75rem",
    maxWidth: "1.75rem",
    minHeight: "1.75rem",
    maxHeight: "1.75rem",
  },
  closeIcon: {
    fontSize: "1.5rem",
    color: theme.palette.common.lightgrey,
    "&:hover": {
      color: "red",
    }
  },
  btn: {
    color: theme.palette.text.buttons,
  }
}))

export const SettingsPanel = ({isOpen, onClose=() => {}, onApply=() => {}, ...props}) => {
  const locClasses = usePanelStyle();
  return (
    <Dialog
      classes={{paper: locClasses.dialog}} open={isOpen}
      onClose={(event, reason) => (reason !== 'backdropClick')? onClose(): null}
    >
      <div className={locClasses.panelTitle}>
        <div className={locClasses.title}>{"Settings"}</div>
        <IconButton className={locClasses.iconBtn} onClick={onClose}>
          <CancelIcon className={locClasses.closeIcon}/>
        </IconButton>
      </div>
      <DialogContent classes={{root: locClasses.dialogContent}}>
        <VerticalTabbing tabLabels={["Theme", "About"]} tabComponents={[<ThemeTab/>, <AboutTab/>]}/>
      </DialogContent>
      {/*<DialogActions>*/}
      {/*  <Button className={locClasses.btn} variant="outlined" onClick={onClose}> Cancel </Button>*/}
      {/*  <Button className={locClasses.btn} autoFocus onClick={onApply}> Apply </Button>*/}
      {/*</DialogActions>*/}
    </Dialog>
  );
};
