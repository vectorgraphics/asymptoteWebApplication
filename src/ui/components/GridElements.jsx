import { Grid } from "@mui/material";

const GridBaseCSS = {
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignItems: "stretch",
};

export const GridRow = ({sx={}, children, direction="row", ...props}) => {
  return (
    <Grid sx={{...GridBaseCSS, ...sx}} container direction={direction} {...props}>
      {(typeof children === "function")? children(): children}
    </Grid>
  )
};

export const GridColumn = ({sx={}, children, direction="column", ...props}) => {
  return (
    <Grid sx={{...GridBaseCSS, ...sx}} container direction={direction} {...props}>
      {(typeof children === "function")? children(): children}
    </Grid>
  )
};
