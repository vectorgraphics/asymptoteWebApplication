import { Fragment, useState, useEffect, useRef } from "react";
import { makeStyles, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@material-ui/core";
import { Btn } from "../../../Atoms/Btn";

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
  btns: {
    marginLeft: "1.5rem",
    minWidth: "6rem",
    maxWidth: "6rem",
    minHeight: "2rem",
    maxHeight: "2rem",
    gridRow: "1/2",
    borderRadius: "2px",
  },
}));

export function TabControls(
  {
    className={}, selectionList=[], assignedNames=[], editState=false, onAdd=() => {}, onSave=() => {},
    onDiscard=() => {}, onRemove=() => {}, onCopy=() => {}, onErase=() => {}, ...props
  }) {
  const locClasses = useStyle();
  const [openDialogState, setOpenDialogState] = useState(false);

  return (
    <div className={className}>
      <div className={locClasses.leftSection}>
        <IconButton classes={{sizeSmall: locClasses.iconBtn}} size="small" onClick={onErase}> <EraseBtn/> </IconButton>
      </div>
      <div className={locClasses.rightSection}>
        {
          (editState)
            ? <Fragment>
                <Btn className={locClasses.btns} onClick={onSave}> save </Btn>
                <Btn className={locClasses.btns} onClick={onDiscard}> discard </Btn>
              </Fragment>
            : <Fragment>
                <Btn className={locClasses.btns} disabled={selectionList.length > 0} onClick={onAdd}> add </Btn>
                <Btn className={locClasses.btns} disabled={selectionList.length === 0} onClick={onRemove}> remove </Btn>
                <Btn className={locClasses.btns} disabled={!(selectionList.length === 1)} onClick={() => setOpenDialogState(true)}> copy </Btn>
              </Fragment>
        }
      </div>
      <CopyDialog
        open={openDialogState} selectionList={selectionList} assignedNames={assignedNames}
        onClose={() => setOpenDialogState(false)} onSave={onCopy}
      />
    </div>
  );
}


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


export function CopyDialog({open=false, onClose=() => {}, onSave=() => {}, selectionList=[], assignedNames=[], ...props}) {
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
}


function EraseBtn({className={}, ...props}) {
  return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="#606164" width="1.5rem" height="1.5rem" viewBox="0 0 512 512">
        <path d="M497.941 273.941c18.745-18.745 18.745-49.137 0-67.882l-160-160c-18.745-18.745-49.136-18.746-67.883
         0l-256 256c-18.745 18.745-18.745 49.137 0 67.882l96 96A48.004 48.004 0 0 0 144 480h356c6.627 0 12-5.373
         12-12v-40c0-6.627-5.373-12-12-12H355.883l142.058-142.059zm-302.627-62.627l137.373 137.373L265.373
         416H150.628l-80-80 124.686-124.686z"
        />
      </svg>
  );
}
