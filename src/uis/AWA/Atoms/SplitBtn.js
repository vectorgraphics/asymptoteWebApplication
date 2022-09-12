import { useRef, useState} from 'react';
import { makeStyles, Button, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList } from "@material-ui/core";
import { ArrowDropDown as ArrowDropDownIcon } from '@material-ui/icons';
import { merge } from "lodash";
import classNames  from "classnames";

const basicStyle = (theme) => ({
  wrapper: {},
  btnSize: {
    minWidth: "10rem",
    maxWidth: "10rem",
  },
  groupBtn: {
    display: "flex",
    flexFlow: "row nowrap",
    minHeight: "1.5rem",
    maxHeight: "1.5rem",
    padding: "0",
    fontFamily: "Roboto",
    fontWeight: "450",
    fontSize: "0.875rem",
    borderRadius: "1px",
  },
  btnText: {
    flex: "2 1 auto",
    maxHeight: "1.5rem",
    // border: "1px solid red",
  },
  selectBtn: {
    flex: "1 1 auto",
    minWidth: "1.5rem",
    maxWidth: "1.5rem",
    minHeight: "1.5rem",
    maxHeight: "1.5rem",
    borderLeft: "1px solid lightgrey",
    borderRadius: "1px",
    "&:hover": {
      boxShadow: theme.shadows[3],
      borderLeft: `1px solid ${theme.palette.common.grey[400]}`,
    }
  },
  menuList: {
    display: "flex",
    flexFlow: "column nowrap",
    padding: 0,
    margin: 0,
    borderRadius: "1px",
    // border: "1px solid red",
  },
  menuItem: {
    flex: "1 1 auto",
    minWidth: "100%",
    minHeight: "1.5rem",
    maxHeight: "1.5rem",
    padding: 0,
    margin: "0.125rem 0",
    justifyContent: "space-evenly",
    fontSize: "0.875rem",
    lineHeight: "1.5rem",
    "&:hover": {
      backgroundColor: theme.palette.hover.menuItemHover,
    }
  },
  paper: {
    marginTop: "0.25rem",
    borderRadius: "1px",
  },
  popper: {
    zIndex: 600,
  }
});

const useStyle = makeStyles((theme) => ({
  wrapper:    (finalStyle) => merge(basicStyle(theme), finalStyle).wrapper,
  btnSize:    (finalStyle) => merge(basicStyle(theme), finalStyle).btnSize,
  groupBtn:   (finalStyle) => merge(basicStyle(theme), finalStyle).groupBtn,
  btnText:    (finalStyle) => merge(basicStyle(theme), finalStyle).btnText,
  btnIcon:    (finalStyle) => merge(basicStyle(theme), finalStyle).btnIcon,
  selectBtn:  (finalStyle) => merge(basicStyle(theme), finalStyle).selectBtn,
  menuList:   (finalStyle) => merge(basicStyle(theme), finalStyle).menuList,
  menuItem:   (finalStyle) => merge(basicStyle(theme), finalStyle).menuItem,
  paper:      (finalStyle) => merge(basicStyle(theme), finalStyle).paper,
  popper:     (finalStyle) => merge(basicStyle(theme), finalStyle).popper,
}));


export const SplitBtn = (
  {
    finalStyle={}, splitType="splitView", variant="contained", items=["test1", "test2"],
    currentItem="Code Module", onSelect=()=>{},
    disableElevation=false, children={}, ...props
  }) => {
  const locClasses = useStyle(finalStyle);
  const btnRef = useRef(null);
  const [open, setOpen] = useState(false);
  let selectedIndex = items.findIndex((element) => (element === currentItem));

  const handleMenuItemClick = (event, index) => {
    onSelect(items[index]);
    setOpen(false);
  };
  const handleToggle = () => setOpen((prevOpen) => !prevOpen);
  const handleClose = (event) => {
    if (btnRef.current && btnRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={locClasses.wrapper}>
      <Btn
        generatedStyle={locClasses} splitType={splitType} variant={variant} Ref={btnRef} items={items}
        selectedIndex={selectedIndex} disableElevation={disableElevation} onToggle={handleToggle}
        receivedChildren={children}
      />
      <Popper
        className={locClasses.popper} open={open}
        anchorEl={btnRef.current} role={undefined}
        transition disablePortal placement={"bottom-start"}>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps} style={{transformOrigin: (placement === "bottom-start")? "center top": "left bottom",}}
          >
            <Paper classes={{root: locClasses.paper}}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList classes={{root: classNames(locClasses.menuList, locClasses.btnSize)}}>
                  {
                    items.map((option, index) => (
                     <MenuItem
                       classes={{root: locClasses.menuItem}} key={option} selected={index === selectedIndex}
                       onClick={(event) => handleMenuItemClick(event, index)}
                     >
                       {option}
                     </MenuItem>
                    ))
                  }
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

const Btn = (
  {
    generatedStyle="", splitType="", variant="", Ref=null, items=["", ""], selectedIndex="0",
    onToggle=() => {}, iconElement="", disableElevation=false, receivedChildren=null, ...props
  }) => {

  switch (splitType) {
    case "splitView":
      return (
        <Button
          classes={{root: classNames(generatedStyle.groupBtn, generatedStyle.btnSize)}}
          variant={variant} ref={Ref} disableElevation={disableElevation}
        >
          <div className={generatedStyle.btnText}> {items[selectedIndex]} </div>
          <div className={generatedStyle.selectBtn} onClick={onToggle}> <ArrowDropDownIcon/> </div>
        </Button>
      );
    case "splitStatic":
      return (
        <Button
          classes={{root: classNames(generatedStyle.groupBtn, generatedStyle.btnSize)}}
          variant={variant} ref={Ref} onClick={onToggle} disableElevation={disableElevation}
        > {receivedChildren} </Button>
      );
    default:
      throw new Error("The Split Type is not supported!");
  }
}