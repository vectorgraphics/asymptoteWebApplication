import { Fragment, useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { idSelector, appResetSelector } from "../../../../store/selectors";
import { wsActionCreator } from "../../../../store/workspaces";
import { makeStyles } from "@material-ui/core";
import { AlertDialog } from "../../Atoms/AlertDialog";
import { WorkspaceItem } from "./WorkspaceItem";
import { glActionCreator } from "../../../../store/globals";

const useStyle = makeStyles((theme) => ({
  itemCont: {
    display: "block",
    paddingTop: "0.5rem",
    minHeight: "532px",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.25rem",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 0.25rem rgba(0,0,0,0.5)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "darkgrey",
      outline: "1px solid slategrey",
    },
  },
}))

export function WorkspaceBody(props) {
  const locClasses = useStyle();
  const contRef = useRef(null);
  const [isOpen, setOpenState] = useState(false);
  const id = useSelector(idSelector);
  const appReset = useSelector(appResetSelector);
  const listOfItems = useSelector((store) => store.workspaces.workspacesIdOrder);
  const dispatch = useDispatch();

  useEffect(() => {
    contRef.current.scrollTop = contRef.current.scrollHeight;
  });
  const openDialog = () => setOpenState(true);
  const closeDialog = () => setOpenState(false);

  const mediaryHandler = () => {
    const length = listOfItems.length;
    const index = listOfItems.indexOf(id);
    if (length === 1) {
      dispatch(glActionCreator.resetApplication(appReset + 1));
    } else if (length > 1) {
      if (index < length - 1) {
        dispatch(wsActionCreator.checkout(listOfItems[index + 1]));
      } else if (index === length - 1) {
        dispatch(wsActionCreator.checkout(listOfItems[index - 1]));
      }
      dispatch(wsActionCreator.remove(id));
    }
  }

  return (
    <Fragment>
      <div ref={contRef} className={locClasses.itemCont}>
        {listOfItems.map((item) => {
          if (item) {
            return <WorkspaceItem
              key={item} item={item} wsId={id} appReset={appReset}
              onClick={() => dispatch(wsActionCreator.checkout(item))}
              checkedOutId={item === id} openDialog={openDialog}/>
          } else {
            return null;
          }
        })}
      </div>
        <AlertDialog
          OKAction={mediaryHandler} isOpen={isOpen} closeDialog={closeDialog}
          dialogText={
            (listOfItems.length === 1)
            ? "Clicking OK will reset the application to its default state."
            : "Deleting this workspace is irreversible!"
          }
        />
    </Fragment>
  );
}
