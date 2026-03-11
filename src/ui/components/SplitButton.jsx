import { useState, useRef } from "react";
import { Button, ButtonGroup } from "@mui/material";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import { ClickAwayListener } from "@mui/material";
import { Grow, Paper, Popper, MenuItem, MenuList } from "@mui/material";
import { DownloadIcon } from "../../assets/icons/AppIcons.jsx";


export const SplitButton = ({menuOptions=[]}) => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const anchorRef = useRef(null);

  const handleClick = () => {
    console.info(`You clicked ${menuOptions[selectedIndex]}`);
  };

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

  const iconCSS = {
    height: "1.75rem",
    flexGrow: 1,
    py: "2px",
    color: "blue"
  }

  return (
    <>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
      >
        <Button
          sx={{
            display: "flex",
            flexFlow: "row, nowrap",
            py: 0,
            px: "4px",
            m: 0,
            alignItems: "center",
            bgcolor: "background.contrast",
            "&:hover": {
              bgcolor: "btnHover",
              transition: "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            },
          }}
          onClick={handleClick}
        >
          <DownloadIcon sx={iconCSS}/>
          <span style={{display: "block", width: "64px"}}>
            {menuOptions[selectedIndex]}
          </span>
        </Button>
        <Button
          sx={{
            display: "flex",
            p: 0,
            m:0,
            bgcolor: "background.contrast",
            "&:hover": {
              bgcolor: "btnHover",
              transition: "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            },
            "&.MuiButtonBase-root": {
              minWidth: 30
            }
          }}
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
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
                minWidth: 120,
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
                        minHeight: 32,
                        maxHeight: 32,
                        justifyContent: "center",
                        "&.MuiMenuItem-root": {
                          color: "text.bgText",
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
