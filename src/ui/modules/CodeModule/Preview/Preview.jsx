import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Iframe } from "../../../components/StyledComponents.jsx";
import { selectOutput } from "../../../../state/slices/outputsSlice.js";

export const Preview = () => {
  const iframeRef = useRef(null);
  const updatingKey = useRef(0)
  const output = useSelector(selectOutput);
  let url = "";
  if (output.generatedFile) {
    const [filename, fileFormat] = output.generatedFile.split(".");
    if (fileFormat === "html") {
      updatingKey.current++;
      url = `/users?action=fetch&filename=${filename}&fileFormat=${fileFormat}`;
    }
  }
  
  useEffect(() => {
    iframeRef.current.src = url;
  })
    
  return <Iframe key={updatingKey.current} id="previewIframe" ref={iframeRef} />
}
