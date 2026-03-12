import { styled, Dialog, Button } from "@mui/material";

export const Input = styled(("input"))(({theme}) => ({
  display: "block",
  padding: "0.5rem",
  margin: "0.5rem",
  fontFamily: "Roboto",
  fontSize: "1rem",
  backgroundColor: "transparent",
  outline: "none",
  border: 1,
  borderRadius: "4px",
}));

export const P = styled("p")(({theme}) => ({
  display: "block",
  margin: "0.5rem",
  minHeight: "2.5rem",
  fontFamily: "Roboto",
  fontSize: "1rem",
}));

export const StyledButton = styled(Button)(({theme, ...props}) => {
  return {
    minWidth: "2rem",
    maxWidth: "6rem",
    width: "10%",
    flexGrow: 1,
    padding: 0,
    margin: 0,
    backgroundColor: theme.palette.background.contrast,
    "&:hover": {
      backgroundColor: theme.palette.btnHover,
      transition: "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    }
  }}
)

export const AWADialog = ({children, isOpen=false, onClose=null}) => {
  return (
    <Dialog 
      slotProps={{
        paper: {
          sx: {
            display: "flex",
            maxWidth: 550,
            width: {mobile: 0.8, tablet: 0.5},
            minHeight: 225,
            flexFlow: "column nowrap",
            justifyContent: "center",
            backgroundImage: "none",
            backgroundColor: "background.light",
          }
        }
      }}
      open={isOpen}
      onClose={onClose}
    >
      {children}
    </Dialog>
  );
};

export const Iframe = styled("iframe", {
  shouldForwardProp: (prop) => {
    const propsNotToPass = ["show", "reloadCntr"];
    return !propsNotToPass.includes(prop);
  },
  label: "AWA-Iframe",
  name: "AWA-iframe",
})(({theme, pointerEvents = "none", ...props}) => ({
  display: "block",
  flexGrow: 1,
  margin: 0,
  padding: 0,
  height: "100%",
  border: "none",
  pointerEvents: pointerEvents
}));

