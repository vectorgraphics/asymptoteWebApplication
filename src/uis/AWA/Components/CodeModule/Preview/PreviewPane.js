import {useRef, useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { idSelector, cmOutputSelector } from "../../../../../store/selectors";
import { makeStyles } from "@material-ui/core/styles";
import { PreviewHeader } from "./PreviewHeader";
import { Errors } from "./Errors";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexFlow: "row nowrap",
    flex: "1 1 0",
    minHeight: "100%",
    alignItems: "stretch",
  },
  previewPane: {
    display: "flex",
    flexFlow: "column nowrap",
    flex: "1 1 0",
    minHeight: "100%",
    alignItems: "stretch",
    borderLeft: "1px solid grey",
    backgroundColor: theme.palette.background.Preview,
  },
  iframe: {
    backgroundColor: "transparent",
    "&::selection": {
      backgroundColor: "transparent",
    },
  },
}));

export function PreviewPane(props) {
  const locClasses = useStyle();
  const iframeRef = useRef(null);
  const id = useSelector(idSelector);
  const cmOutput = useSelector(cmOutputSelector);
  const previewPaneView = useSelector((store) => (id)? store.workspaces.entities[id].previewPaneView: true);

  return (
    (previewPaneView)?
    <div className={locClasses.container}>
      <div className={locClasses.previewPane}>
        <PreviewHeader/>
        {
          (cmOutput.responseType === "ERROR")
            ? <Errors errorText={cmOutput.errorText}/>
            : <iframe
                id="output" ref={iframeRef} className={locClasses.iframe}
                src={(cmOutput.isUpdated)? cmOutput.path + " ": cmOutput.path + ""}
                width="100%" height="100%" title="outputFrame" frameBorder="0"
              />
        }
      </div>
    </div>:
    null
  );
}
