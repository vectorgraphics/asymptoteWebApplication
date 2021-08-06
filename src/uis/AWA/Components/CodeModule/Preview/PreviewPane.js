import { makeStyles } from "@material-ui/core/styles";
import { PreviewHeader } from "./PreviewHeader";


const useStyle = makeStyles((theme) => ({
  previewPane: {
    display: "flex",
    flexFlow: "column nowrap",
    flex: "1 1 auto",
    minHeight: "100%",
    alignItems: "stretch",
    borderLeft: "1px solid grey",
  },
  output: {
    flex: "10 1 auto",
    margin: 0,
    padding: 0,
    border: "none",
  },
}))

export function PreviewPane(props) {
  const classes = useStyle();
  return (
    <div className={classes.previewPane}>
      <PreviewHeader/>
      <iframe className={classes.output} width="100%" height="100%" id="output" title="outputFrame" frameBorder="0"/>
    </div>
  );
}
