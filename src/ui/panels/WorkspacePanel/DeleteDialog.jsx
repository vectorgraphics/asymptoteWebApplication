import { Button } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { WarningIcon } from "../../../assets/icons/AppIcons.jsx";
import { AWADialog } from "../../components/StyledComponents.jsx";

export const DeleteDialog = ({isDialogOpen=false, onClose=null, onDelete=()=>{}}) => {

  return (
    <AWADialog isOpen={isDialogOpen} onClose={onClose}>
      {/* <DialogTitle>Delete</DialogTitle> */}
      <DialogContent sx={{display: "flex", justifyContent: "flex-start", marginTop: "1.5rem"}}>
        <WarningIcon sx={{fontSize: "3.5rem", marginRight: "1rem", color: "yellow"}}/>
        <DialogContentText sx={{display: "block", marginTop: "0.25rem", color: "text.primary"}}>
          You are deleting the workspace. Do you want to continue?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDelete}> Delete </Button>
        <Button onClick={onClose}> Cancel </Button>
      </DialogActions>
    </AWADialog>
  );
};
