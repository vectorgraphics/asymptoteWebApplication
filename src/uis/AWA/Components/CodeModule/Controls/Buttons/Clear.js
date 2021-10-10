import { useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { idSelector, editorReRenderSelector } from "../../../../../../store/selectors";
import { cmActionCreator, enActionCreator} from "../../../../../../store/workspaces";
import { makeStyles } from "@material-ui/core";
import { ButtonGroup, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList} from '@material-ui/core';
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import { Btn } from '../../../../Atoms/Btn';


const useStyle = makeStyles((theme) => ({
  cont: {
    margin: "0 0.5rem",
  },
  btnGroup: {
    display: "block",
    borderRadius: "1px",
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
    },
  },
  btn: {
    minWidth: "6rem",
    maxWidth: "6rem",
    boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
  },
  popper: {
    minWidth: "6rem",
    maxWidth: "6rem",
    zIndex: 2000
  },
  list: {
    minWidth: "6rem",
    maxWidth: "6rem",
    paddingTop: "2px",
    paddingBottom: "2px",
    borderRadius: "1px",
  },
  item: {
    minHeight: "1.5rem",
    maxHeight: "1.5rem",
    fontSize: "0.875rem",
    textAlign: "center",
    lineHeight: "1.5rem",
    "&:hover": {
      backgroundColor: "darkGrey"
    }
  },
  paper: {
    marginTop: "0.25rem",
    borderRadius: "1px",
  },
  icon: {
    color: theme.palette.icon.Clear,
  }
}))

export function Clear({children, className, classes, ...props}) {
  const locClasses = useStyle();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const options = ["Editor", "Preview", "All"];
  const id = useSelector(idSelector);
  const editorReRender = useSelector(editorReRenderSelector);
  const dispatch = useDispatch();
  const output = {
    responseType: null,
    responseText: null,
    path: "",
    errorType: null,
    errorText: null,
    errorCode: null,
    errorContent: null,
    stdout: "",
    stderr: "",
    entryExists: false,
    isUpdated: false,
  }

  const handleMenuItemClick = (event, index) => {
    if (index === 0) {
      dispatch(cmActionCreator.setCodeContent(id, ""));
      dispatch(enActionCreator.reRenderEditor(id, editorReRender + 1));
    } else if (index === 1) {
      dispatch(cmActionCreator.updateOutput(id, output));
    } else {
      dispatch(cmActionCreator.setCodeContent(id, ""));
      dispatch(enActionCreator.reRenderEditor(id, editorReRender + 1));
      dispatch(cmActionCreator.updateOutput(id, output));
    }
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={locClasses.cont}>
      <ButtonGroup classes={{root: locClasses.btnGroup}} variant="contained" ref={anchorRef}>
        <Btn
          className={locClasses.btn}
          startIcon={<BackspaceOutlinedIcon className={locClasses.icon}/>}
          onClick={handleToggle}
        >
          clear
        </Btn>
      </ButtonGroup>
      <Popper
        className={locClasses.popper}
        open={open} anchorEl={anchorRef.current}
        transition disablePortal placement={"bottom-start"}>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === "bottom-start" ? "center top" : "left bottom",}}
          >
            <Paper classes={{root: locClasses.paper}}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList classes={{root: locClasses.list}}>
                  {options.map((option, index) => (
                    <MenuItem
                      classes={{root: locClasses.item}}
                      key={option}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

