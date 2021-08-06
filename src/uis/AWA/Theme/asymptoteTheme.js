import { createTheme } from "@material-ui/core/styles";

export const asymptoteTheme = createTheme({
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
      }
    }
  },
  palette: {
    background: {
      SideBar: "#282C34",
      SideBarTabs: "#323844",
      SideBarTabsHover: "#717e91",
      ControlPanel: "#282C34",
      WorkspaceCont: "#3C4353",
      LogoPane: "#3C4353",
      ModulePanel: "#282C34",
      Buttons: "#E0E0E0",
      ButtonsHover: "#E0E0E0",
      WorkspaceItemsHover: "#aba8b7",
      Header1: "#5d6980",
      Header2: "#aba8b7",
      Header3: "#aba8b7",
    },
    text: {
      HeaderTitles1: "#FFFFFF",
      HeaderTitles2: "#FFFFFF",
      SideBarTabs: "#FFFFFF",
      SideBarTabsActivated: "#F44336",
      Buttons: "#000000",
      WorkspaceItems: "#FFFFFF",
      RadioAndCheckbox: "#000000",
    },
    icon: {
      SideBarControls: "#FFFFFF",
      SideBarControlsHover: "#F44336",
      Wiki: "#ef6c00",
      Upload: "#283593",
      Run: "#2E7D32",
      Clear: "#C62828",
    },
    radioAndCheckbox: {
      Selected: "#F44336",
      Unselected: "#FFFFFF",
    },
  }
})