import React from 'react';
import { makeStyles } from "@material-ui/core";

import ButtonGroup from '@material-ui/core/ButtonGroup';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import BackspaceIcon from '@material-ui/icons/Backspace';
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import { Btn } from './Btn';


const useStyle = makeStyles((theme) => ({
  div: {
    display: "block",
    margin: "0 0.5rem",
  },
  btnGroup: {
    display: "block",
    maxWidth: "5.5rem",
    minWidth: "5.5rem",
    maxHeight: "1.5rem",
    borderRadius: "1px",
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
    },
  },
  btn: {
    boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
  },
  list: {
    minWidth: "5.5rem",
    maxWidth: "5.5rem",
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
  },
  paper: {
    marginTop: "0.25rem",
    borderRadius: "1px",
  },
  icon: {
    color: theme.palette.icon.Clear,
  }
}))

export function ClearBtn({children, className, ...props}) {
  const classes = useStyle();
  const options = ["Editor", "Preview", "All"];
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
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
    <div className={classes.div}>
      <ButtonGroup classes={{root: classes.btnGroup}} variant="contained" ref={anchorRef}>
        <Btn className={classes.btn} startIcon={<BackspaceOutlinedIcon className={classes.icon}/>} onClick={handleToggle}>
          clear
        </Btn>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal placement={"bottom-start"}>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-start' ? 'center top' : 'left bottom',
            }}
          >
            <Paper classes={{root: classes.paper}}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList classes={{root: classes.list}} id="split-button-menu">
                  {options.map((option, index) => (
                    <MenuItem
                      classes={{root: classes.item}}
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
