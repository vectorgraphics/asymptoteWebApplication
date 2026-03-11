import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { AddIcon, DeleteIcon, RenameIcon } from "../../../assets/icons/AppIcons.jsx";
import { NameInputDialog } from "./NameInputDialog.jsx";
import { DeleteDialog } from "./DeleteDialog.jsx";
import { setCurrentWS, selectCurrentWsId, selectWsIds, selectWsIdsAndNames } from "../../../state/slices/workspacesInfoSlice.js";
import { removeWS } from "../../../state/slices/workspacesSlice.js";

export const WorkspaceMenu = ({isMenuOpen=false, onMenuClose=()=>{}, ...props}) => {
  const [isDialogOpen, setIsDialogOpen] = useState({
    inputDialog: false,
    deleteDialog: false,
  });
  
  const [selectionText, setSelectionText] = useState(null);
  const dispatch = useDispatch();
  const currentWsId = useSelector(selectCurrentWsId);
  const wsIds = useSelector(selectWsIds);
  const wsIdsAndNames = useSelector(selectWsIdsAndNames);

  const onDelete = () => {
    dispatch(removeWS(currentWsId));
    setIsDialogOpen((prevState) => ({...prevState, deleteDialog: false}));
  };

  return (
    <>
      <Drawer
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "background.light",
            backgroundImage: "none",
            borderRight: "1px solid grey",
          }
        }}
        aria-hidden={false}
        anchor={"left"}
        open={isMenuOpen}
        onClose={(event) => {
          if ((event.type === "keydown" && event.key === "Escape") || event.type === "click") {
            onMenuClose();
          }
          return;
        }}
      >
        <Box sx={{width: 325}} role="presentation">
          <Box 
            sx={(theme) => ({
              display: "flex",
              width: 1,
              height: "75px",
              fontWeight: "bold",
              fontSize: "2rem",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: `4px double ${theme.palette.text.primary}`,
            })}
          > 
            <Box sx={{ml: "1rem"}} > Workspaces </Box> 
            <AddIcon fontSize="large"
              sx={{
                mr: "1rem",
                color: "lightgrey",
                "&:hover": {
                  color: "red"
                }
              }} 
              onClick={() => setIsDialogOpen((prevState) => ({...prevState, inputDialog: true}))}
            />
          </Box>
          <List>
            {wsIds.map((wsId, index) => (
              <ListItem key={wsId} disablePadding>
                <ListItemButton
                  sx={(theme) => ({
                    px: "0.5rem",
                    "&:hover": {
                      backgroundColor: theme.alpha(theme.palette.background.main, 0.8),
                      "& svg": {
                        color: theme.palette.grey[600],
                      }
                    }
                  }
                  )}
                  onClick={(event) => {
                    if (event.currentTarget.getAttribute("role") === "button") {
                      if (wsId !== currentWsId) {
                        dispatch(setCurrentWS(wsId));
                      }
                      return;
                    }
                  }}>
                  <ListItemText
                    slotProps={{primary: {sx: {fontSize: "1.25rem"}}}}
                    sx={{color: (wsId === currentWsId) ? "red" : "text.primary"}}
                    primary={wsIdsAndNames[wsId]}
                  />
                  <ListItemIcon
                    sx={{
                      minWidth: "auto",
                      color: "background.light",
                      "& svg:hover": {
                        color: "extraColors.pureRed",
                      }
                    }}
                    onClick={() => {
                      setSelectionText(wsIdsAndNames[wsId]);
                      setIsDialogOpen((prevState) => ({...prevState, inputDialog: true}));
                    }}>
                    <RenameIcon />
                  </ListItemIcon>
                  <ListItemIcon
                    sx={{
                      minWidth: "auto",
                      color: "background.light",
                      "& svg:hover": {
                        color: "extraColors.pureRed",
                      }
                    }}
                    onClick={() => setIsDialogOpen((prevState) => ({...prevState, deleteDialog: true}))}>
                    <DeleteIcon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      {(isDialogOpen.inputDialog)?
        <NameInputDialog
          selectionText={selectionText}  
          isDialogOpen={isDialogOpen.inputDialog} 
          onClose={() => {
            setIsDialogOpen((prevState) => ({...prevState, inputDialog: false}));
            setSelectionText(null);
          }}
        />:null
      }
      {isDialogOpen.deleteDialog && <DeleteDialog 
        isDialogOpen={isDialogOpen.deleteDialog} 
        onClose={() => setIsDialogOpen((prevState) => ({...prevState, deleteDialog: false}))} 
        onDelete={onDelete}
      />}
    </>
  );
};


