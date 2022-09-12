import { memo, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Error } from "./Error.js";
import { merge } from "lodash";
import { srcAlternator } from "../../../../utils/appTools";

const basicStyle = (theme) => ({
  previewCont: {},
  iframe: {
    minHeight: "calc(100% - 4px)",
    backgroundColor: "transparent",
    "&::selection": {
      backgroundColor: "transparent",
    },
    border: "none",
  },
});

const useStyle = makeStyles((theme) => ({
  preview: (finalStyle) => merge(basicStyle(theme), finalStyle).previewCont,
  iframe: (finalStyle) => merge(basicStyle(theme), finalStyle).iframe,
}));

export const Preview = memo(({finalStyle={}, parentModule="cm", outputObj={}, iframeRef=null, previewState=true, ...props}) => {

  const locClasses = useStyle(finalStyle);
  const recentSrc = useRef("");
  const {serverRes={resUrl: ""}, stderr="", shouldUpdate} = outputObj;

  // console.log("preview rendered");
  if (previewState) {
    return (
      <div className={locClasses.previewCont}>
        {
          (serverRes.resStatus === "FAILURE")?
          <Error
            finalStyle={errorFinalStyle}
            errObj={{
              resType:    serverRes.resType,
              resText:    serverRes.resText,
              errCode:    serverRes.errCode,
              errContent: serverRes.errContent,
              stderr:     stderr,
            }}
          />:
          <iframe
            id={`${parentModule}-preview-iframe`} ref={iframeRef} title="output-iframe" className={locClasses.iframe} width="100%"
            src={(shouldUpdate)? srcAlternator(recentSrc, serverRes.resUrl): ""}
          />
        }
      </div>
    );
  } else {
      return null;
  }
})

const errorFinalStyle = {
  errorCont: {
    flex: "10 1 auto",
  }
}

// src={(Object.keys(outputObj).length !== 0 )? ((outputObj.isUpdated)? outputObj.path + " ": outputObj.path + ""): {}}
