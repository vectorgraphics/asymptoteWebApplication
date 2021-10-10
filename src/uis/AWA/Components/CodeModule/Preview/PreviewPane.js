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
  },
  iframe: {
    backgroundColor: "transparent",
    "&::selection": {
      backgroundColor: "transparent",
    },
  },
}));

export function PreviewPane(props) {
  const classes = useStyle();
  const id = useSelector(idSelector);
  const cmOutput = useSelector(cmOutputSelector);
  const previewPaneView = useSelector((store) => {
    return (id)? store.workspaces.entities[id].previewPaneView: true;
  });


  return (
    (previewPaneView)?
    <div className={classes.container}>
      <div className={classes.previewPane}>
        <PreviewHeader/>
        {
          (cmOutput.responseType === "ERROR")?
            <Errors/>:
            <iframe className={classes.iframe} id="output" src={(id)? cmOutput.path: ""} width="100%" height="100%" title="outputFrame" frameBorder="0"/>
        }
      </div>
    </div>:
    null
  );
}
