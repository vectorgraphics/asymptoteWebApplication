import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { idSelector, appResetSelector } from "../../../../store/selectors";
import { wsActionCreator } from "../../../../store/workspaces";
import { makeStyles } from "@material-ui/core";
import { AlertDialog } from "../../Atoms/AlertDialog";
import { WorkspaceItem } from "./WorkspaceItem";
import { glActionCreator } from "../../../../store/globals";
import { scrollbarStyler } from "../../../../utils/appTools";

const useStyle = makeStyles((theme) => ({
  bodyCont: {
    gridRow: "3/4",
    paddingTop: "0.5rem",
    minHeight: "38.25rem",
    maxHeight: "38.25rem",
    overflowY: "auto",
    overflowX: "hidden",
    ...scrollbarStyler(),
    backgroundColor: theme.palette.background.WorkspaceBody,
    // border: "1px solid red",
  },
  alert: {
    position: "absolute",
  }
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

  const OkAction = () => {
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
    <div>
      <div ref={contRef} className={locClasses.bodyCont}>
        {listOfItems.map((item) => {
          if (item) {
            return <WorkspaceItem
              key={item} item={item} wsId={id} appReset={appReset}
              onClick={() => dispatch(wsActionCreator.checkout(item))}
              checkedOutId={item === id} openDialog={() => setOpenState(true)}/>
          } else {
            return null;
          }
        })}
      </div>
        <AlertDialog className={locClasses.alert}
          onAccept={OkAction} isOpen={isOpen} onClose={() => setOpenState(false)}
          dialogText={
            (listOfItems.length === 1)
            ? "Clicking OK will reset the application to its default state."
            : "Deleting this workspace is irreversible!"
          }
        />
    </div>
  );
}
