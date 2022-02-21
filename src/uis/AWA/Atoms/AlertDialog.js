import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyle = makeStyles((theme) => ({
  dialog: {
    boxShadow: theme.shadows[5],
    backgroundColor: theme.palette.background.DialogContent,
  },
  dialogTitle: {
    color: theme.palette.text.Activated,
  },
  dialogContentText: {
    color: theme.palette.text.DialogContent,
  },
  btn: {
    color: theme.palette.text.Buttons
  }
}))

export function AlertDialog({className={}, isOpen, onClose=() => {}, onAccept=() => {}, dialogText="", ...props}) {
  const locClasses = useStyle();
  return (
    <div className={className}>
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
