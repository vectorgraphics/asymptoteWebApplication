import { useState, Fragment } from "react";
import { makeStyles, useTheme } from "@material-ui/core";
import { AlertDialog } from "../../Atoms/AlertDialog";
import { WorkspaceItem } from "./WorkspaceItem";

const useStyle = makeStyles((theme) => ({
  itemCont: {
    display: "flex",
    flexFlow: "column nowrap",
    flex: "10 0 auto",
    paddingTop: "0.5rem",
    minHeight: "532px",
    overflow: "auto",
  }
}))

export function Workspace(props) {
  const classes = useStyle();
  const [isOpen, setOpenState] = useState(false);

  const openDialog = () => {
    setOpenState(true);
  };
  const closeDialog = () => {
    setOpenState(false);
  };

  return (
    <Fragment>
      <div className={classes.itemCont}>
        <WorkspaceItem openDialog={openDialog}/>
      </div>
      <AlertDialog isOpen={isOpen} closeDialog={closeDialog}/>
    </Fragment>
  );
}
