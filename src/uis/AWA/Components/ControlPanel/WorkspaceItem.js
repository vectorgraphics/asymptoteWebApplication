import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enActionCreator } from "../../../../store/workspaces";
import { idSelector, wsNameSelector } from "../../../../store/selectors";
import { makeStyles, useTheme } from "@material-ui/core";
import { isValidName } from "../../../../utils/validators";
import { DeleteSVG } from "../../../../assets/svgs/appWideSvgs.js";


const useStyle = makeStyles((theme) => ({
  itemCont: {
    display: "flex",
    flexFlow: "row nowrap",
    minWidth: "100%",
    maxWidth: "100%",
    minHeight: "2rem",
    maxHeight: "2rem",
    marginTop: "0.25rem",
    marginBottom: "0.25rem",
    alignItems: "center",
    "&:hover": {
      backgroundColor: theme.palette.hover.wsItemHover,
    },
    // border: "1px solid red",
  },
  input: {
    margin: "0.25rem 0.5rem",
    marginRight: 0,
    minWidth: "calc(100% - 2.5rem)",
    maxWidth: "calc(100% - 2.5rem)",
    minHeight: "1.95rem",
    maxHeight: "1.95rem",
    fontFamily: "Roboto",
    fontSize: "1rem",
    color: theme.palette.text.awaPrimaryContrast,
    outline: "none",
    border: "none",
    backgroundColor: "transparent",
    "&::selection": {
      backgroundColor: "transparent",
    },
    "&::placeholder": {
      color: (props) => (props.checkedOutId)? theme.palette.text.active: theme.palette.text.awaPrimaryContrast,
    },
  },
  deleteBtn: {
    width: "1.5rem",
    height: "2rem",
    cursor: "pointer",
    color: theme.palette.background.panel,
    "&:hover": {
      color: theme.palette.icon.deleteHover,
    },
  },
  deleteIcon: {
    minWidth: "1.25rem",
    maxWidth: "1.25rem",
    minHeight: "1.25rem",
    maxHeight: "1.25rem",
    marginTop: "0.4rem",
  }
}));

export const WorkspaceItem = ({item="", wsId="", onClick=()=>{}, appReset=0, ...props}) => {
  const locClasses = useStyle(props);

  const inputRef = useRef(null);
  const inputContRef = useRef(null);
  const id = useSelector(idSelector);
  const lastAssignedName = useSelector(wsNameSelector);
  const dispatch = useDispatch();
  const theme = useTheme();

  const [itemName, setItemName] = useState(lastAssignedName);


  let regFlag = false;

  useEffect(() => {
    (itemName !== "" && !isValidName(itemName))
      ? inputContRef.current.style.border = "1px solid red"
      : inputContRef.current.style.border = "none";
  });

  useEffect(() => {
    setItemName(lastAssignedName);
    inputRef.current.value = lastAssignedName;
  }, [appReset]);

  const putCursorAtEnd = (inputElement) => {
    const length = inputElement.value.length;
    if (inputElement.setSelectionRange) {
      inputElement.focus();
      inputElement.setSelectionRange(length, length);
    } else if (inputElement.createTextRange) {
      const textRange = inputElement.createTextRange();
      textRange.collapse(true);
      textRange.moveEnd('character', length);
      textRange.moveStart('character', length);
      textRange.select();
    }
  }

  const registerName = (newName) => dispatch(enActionCreator.rename(id, newName));
  const deselectItem = () => {
    (regFlag)? inputRef.current.value = itemName: inputRef.current.value = lastAssignedName;
    inputContRef.current.style.border = "none";
    inputRef.current.disabled = true;
  }

  return (
    <div ref={inputContRef}
      className={locClasses.itemCont}
      onClick={(event) => (item !== wsId)? onClick(): null}
      onDoubleClick={(event) => {
        regFlag = false;
        inputRef.current.disabled = false;
        putCursorAtEnd(inputRef.current);
      }}
      onBlur={(event) => {
        inputRef.current.disabled = true;
        inputRef.current.blur();
      }}
    >
      <input
        ref={inputRef}
        disabled={true}
        className={locClasses.input}
        style={(props.checkedOutId)? {color: theme.palette.text.active}: {color: theme.palette.text.awaSecondaryContrast}}
        type="text"
        name="workspaceItem"
        maxLength="28"
        placeholder={itemName}
        autoComplete="off"
        onChange={(event) => setItemName(event.target.value)}
        onKeyDown={(event) => {
          switch (event.key) {
           case "Enter":
             if (inputRef.current.value !== "") {
               if (isValidName(inputRef.current.value)) {
                 registerName(inputRef.current.value);
                 regFlag = true;
                 deselectItem();
                 break;
               }
             } else {
               deselectItem();
             }
             break;
           case "Escape":
             deselectItem();
             break;
           default:
          }
        }}
        onBlur={(event) => deselectItem()}
      />
      <div className={locClasses.deleteBtn} onClick={props.openDialog}>
        <DeleteSVG className={locClasses.deleteIcon}/>
      </div>
    </div>
  );
};
