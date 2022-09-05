import {makeStyles} from "@material-ui/core/styles";
import { Error } from "./Error.js";
import { merge } from "lodash";

const basicStyle = (theme) => ({
  previewCont: {},
  iframe: {
    minHeight: "calc(100% - 0.25rem)",
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

export function Preview({finalStyle={}, parentModule="", outputObj={}, errorObj={}, ...props}) {
  const locClasses = useStyle(finalStyle);
  return (
    <div className={locClasses.previewCont}>
      {
        (outputObj.responseType === "ERROR")?
          <Error finalStyle={errorFinalStyle} errorObj={outputObj}/>:
          <iframe id="cm-preview-iframe" title="output-iframe" src="" className={locClasses.iframe}
            // src={(Object.keys(outputObj).length !== 0 )? ((outputObj.isUpdated)? outputObj.path + " ": outputObj.path + ""): {}}
          />
      }
    </div>
  );
}

const errorFinalStyle = {
  errorCont: {
    flex: "10 1 auto",
  }
}
