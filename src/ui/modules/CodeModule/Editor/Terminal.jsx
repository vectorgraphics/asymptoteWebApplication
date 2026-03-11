import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { GridRow } from "../../../components/GridElements.jsx";
import { StackContainer } from "../../../components/StackContainer.jsx";
import { Minimize, Maximize, Close } from "../../../../assets/icons/AppIcons.jsx";
import { selectOutput } from "../../../../state/slices/outputsSlice.js";


const headerCSS = {
  minHeight: "2rem",
  mb: "0.5rem",
  pr: "0.25rem",
  justifyContent: "flex-end",
  alignItems: "center",
  bgcolor: "background.light",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: "text.secondary",
};

const iconCSS = (element) => {
  let color = "";
  switch (element) {
    case "min":
      color = "orange";
      break;
    case "max":
      color = "green";
      break;
    default:
      color = "extraColors.pureRed";
      break;
  }
  return {
    mr: "0.25rem",
    "&:hover": {
      color: color,
    }
  }
}

export const Terminal = ({setShowTerminal = null, showBody = true, setShowBody = null}) => {
  const output = useSelector(selectOutput);
  const {serverResponse: {error, stdObj}} = output;
  const isError = (error && error.errText) || false;
  const isStdError = (stdObj && stdObj.stderr !== "") || false;
  const isConsole = (stdObj && stdObj.stdout !== "") || false;
  
  return (
    <StackContainer direction="column" >
      <GridRow sx={headerCSS}>
        <Box sx={{paddingLeft: "0.5rem", marginRight: "auto"}}> Console </Box>
        <Minimize sx={iconCSS("min")} onClick={() => setShowBody(false)} />
        <Maximize sx={iconCSS("max")} onClick={() => setShowBody(true)} />
        <Close sx={iconCSS} onClick={() => setShowTerminal(false)} />
      </GridRow>
      {
        showBody &&
        <Box sx={{padding: "0.5rem", overflow: "auto"}}>
          {isConsole && <Box sx={{color: "whitesmoke", whiteSpace: "pre-wrap"}}> {stdObj.stdout} </Box>}
          <Box>
            {isError && <Box sx={{fontSize: "1rem", color: "red"}}> {`Error: ${error.errText}`} </Box>}
            {isStdError && <Box sx={{fontSize: "1rem", color: "extraColors.semiRed"}}> {`Error: ${stdObj.stderr}`} </Box>}
          </Box>
        </Box>
      }
    </StackContainer>
  );
};
