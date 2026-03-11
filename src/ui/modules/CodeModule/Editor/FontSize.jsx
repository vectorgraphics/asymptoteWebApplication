import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, ClickAwayListener } from "@mui/material";
import { Grow, Paper, Popper, MenuItem, MenuList, } from "@mui/material";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import { FontSizeIcon } from "../../../../assets/icons/AppIcons.jsx";
import { setFontSize, selectFontSize } from "../../../../state/slices/editorSettingsSlice.js";

const menuOptions = ["12", "14", "16", "18", "20", "22"];

export const FontSize = () => {
  const [open, setOpen] = useState(false);
  const fontSizeOnState = useSelector(selectFontSize);
  const fontSize = localStorage.getItem("fontSize") || fontSizeOnState;
  const [selectedIndex, setSelectedIndex] = useState(menuOptions.indexOf(fontSize));
  const anchorRef = useRef(null);
  const dispatch = useDispatch();
  const width = "5rem";

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    dispatch(setFontSize(menuOptions[index]));
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

  useEffect(() => localStorage.setItem("fontSize", fontSizeOnState), [fontSizeOnState]);
  
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexFlow: "row, nowrap",
          width: width,
          height: "2rem",
          maxHeight: "2rem",
          py: 0,
          px: "4px",
          m: 0,
          alignItems: "center",
          bgcolor: "background.contrast",
          borderRadius: "4px",
          border: "1px solid black",
          "&:hover": {
            bgcolor: "btnHover",
            transition: "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          },
          cursor: "pointer",
        }}
        ref={anchorRef}
        aria-label="Button group with a nested menu"
        onClick={(event) => {}}
      >
        <FontSizeIcon
          sx={{
            minWidth: "1.25rem",
            minHeight: "1.25rem",
            padding: "0 0.5rem 0 0",
            marginRight: "0.25rem",
            color: "black",
            borderRight: 1
          }} />
        <span style={{width: "2rem", color: "black", textAlign: "center", paddingTop: "2px"}}>
          {menuOptions[selectedIndex]}
        </span>
        <ArrowDropDownIcon sx={{color: "black"}} onClick={handleToggle}/>
      </Box>
      <Popper
        sx={{
          "& div": {
            mt: "4px",
          },
          zIndex: 1
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper
              sx={{
                width: width,
                bgcolor: "background.contrast",
                boxShadow: 8
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {menuOptions.map((option, index) => (
                    <MenuItem
                      sx={{
                        p: 0,
                        m: 0,
                        minHeight: "1.5rem",
                        maxHeight: "1.5rem",
                        justifyContent: "center",
                        "&.MuiMenuItem-root": {
                          color: "black",
                          "&:hover": {
                            bgcolor: "btnHover",
                            transition: "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                          },
                        },
                        "&.MuiMenuItem-root.Mui-selected": {
                          bgcolor: "btnHover"
                        }
                      }}
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
    </>
  );
}
