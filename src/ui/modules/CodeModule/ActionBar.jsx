import { GridRow } from "../../components/GridElements.jsx";

const CtrlBarCSS = {
  minHeight: "2.5rem",
  maxHeigh: "2.5rem",
  width: 1,
  padding: "0.35rem 0.5rem",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundColor: "background.light",
  borderBottom: "1px solid grey",
}

export const ActionBar = ({sx={}, children}) => {
  return (    
    <GridRow sx={{...CtrlBarCSS, ...sx}} spacing="0.5rem"> { children } </GridRow>
  )
}
