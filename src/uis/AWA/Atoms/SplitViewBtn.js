import { useRef, useState } from 'react';
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
}));

export function SplitViewBtn({
    children, items=["test1", "test2"], passedId=1, passedEntities={},
    passedHandler=() => {}, dispatch=false, SplitBtnReRender=0, ...props
  }) {
  const locClasses = useStyle(props);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  let selectedIndex = (passedEntities[passedId].activeModule === "Code Module")? 0: 1;

  const handleMenuItemClick = (event, index) => {
    (dispatch)? dispatch(passedHandler.call(null, passedId, items[index])): passedHandler();
    setOpen(false);
  };
  const handleToggle = () => setOpen((prevOpen) => !prevOpen);
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <ButtonGroup classes={{root: locClasses.rootGBtn}} variant="contained" ref={anchorRef}>
        <PropsStrainer>
          <Box className={locClasses.rootBox}>{items[selectedIndex]}</Box>
        </PropsStrainer>
          <Button classes={{root: locClasses.rootSBtn}} size="small" onClick={handleToggle}>
            <ArrowDropDownIcon />
          </Button>
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
                <MenuList classes={{root: locClasses.rootList}}>
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
