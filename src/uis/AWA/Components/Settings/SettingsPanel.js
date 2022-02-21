import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { BinarySwitch } from "../../Atoms/BinarySwitch";


const useStyle = makeStyles((theme) => ({
  panelCont: {},
  panelTitle: {
    minHeight: "1.5rem",
    maxHeight: "1.5rem",
    margin: "0 auto",
    marginBottom: "2rem",
    textAlign: "center",
    color: "white", // must be adjusted upon use
    backgroundColor: "gray" // must be adjusted upon use
  },
  dialog: {
    boxShadow: theme.shadows[5],
    backgroundColor: theme.palette.background.Dialog,
  },
  dialogContent: {
    minHeight: "20rem",
    padding: 0,
    margin: 0,
    marginBottom: "0.5rem",
    "&:first-child": {
      padding: 0,
    }
  },
  btn: {
    color: theme.palette.text.Buttons
  }
}))

export function SettingsPanel({isOpen, onClose=() => {}, onApply=() => {}, ...props}) {
  const locClasses = useStyle();
  return (
    <div className={locClasses.panelCont}>
      <Dialog classes={{paper: locClasses.dialog}} open={isOpen} onClose={(event, reason) => (reason !== 'backdropClick')? onClose(): null}>
        <DialogContent classes={{root: locClasses.dialogContent}}>
          <div className={locClasses.panelTitle}> {"Settings"} </div>
          <VerticalTabs/>
        </DialogContent>
        <DialogActions>
          <Button className={locClasses.btn} onClick={onClose}> Cancel </Button>
          <Button className={locClasses.btn} autoFocus onClick={onApply}> Apply </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


const useIntStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: "row nowrap",
    flex: "0 1 auto",
    maxWidth: "100%",
    minHeight: "18rem",
    alignItems: "stretch",
    backgroundColor: theme.palette.background.Dialog,
    // border: "1px solid black",
    overflow: "hidden",
  },
  tabPanel: {
    minWidth: "30rem",
    maxWidth: "100%",
    // border: "1px solid red",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

function TabPanel({children, value, index, ...props}) {
  const locClasses = useIntStyles();

  return (
    <div className={locClasses.tabPanel} role="tabpanel" hidden={value !== index} {...props}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

function VerticalTabs() {
  const locClasses = useIntStyles();
  const [value, setValue] = useState(0);

  return (
    <div className={locClasses.root}>
      <Tabs
        className={locClasses.tabs} orientation="vertical" variant="standard" value={value}
        onChange={(event, newValue) => setValue(newValue)}
      >
        <Tab label="Theme" disableFocusRipple={true}/>
        <Tab label="About" disableFocusRipple={true}/>
      </Tabs>
      <TabPanel value={value} index={0}> <BinarySwitch/> </TabPanel>
      <TabPanel value={value} index={1}> About AWA </TabPanel>
    </div>
  );
}