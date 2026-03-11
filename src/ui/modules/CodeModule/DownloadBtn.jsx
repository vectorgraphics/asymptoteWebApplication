import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, CircularProgress } from "@mui/material";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import { ClickAwayListener } from "@mui/material";
import { Grow, Paper, Popper, MenuItem, MenuList } from "@mui/material";
import { DownloadIcon, StopIcon } from "../../../assets/icons/AppIcons.jsx";
import { setSubmittedCode } from "../../../state/slices/inputsSlice.js";
import { setOutput } from "../../../state/slices/outputsSlice.js";
import { selectCurrentWs, setIsDownloading } from "../../../state/slices/workspacesSlice.js";
import { xFetch } from "../../../utils/xFetch.js";

const menuOptions = ["html", "pdf", "svg", "eps", "v3d", "asy"];

export const DownloadBtn = ({codeInEditor = ""}) => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const anchorRef = useRef(null);
  const controllerRef = useRef(new AbortController());
  const currentWs = useSelector(selectCurrentWs);
  const isCompiling = currentWs.isCompiling;
  const isDownloading = currentWs.isDownloading;
  const dispatch = useDispatch();

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
    <>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
        disabled={isCompiling}
      >
        <Button
          sx={{
            display: "flex",
            flexFlow: "row nowrap",
            width: "6rem",
            height: "1.75rem",
            py: 0,
            px: "4px",
            m: 0,
            alignItems: "center",
            bgcolor: "background.contrast",
            "&:hover": {
              bgcolor: "btnHover",
              transition: "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            },
            "& .MuiButton-icon": {
              mx: 0
            },
            "& .MuiButton-loadingIndicator": {
              color: "red"
            },
            "&.Mui-disabled": {
              bgcolor: "btnHover"
            }
          }}
          endIcon={(isDownloading) ? <CircularProgress size={20} sx={{color: "red"}} /> : null}
          onClick={(event) => {
            dispatch(setIsDownloading(!isDownloading));
            dispatch(setSubmittedCode(codeInEditor.current));
            const controller = controllerRef.current;
            const abortSignal = controller.signal;
            if (!isDownloading) {
              xFetch.setSignal(abortSignal).compile(currentWs.id, menuOptions[selectedIndex], {codeText: codeInEditor.current})
                .then(response => response.json())
                .then((response) => {
                  if (response.generatedFile) {
                    response.recentOperation.replace("Compile", "Compile-Download");
                    const [filename, fileFormat] = response.generatedFile.split(".");
                    const link = document.createElement("a");
                    link.href = `/users?action=download&filename=${filename}&fileFormat=${fileFormat}&distFilename=${currentWs.name}`;
                    link.click();
                    dispatch(setOutput(response));
                  }
                })
                .finally(() => dispatch(setIsDownloading(false)))
                .catch((err) => console.log(err));
            } else {
              setIsDownloading(false);
              controller.abort();
              controllerRef.current = new AbortController();
            }
          }}          
        >
          {
            (isDownloading) ? 
              <StopIcon sx={{color: "red"}} /> :
              <DownloadIcon sx={{color: "blue"}} />
          }
          <span style={{width: "40px", color: "black", textAlign: "center", paddingTop: "2px"}}>
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
            },
            "&.Mui-disabled": {
              bgcolor: "btnHover"
            }            
          }}
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          disabled={isDownloading}
        >
          <ArrowDropDownIcon sx={{color: "black"}}/>
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          "& div": {mt: "4px"},
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
