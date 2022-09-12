import { Fragment, useState, useEffect, useRef } from "react";
import { makeStyles, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@material-ui/core";
import { EraserSVG } from "../../../../../assets/svgs/appWideSvgs.js";

const useStyle = makeStyles((theme) => ({
  leftSection: {
    position: "relative",
    display: "grid",
    alignItems: "center",
    gridColumn: "1/2",
  },
  iconBtn: {
    width: "2rem",
    height: "2rem",
  },
  erase: {
    border: "1px solid black",
  },
  rightSection: {
    display: "grid",
    gridColumn: "2/3",
    alignItems: "center",
    justifyContent: "end",
    gridTemplateRows: "1fr",
  },
  btn: {
    gridRow: "1/2",
    marginLeft: "1.5rem",
    minWidth: "6rem",
    maxWidth: "6rem",
    minHeight: "2rem",
    maxHeight: "2rem",
    borderRadius: "2px",
  },
}));

export const TabControls = ({
  className="", selectionList=[], assignedNames=[], editState=false, onAdd=() => {}, onSave=() => {},
  onDiscard=() => {}, onRemove=() => {}, onCopy=() => {}, onErase=() => {}, ...props
}) => {
  const locClasses = useStyle();
  const [openDialogState, setOpenDialogState] = useState(false);

  return (
    <div className={className}>
      <div className={locClasses.leftSection}>
        <IconButton classes={{sizeSmall: locClasses.iconBtn}} size="small" onClick={onErase}> <EraserSVG/> </IconButton>
      </div>
      <div className={locClasses.rightSection}>
        {
          (editState)
            ? <Fragment>
                <Button classes={{root: locClasses.btn}}> Save onClick={onSave} </Button>
                <Button classes={{root: locClasses.btn}}> Discard onClick={onDiscard} </Button>
              </Fragment>
            : <Fragment>
                <Button className={locClasses.btn} disabled={selectionList.length > 0} onClick={onAdd}> add </Button>
                <Button className={locClasses.btn} disabled={selectionList.length === 0} onClick={onRemove}> remove </Button>
                <Button className={locClasses.btn} disabled={!(selectionList.length === 1)} onClick={() => setOpenDialogState(true)}> copy </Button>
              </Fragment>
        }
      </div>
      <CopyDialog
        open={openDialogState} selectionList={selectionList} assignedNames={assignedNames}
        onClose={() => setOpenDialogState(false)} onSave={onCopy}
      />
    </div>
  );
};


// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Internal Component
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const useDialogStyle = makeStyles((theme) => ({
  dialog: {
    minWidth: "25rem",
    backgroundColor: theme.palette.background.ModulePanel,
  },
  dialogTitle: {
    color: theme.palette.text.DialogTitle,
  },
  textColor: {
    color: theme.palette.text.DialogContent,
  },
  inputClass: {
    color: theme.palette.text.InputContent,
    "& label": {
      color: `${theme.palette.text.InputLabel} !important`,
    },
    "& div": {
      "&::before": {
        borderBottom: `1px solid ${theme.palette.outline.Border} !important`,
      },
      "&::after": {
        borderBottom: `2px solid ${theme.palette.outline.Border} !important`,
      },
    },
    "& input": {
      fontWeight: "100 !important",
      color: theme.palette.text.InputContent,
    },
    "& p": {
      // color: theme.palette.background.ModulePanel,
      minHeight: "1.245rem",
    }
  },
  inputClassErr: {
    color: "red",
    "& label": {
      color: `${theme.palette.text.ErrorLabel} !important`,
    },
    "& div": {
      "&::before": {
        borderBottom: `2px solid ${theme.palette.outline.ErrorBorder} !important`,
      },
      "&::after": {
        borderBottom: `2px solid ${theme.palette.outline.ErrorBorder} !important`,
      },
    },
    "& input": {
      fontWeight: "100 !important",
      color: "red",
    },
  },
}));


export const CopyDialog = ({
  open=false, onClose=() => {}, onSave=() => {}, selectionList=[], assignedNames=[], ...props
}) => {
  const locClasses = useDialogStyle();
  const [newName, setNewName] = useState("");
  const [newNameErr, setNewNameErr] = useState(false);
  const textFieldRef = useRef(null);

  useEffect(() => setNewName(`${selectionList[0]}_copy`), [selectionList]);

  return (
    <div>
      <Dialog classes={{paper: locClasses.dialog}} open={open} onClose={(event, reason) => (reason !== 'backdropClick')? onClose(): null}>
        <DialogTitle classes={{root: locClasses.dialogTitle}}> Select a unique name </DialogTitle>
        <DialogContent>
          <TextField
            classes={{root: locClasses.inputClass}} label="Name" ref={textFieldRef}
            type="text" autoFocus fullWidth value={newName} error={newNameErr} helperText={(newNameErr)? "The name is not available": " "}
            onChange={(event) => setNewName(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button classes={{text: locClasses.textColor}} onClick={() => {
            if (assignedNames.indexOf(newName) === -1) {
              onClose();
              onSave(newName);
              setNewNameErr(false);
              if (textFieldRef.current.classList.contains(locClasses.inputClassErr)) {
                textFieldRef.current.classList.remove(locClasses.inputClassErr);
              }
            } else {
              setNewNameErr(true);
              if (textFieldRef.current.classList.contains(locClasses.inputClass)) {
                textFieldRef.current.classList.remove(locClasses.inputClass);
                textFieldRef.current.classList.add(locClasses.inputClassErr);
              }
            }
          }}
          > Save </Button>
          <Button
            classes={{text: locClasses.textColor}}
            onClick={() => {
              setNewNameErr(false);
              onClose();
            }}
          > Cancel </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

