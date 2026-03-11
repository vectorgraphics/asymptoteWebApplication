import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { StackContainer } from "../../../components/StackContainer.jsx";
import { ResizableContainers } from "../../../components/ResizableContainers.jsx";
import { Terminal } from "./Terminal.jsx";
import { ActionBar } from "../ActionBar.jsx";
import { CodeContainer } from "./CodeContainer.jsx";
import { LineNumber } from "./LineNumber.jsx";
import { KeyBindings } from "./KeyBindings.jsx";
import { FontSize } from "./FontSize.jsx";
import { selectOutput } from "../../../../state/slices/outputsSlice.js";

export const Editor = ({codeInEditor=""}) => {
  const [showTerminal, setShowTerminal] = useState(false);
  const [showBody, setShowBody] = useState(true);
  const output = useSelector(selectOutput);
  const {serverResponse: {error, stdObj}} = output;
  const isError = (error && error.errText) || (stdObj && stdObj.stderr !== "");
  const isConsole = (stdObj && stdObj.stdout !== "");

  const pressShortcut = (event) => {
    if (event.ctrlKey && event.key === "`") {
      setShowTerminal(true);
    }
    return;
  }

  useEffect(() => {
  if (isError || isConsole) {
    setShowTerminal(true);
  } else {
    setShowTerminal(false);
  }
  }, [isError, isConsole])
  

  return (
    <StackContainer sx={{maxHeight: {mobile: "calc(100vh - 5.5rem)", tablet: "calc(100vh - 2.5rem)"}}} direction="column">
      <ActionBar sx={{mb: "0.5rem", justifyContent: "flex-start"}}>
      <LineNumber/>
      <FontSize/>
      <KeyBindings/>
    </ActionBar>
      <ResizableContainers direction="column" ratio={[5, (showBody) ? 1 : 0]}>
        {() => <CodeContainer codeInEditor={codeInEditor} onKeyDown={pressShortcut} />}
        {showTerminal && (() => <Terminal setShowTerminal={setShowTerminal} showBody={showBody} setShowBody={setShowBody}/>)}
      </ResizableContainers>
    </StackContainer>
  );
};


      // <Box
      //   sx={{
      //     display: "flex",
      //     flexFlow: "row nowrap",
      //     maxHeight: "2rem",
      //     alignItems: "center",
      //     border: "1px solid white",
      //     borderRadius: "4px"
      //   }}>
      //   <FontSizeIcon />
      //   <MenuItem>test</MenuItem>
      // </Box>