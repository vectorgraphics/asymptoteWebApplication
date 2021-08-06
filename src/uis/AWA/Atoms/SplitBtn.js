import React from 'react';
import { makeStyles } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';


const useStyle = makeStyles((theme) => ({
  rootGbtn: {
    maxWidth: "7.5rem",
    minWidth: "7.5rem",
    maxHeight: "1.5rem",
    borderRadius: "1px",
  },
  rootSBtn: {
    maxWidth: "1.5rem",
    minWidth: "1.5rem",
    maxHeight: "1.5rem",
    borderRadius: "1px",
  },
  rootBox: {
    minWidth: "6rem",
    maxWidth: "6rem",
    maxHeight: "1.5rem",
    fontSize: "0.875rem",
    textAlign: "center",
    lineHeight: "1.5rem",
    borderRadius: "1px",
    backgroundColor: "#e0e0e0",
  },
  rootList: {
    display: "flex",
    flexFlow: "column nowrap",
    minWidth: "7.5rem",
    maxWidth: "7.5rem",
    padding: 0,
    margin: 0,
    borderRadius: "1px",
  },
  rootItem: {
    flex: "1 1 auto",
    minWidth: "100%",
    minHeight: "1.5rem",
    maxHeight: "1.5rem",
    padding: 0,
    margin: "0.125rem 0",
    justifyContent: "space-evenly",
    fontSize: "0.875rem",
    lineHeight: "1.5rem",
  },
  paper: {
    marginTop: "0.25rem",
    borderRadius: "1px",
  },
}))

export function SplitBtn({children, className, ...props}) {
  const options = props.items;

  const toOverride = useStyle();
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
      <Box>
        <ButtonGroup classes={{root: toOverride.rootGbtn}} variant="contained" ref={anchorRef}>
          <Box className={toOverride.rootBox}>{options[selectedIndex]}</Box>
          <Button classes={{root: toOverride.rootSBtn}}
            size="small"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal placement={"bottom-start"}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom-start' ? 'center top' : 'left bottom',
              }}
            >
              <Paper classes={{root: toOverride.paper}}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList classes={{root: toOverride.rootList}} id="split-button-menu">
                    {options.map((option, index) => (
                      <MenuItem
                        classes={{root: toOverride.rootItem}}
                        key={option}
                        selected={index === selectedIndex}
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
      </Box>
  );
}
