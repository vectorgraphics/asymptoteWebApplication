import { Fragment } from "react";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  codeModule: {
    display: "grid",
    gridTemplateRows: "2.5rem 1fr",
  },
  controls: {
    gridRow: "1/2",
    display: "flex",
    flexFlow: "row nowrap",
    minHeight: "2.5rem",
    maxHeight: "2.5rem",
    border: "1px solid white",
    backgroundColor: "green",
  },
  workingPanels: {
    gridRow: "2/3",
    display: "flex",
    flexFlow: "row nowrap",
    border: "1px solid white",
    backgroundColor: "red",
  },
}))

export function CodeModule(props) {
  const classes = useStyle();
  return (
    <div className={classes.codeModule}>
      <div className={classes.controls}> </div>
        <div className={classes.workingPanels}>
          {"just to test"}
        </div>
        {/*<Editor> </Editor>*/}
        {/*<PreviewPane> </PreviewPane>*/}
    </div>
  )
}
