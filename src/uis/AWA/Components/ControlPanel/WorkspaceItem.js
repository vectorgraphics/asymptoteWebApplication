import {useRef, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {SvgIcon} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";

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
      backgroundColor: theme.palette.background.Header2,
    },
    // border: "1px solid red",
  },
  input: {
    display: "block",
    margin: "0.25rem 0.5rem",
    marginRight: 0,
    minWidth: "calc(100% - 4rem)",
    maxWidth: "calc(100% - 4rem)",
    minHeight: "1.95rem",
    maxHeight: "1.95rem",
    fontSize: "1rem",
    color: "white",
    outline: "none",
    border: "none",
    backgroundColor: "transparent",
    "&::selection": {
      backgroundColor: "transparent",
    },
    "&::placeholder": {
      color: "white",
    },
  },
  icons: {
    display: "block",
    width: "1.5rem",
    height: "2rem",
    marginRight: "0.25rem",
    color: theme.palette.background.WorkspaceCont,
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.icon.SideBarControlsHover,
    },
  },
}));

export function WorkspaceItem(props) {
  const [itemName, setItemName] = useState("workspace");
  const inputRef = useRef(null);
  const inputContRef = useRef(null);
  const classes = useStyle();

  function selectItem() {
    inputRef.current.disabled = false;
    inputRef.current.value = "";
    inputRef.current.focus();
  }
  function registerName(event) {
    // submit itemName into store
  }
  function validate() {
    return true;
  }
  function deselectItem() {
    // inputRef.current.value = ; Fetch the current name
    inputRef.current.disabled = true;
    inputRef.current.blur();
  }

  return (
    <div ref={inputContRef}
      className={classes.itemCont}
      onClick={(event) => {
        // Select the clicked item as the selected workspace
        // console.log(event.target);
      }}
      onDoubleClick={(event) => {
        inputRef.current.disabled = false;
        inputRef.current.focus();
      }}
      onBlur={(event) => {
        inputRef.current.disabled = true;
        inputRef.current.blur();
      }}
    >
      <input
        ref={inputRef}
        disabled={true}
        className={classes.input}
        type="text"
        name="wsItem"
        maxLength="28"
        placeholder="workspace.asy"
        autoComplete="off"
        onChange={(event) => setItemName(inputRef.current.value)}
        onKeyDown={(event) => {
          switch (event.key) {
           case 'Enter':
             if (inputRef.current.value !== "") {
               if (validate(inputRef.current.value)) {
                 // registerName(inputRef.current.value);
                 deselectItem();
               }
             } else {
               deselectItem();
             }
             break;
           case 'Escape':
             deselectItem();
             break;
           default:
          }
        }}
        onBlur={(event) => deselectItem()}
      />
      <GetAppIcon classes={{root: classes.icons}}/>
      <SvgIcon classes={{root: classes.icons}} onClick={props.openDialog}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1rem" viewBox="0 0 448 512">
          <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16
                    16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16
                    16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136
                    32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
          />
        </svg>
      </SvgIcon>
    </div>
  );
}
