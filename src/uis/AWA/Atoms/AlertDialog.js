import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyle = makeStyles((theme) => ({
  dialogRoot: {
    boxShadow: theme.shadows[5],
  },
  dialogTitleRoot: {
    color: theme.palette.text.textActivated,
  },
  dialogContentTextRoot: {
    color: "black",
  }
}))

export function AlertDialog({isOpen, closeDialog, OKAction, dialogText="", ...props}) {
  const locClasses = useStyle();
  return (
    <div>
      <Dialog classes={{paper: locClasses.dialogRoot}} open={isOpen} onClose={closeDialog}>
        <DialogTitle classes={{root: locClasses.dialogTitleRoot}}>{"Warning"}</DialogTitle>
        <DialogContent>
          <DialogContentText classes={{root: locClasses.dialogContentTextRoot}}>
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={closeDialog}> Cancel </Button>
          <Button color="primary" autoFocus onClick={() => {
            closeDialog();
            setTimeout(() => OKAction(), 200);
          }}> Ok </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
