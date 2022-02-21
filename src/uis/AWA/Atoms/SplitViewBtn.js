import { useRef, useState } from 'react';
import { makeStyles } from "@material-ui/core";
import { PropsStrainer } from "./PropsStrainer";
import { Button, Box, ButtonGroup, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyle = makeStyles((theme) => ({
  groupBtn:  (props) => props.cssStyle.groupBtn,
  selectBtn: (props) => props.cssStyle.selectBtn,
  box:       (props) => props.cssStyle.box,
  list:      (props) => props.cssStyle.list,
  item:      (props) => props.cssStyle.item,
  paper:     (props) => props.cssStyle.paper,
  popper: {
    zIndex: 600,
  },
}));

export function SplitViewBtn(
  {
    children, items=["test1", "test2"], wsId=1, activeModule="Code Module", onSelect=() => {}, SplitBtnReRender=0, ...props
  }) {
  const locClasses = useStyle(props);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  let selectedIndex = (activeModule === "Code Module")? 0: 1;

  const handleMenuItemClick = (event, index) => {
    onSelect(items[index]);
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
      <ButtonGroup classes={{root: locClasses.groupBtn}} variant="contained" ref={anchorRef}>
        <PropsStrainer>
          <Box className={locClasses.box}>{items[selectedIndex]}</Box>
        </PropsStrainer>
          <Button classes={{root: locClasses.selectBtn}} size="small" onClick={handleToggle}>
            <ArrowDropDownIcon/>
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
                <MenuList classes={{root: locClasses.list}}>
                  {items.map((option, index) => (
                    <MenuItem
                      classes={{root: locClasses.item}}
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
