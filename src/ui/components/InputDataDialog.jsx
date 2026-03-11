import { useState } from "react";
import { Button, TextField, Dialog, useTheme, useMediaQuery } from "@mui/material";
import { DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const defaultData = {
  title: "Dialog Title",
  contentText: "Dialog Content Text",
  textFieldProps: {
    id: "textFieldID",
    name: "textFieldName",
    label: "textFieldLabel",
    margin: "dense",
    type: "text",
    variant: "standard",
    required: true,
    autoFocus: true,
  },
}

export const InputDataDialog = ({sxs={}, data=null, options={}, isOpen=false, setIsOpen=()=>{}}) => {
  const awaTheme = useTheme();
  const mobile = useMediaQuery(awaTheme.breakpoints.down("mobile"));

  if (data === null) {
    data = defaultData;
  } else if (typeof data !== "object") {
    console.error("data prop has invalid type!");
  }
  const handleClose = () => setIsOpen(false);

  return (
    <Dialog 
      slotProps={{
        paper: {
          sx: {
            ...{
              display: "flex",
              maxWidth: 550,
              width: mobile ? 0.8 : 0.5,
              minHeight: 225,
              flexFlow: "column nowrap",
              justifyContent: "center",
              backgroundImage: "none",
              backgroundColor: "background.light",
            }, ...sxs.dialog
          }
        }
      }}
      open={isOpen} 
      onClose={handleClose}
    >
      <DialogTitle sx={sxs.title}>{data.title}</DialogTitle>
      <DialogContent sx={sxs.content}>
        <DialogContentText sx={sxs.contentText}>
          {data.contentText}
        </DialogContentText>
        <TextField
          sx={sxs.textField}
          autoFocus={data.autoFocus}
          required={data.required}
          margin={data.margin}
          id={data.id}
          name={data.name}
          label={data.label}
          type={data.type}
          variant={data.variant}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button > Ok </Button>
      </DialogActions>
    </Dialog>
  );
};
