import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cmActionCreator, enActionCreator } from "../../../../store/workspaces";
import { glActionCreator } from "../../../../store/globals";
import {
  idSelector,
  wsNameSelector,
  splitBtnReRenderSelector,
  cmInputSelector,
  cmOutputSelector,
  codeContentSelector,
  UCIDSelector
} from "../../../../store/selectors";
import { makeStyles, SvgIcon } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import { isValidName } from "../../../../utils/validators";
import { codeFormatter, fetchOptionObj, toUrlEncoded } from "../../../../utils/generalTools";


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
      color: (props) => (props.checkedOutId)? theme.palette.text.textActivated: "whitesmoke",
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
  downloadIcon: {
    display: "block",
    width: "1.5rem",
    height: "2rem",
    marginRight: "0.25rem",
    color: theme.palette.background.WorkspaceCont,
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.icon.Donwload,
    },
  }
}));

export function WorkspaceItem({item="", wsId="", onClick=()=>{}, appReset=0, ...props}) {
  const locClasses = useStyle(props);
  const inputRef = useRef(null);
  const inputContRef = useRef(null);
  const UCID = useSelector(UCIDSelector);
  const id = useSelector(idSelector);
  const name = useSelector(wsNameSelector);
  const cmOutput = useSelector(cmOutputSelector);
  const codeContent = useSelector(codeContentSelector);
  const lastAssignedName = useSelector(wsNameSelector);
  const splitBtnReRender = useSelector(splitBtnReRenderSelector);
  const [itemName, setItemName] = useState(lastAssignedName);
  const dispatch = useDispatch();
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

  function putCursorAtEnd(inputElement) {
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

  function registerName(newName) {
    dispatch(enActionCreator.rename(id, newName));
  }
  function deselectItem() {
    (regFlag)? inputRef.current.value = itemName: inputRef.current.value = lastAssignedName;
    inputContRef.current.style.border = "none";
    inputRef.current.disabled = true;
  }

  return (
    <div ref={inputContRef}
      className={locClasses.itemCont}
      onClick={(event) => {
        if (item !== wsId) {
          onClick();
          dispatch(glActionCreator.reRenderSplitBtn(splitBtnReRender + 1));
        }
      }}
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
        style={(props.checkedOutId)? {color: "#F50057"}: {color: "whitesmoke"}}
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
      <GetAppIcon
        classes={{root: locClasses.downloadIcon}}
        onClick={() => {
          const data = {
            reqType: "download",
            UCID: UCID,
            workspaceId: id,
            workspaceName: name,
            codeContent: codeFormatter(codeContent),
            outformat: "asy",
            isUpdated: cmOutput.isUpdated,
          };
          fetch('/', {...fetchOptionObj.postUrlEncode, body: toUrlEncoded(data)}).then((resObj) => resObj.json()).then((responseContent) => {
            // dispatch(cmActionCreator.updateOutput(id, {...cmOutput, ...responseContent}));
            if (responseContent.responseType === "ASY_FILE_CREATED") {
              delete (data.codeContent);
              fetch('/clients', {...fetchOptionObj.postUrlEncode, body: toUrlEncoded(data)}).then((resObj) => resObj.blob()).then((responseContent) => {
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(responseContent);
                link.setAttribute("download", name + ".asy");
                link.click();
              }).catch((err) => {});
            }
          }).catch((err) => {});
        }}
      />
      <SvgIcon classes={{root: locClasses.icons}} onClick={props.openDialog}>
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
