import { useRef, useState } from 'react';
import { enActionCreator } from "../../../store/workspaces";
import { makeStyles } from "@material-ui/core";
import { PropsStrainer } from "./PropsStrainer";
import { Button, Box, ButtonGroup, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyle = makeStyles((theme) => ({
  rootGBtn: (props) => props.cssStyle.gBtn,
  rootSBtn: (props) => props.cssStyle.sBtn,
  rootBox:  (props) => props.cssStyle.box,
  rootList: (props) => props.cssStyle.list,
  rootItem: (props) => props.cssStyle.item,
  paper:    (props) => props.cssStyle.paper,
  popper: {
    zIndex: 2000,
  },
}))

export function SplitBtn(
  {
    children, items=["test1", "test2"], btnIcon=false, disableElevation=false,
    passedHandler=() => {}, passedData=1, dispatch=false, ...props
  }) {
  const locClasses = useStyle(props);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    passedHandler();
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
      <div>
        <ButtonGroup classes={{root: locClasses.rootGBtn}} variant="contained" ref={anchorRef} disableElevation={disableElevation}>
          <PropsStrainer>
            <Box className={locClasses.rootBox}> {(btnIcon)? btnIcon: "icon"} </Box>
          </PropsStrainer>
            {/*<Box className={locClasses.rootSBtn} size="small" onClick={handleToggle}>*/}
            {/*  /!*<ArrowDropDownIcon/>*!/*/}
            {/*</Box>*/}
        </ButtonGroup>
        <Popper
          className={locClasses.popper} open={open}
          anchorEl={anchorRef.current} role={undefined}
          transition disablePortal placement={"bottom-start"}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps} style={{transformOrigin: (placement === "bottom-start")? "center top": "left bottom",}}
            >
              <Paper classes={{root: locClasses.paper}}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList classes={{root: locClasses.rootList}} id="split-button-menu">
                    {items.map((option, index) => (
                      <MenuItem
                        classes={{root: locClasses.rootItem}}
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
      </div>
  );
}
