import { useState, useRef } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import { EditorPaneIcon, PreviewPaneIcon } from "../../../assets/icons/AppIcons.jsx";
import { ResizableContainers } from "../../components/ResizableContainers.jsx";
import { UploadBtn } from "./UploadBtn.jsx";
import { CompileBtn } from "./CompileBtn.jsx";
import { DownloadBtn } from "./DownloadBtn.jsx";
import { ActionBar } from "./ActionBar.jsx";
import { Editor } from './Editor/Editor.jsx';
import { Preview } from './Preview/Preview.jsx';
import { StackContainer } from "../../components/StackContainer.jsx";

export const CodeModule = () => {
  const [viewEditorPreview, setViewEditorPreview] = useState(true)
  const awaTheme = useTheme();
  const tablet = useMediaQuery(awaTheme.breakpoints.down("tablet"));
  const codeInEditor = useRef("");

  const iconCSS = {
    ml: "auto",
    py: "2px",
    height: "1.75rem",
    "&:hover": {
      color: "extraColors.pureRed"
    }
  }
  
  return (
    <StackContainer direction="column">
      <ActionBar>
        <UploadBtn/>
        <CompileBtn codeInEditor={codeInEditor} />
        <DownloadBtn codeInEditor={codeInEditor} />
        {tablet && ((viewEditorPreview)?
          <PreviewPaneIcon sx={iconCSS} onClick={() => setViewEditorPreview(false)} />
          :
          <EditorPaneIcon sx={iconCSS} onClick={() => setViewEditorPreview(true)}/>)}
      </ActionBar>
      {
        (tablet) ? (viewEditorPreview)? <Editor />: <Preview/>:
        <ResizableContainers bounds={[200, 50]}>
          <Editor codeInEditor={codeInEditor}/>
          <Preview/>
        </ResizableContainers>
      }
    </StackContainer>
  );
};
