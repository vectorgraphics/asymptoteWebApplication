import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyle = makeStyles((theme) => ({
  root: {
    boxShadow: theme.shadows[5],
  },
}))

export function AlertDialog({isOpen, closeDialog}) {
  const classes = useStyle();
  return (
    <div>
      <Dialog classes={{paper: classes.root}} open={isOpen} onClose={closeDialog}>
        <DialogTitle id="alert-dialog-title">{"Attention"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By deleting the workspace, you will lose access to your work on the server!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={closeDialog} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


// <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//   Open alert dialog
// </Button>
