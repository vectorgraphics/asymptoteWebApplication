import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { LineNumberIcon } from "../../../../assets/icons/AppIcons.jsx";
import { setLineNumber, selectLineNumber } from "../../../../state/slices/editorSettingsSlice.js";

export const LineNumber = () => {
  const lineNumber = useState(useSelector(selectLineNumber))
  const ifLineNumberOnStorage = localStorage.getItem("lineNumber") || lineNumber;
  const lineNumberOnStorage = ifLineNumberOnStorage === "false"? false: true;
  const dispatch = useDispatch();
  const toggleLineNumber = () => {
    dispatch(setLineNumber(!lineNumberOnStorage));
    localStorage.setItem("lineNumber", !lineNumberOnStorage)
  }
  
  useEffect(() => dispatch(setLineNumber(lineNumberOnStorage)), []);

  return (
    <Box 
      aria-label="line numbers option"
      sx={{
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "center",
        alignItems: "center",
        width: "2rem",
        height: "2rem",
        bgcolor: (lineNumberOnStorage)? "background.contrast": "rgba(255,255,255,0.15)",
        border: "1px solid black",
        borderRadius: "4px",
        "&:hover": {
          bgcolor: "btnHover",
          transition: "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
          cursor: "pointer",
      }}
      onClick={toggleLineNumber}
    >
      <LineNumberIcon
        sx={{
          color: (lineNumberOnStorage)? "black" : "text.secondary",
        }}
      />
    </Box>
  );
};



  // const [lineNumber, shouldLineNumber] = useState(useSelector(selectLineNumber))
  // let ifLineNumberOnStorage = localStorage.getItem("lineNumber") || lineNumber;
  // const lineNumberOnStorage = ifLineNumberOnStorage === "false"? false: true;
  // const dispatch = useDispatch();
  // const toggleLineNumber = () => {
  //   shouldLineNumber(!lineNumber)
  //   dispatch(setLineNumber(!lineNumber));
  //   localStorage.setItem("lineNumber", !lineNumber)
  // }
  
  // useEffect(() => {
  //   dispatch(setLineNumber(lineNumberOnStorage));
  //   shouldLineNumber(lineNumberOnStorage);
  // }, []);