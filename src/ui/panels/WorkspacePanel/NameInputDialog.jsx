import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Button } from "@mui/material";
import { AWADialog } from "../../components/StyledComponents.jsx";
import { isValidIdentifier } from "../../../utils/validators.js";
import { createWS, renameWS } from "../../../state/slices/workspacesSlice.js";
import { selectWsIdsAndNames } from "../../../state/slices/workspacesInfoSlice.js";
import { nanoid } from "nanoid";

export const NameInputDialog = ({selectionText=null, isDialogOpen=false, onClose=null}) => {
  const [identifier, setIdentifier] = useState("");
  const [errorText, setErrorText] = useState(null);
  const inputElementRef = useRef();
  const inUseNames = Object.values(useSelector(selectWsIdsAndNames));
  const dispatch = useDispatch();

  useEffect(() => {
    queueMicrotask(() => {
      if (selectionText) {
        inputElementRef.current.value = selectionText;
        putCursorAtEnd(inputElementRef.current)
      }
    })
  }, [])


  const onChange = (event) => {
    let currentIdentifier = event.target.value;
    setIdentifier(currentIdentifier);
    if (!isValidIdentifier(currentIdentifier) && currentIdentifier.length !== 0) {
      setErrorText("Invalid Name!"); 
    } else if (inUseNames.includes(currentIdentifier)) {
      setErrorText("The identifier is already used!");
    } else {
      setErrorText("");
    };
  };

  const create = () => {
    if (identifier.length !== 0) {
      dispatch(createWS({id: nanoid(5), name: identifier}));
      onClose();
    } else {
      setErrorText("Workspace cannot be assigned an empty name!");
    }
  }
  
  const rename = () => {
    if (identifier.length !== 0) {
      dispatch(renameWS(identifier));
      onClose();
    } else {
      setErrorText("Workspace cannot be assigned an empty name!");
    }    
  }

  const onOk = (event) => {
    if ((event.type === "click" || event.key === "Enter") && errorText.length === 0) {
      (selectionText !== null)? rename(): create();
    }
    return;
  };  

  return (
    <AWADialog isOpen={isDialogOpen} onClose={onClose}>
       {/* <DialogTitle sx={sxs.title}></DialogTitle> */}
      <DialogContent>
        <DialogContentText> Enter a Unique Workspace Name </DialogContentText>
        <TextField
          inputRef={inputElementRef}
          sx={{mt: "2rem"}}
          error={errorText?.length > 0}
          helperText={errorText}
          autoFocus
          margin="dense"
          id={"Workspace_NameField"}
          name={`ws-textField`}
          label={"Workspace Name"}
          type="text"
          variant="standard"
          fullWidth
          onChange={onChange}
          onKeyDown={onOk}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onOk}> Ok </Button>
        <Button onClick={onClose}> Cancel </Button>
      </DialogActions>
    </AWADialog>
  );
};


const putCursorAtEnd = (inputElement) => {
  const length = inputElement.value.length;
  inputElement.focus();
  inputElement.setSelectionRange(0, length);
}