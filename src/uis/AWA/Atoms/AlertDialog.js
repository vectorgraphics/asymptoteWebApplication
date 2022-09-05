import { makeStyles } from '@material-ui/core/styles';
import { merge } from "lodash";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const basicStyle = (theme) => ({
  wrapper: {},
  dialog: {
    boxShadow: theme.shadows[5],
    backgroundColor: theme.palette.background.dialog,
  },
  dialogTitle: {
    color: theme.palette.text.active,
  },
  dialogContentText: {
    color: theme.palette.text.primaryContrast,
  },
  btn: {
    color: theme.palette.text.primaryContrast,
  },
})

const useStyle = makeStyles((theme) => ({
  wrapper:            (finalStyle) => merge(basicStyle(theme), finalStyle).wrapper,
  dialog:             (finalStyle) => merge(basicStyle(theme), finalStyle).dialog,
  dialogTitle:        (finalStyle) => merge(basicStyle(theme), finalStyle).dialogTitle,
  dialogContentText:  (finalStyle) => merge(basicStyle(theme), finalStyle).dialogContentText,
  btn:                (finalStyle) => merge(basicStyle(theme), finalStyle).btn,
}))

export function AlertDialog({finalStyle={}, isOpen, onClose=() => {}, onAccept=() => {}, dialogText="", ...props}) {
  const locClasses = useStyle(finalStyle);
  return (
    <div className={locClasses.wrapper}>
      <Dialog classes={{paper: locClasses.dialog}} open={isOpen} onClose={(event, reason) => (reason !== 'backdropClick')? onClose(): null}>
        <DialogTitle classes={{root: locClasses.dialogTitle}}>{"Warning"}</DialogTitle>
        <DialogContent>
          <DialogContentText classes={{root: locClasses.dialogContentText}}>
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className={locClasses.btn} onClick={onClose}> Cancel </Button>
          <Button className={locClasses.btn} autoFocus onClick={() => {
            onClose();
            setTimeout(() => onAccept(), 200);
          }}> Ok </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
