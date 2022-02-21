import { createTheme } from "@material-ui/core/styles";

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Common Data
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const colors = {
  white: "#FFFFFF",
  whitesmoke: "#F5F5F5",
  vividgrey: "#E0E0E0",
  lightgrey: "#D3D3D3",
  semidarkgrey: "#aba8b7",
  darkgrey: "#A9A9A9",
  dimgrey: "#5d6980",
  deepgrey: "#424242",
  greyedblue: "#282C34",
  semigreyedblue: "#323844",
  lightgreyedblue: "#717e91",
  dimorange: "#ef6c00",
  semired: "#F44336",
  red: "#FF0000",
  dimgreen: "#2E7D32",
  lightblue: "#B9D6E0",
  deepblue: "#283593",
  black: "#000000",
}

const overrides = {
  MuiButton: {
    root: {
      textTransform: "none",
    },
  },
  MuiTab: {
    root: {
      textTransform: "none",
    },
  },
}

const props = {
  MuiButton: {
    disableRipple: true,
  },
  MuiButtonGroup: {
    disableRipple: true,
  },
  MuiTab: {
    disableRipple: true,
  },
  MuiMenuItem: {
    disableRipple: true,
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Light Theme
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const lightTheme = createTheme({
  overrides: {...overrides},
  props: {...props},
  palette: {
    background: {
      SideBar: colors.darkgrey,
      SideBarTabs: colors.darkgrey,
      SideBarTabsHover: colors.darkgrey,
      ControlMenu: colors.darkgrey,
      ControlPanel: colors.whitesmoke,
      WorkspaceHeader: colors.lightgrey,
      WorkspaceBody: colors.whitesmoke,
      WorkspaceCont: colors.whitesmoke,
      LogoPane: colors.whitesmoke,
      CtrlBar: colors.darkgrey,
      ModulePanel: colors.lightgrey,
      GraphModule: colors.lightgrey,
      GMAppBar: colors.deepgrey,
      Editor: colors.darkgrey,
      Preview: colors.whitesmoke,
      Buttons: colors.vividgrey,
      ButtonsHover: colors.vividgrey,
      WorkspaceItemsHover: colors.semidarkgrey,
      Dialog: colors.darkgrey,
      Header1: colors.dimgrey,
      Header2: colors.lightgrey,
      Header3: colors.semidarkgrey,
      // Header2: "#bcaaa4",
    },
    outline: {
      RadioCircle: colors.white,
      RadioCircleChecked: colors.red,
      InputBorder: colors.deepblue,
      InputErrorBorder: colors.red,
    },
    text: {
      PrimaryLight: colors.white,
      PrimaryDark: colors.black,
      SideBarTabs: colors.white,
      SideBarTabsClicked: colors.red,
      HeaderTitles: colors.white,
      WorkspaceHeader: colors.whitesmoke,
      WorkspaceItem: colors.black,
      WorkspaceSelectedItem: colors.red,
      DialogTitle: colors.black,
      DialogContent: colors.black,
      InputLabel: colors.deepblue,
      InputContent: colors.black,
      InputError: colors.red,
      ErrorLabel: colors.red,
      Buttons: colors.black,
      RadioBtn: colors.black,
      Activated: colors.red,
      AsyVersion: colors.black,
    },
    icon: {
      SideBarControls: colors.white,
      SideBarControlsHover: colors.red,
      Wiki: colors.dimorange,
      Upload: colors.deepblue,
      Download: colors.deepblue,
      Run: colors.dimgreen,
      Stop: colors.semired,
      Clear: colors.red,
      Add: colors.whitesmoke,
      AddHover: colors.red,
    },
  }
});



// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Dark Theme
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const darkTheme = createTheme({
  overrides: {...overrides},
  props: {...props},
  palette: {
    background: {
      SideBar: colors.greyedblue,
      SideBarTabs: colors.semigreyedblue,
      SideBarTabsHover: colors.lightgreyedblue,
      ControlMenu: colors.greyedblue,
      ControlPanel: colors.greyedblue,
      WorkspaceCont: colors.semigreyedblue,
      WorkspaceBody: colors.semigreyedblue,
      WorkspaceHeader: colors.lightgrey,
      WorkspaceItemsHover: colors.semidarkgrey,
      LogoPane: colors.semigreyedblue,
      CtrlBar: colors.darkgrey,
      ModulePanel: colors.greyedblue,
      GraphModule: colors.lightgrey,
      GMAppBar: colors.deepgrey,
      Editor: colors.darkgrey,
      Preview: colors.whitesmoke,
      Buttons: colors.vividgrey,
      ButtonsHover: colors.vividgrey,
      Dialog: colors.greyedblue,
      Header1: colors.dimgrey,
      Header2: colors.lightgrey,
      Header3: colors.semidarkgrey,
    },
    text: {
      PrimaryLight: colors.white,
      PrimaryDark: colors.black,
      SideBarTabs: colors.white,
      SideBarTabsClicked: colors.red,
      HeaderTitles: colors.white,
      WorkspaceHeader: colors.whitesmoke,
      WorkspaceItem: colors.white,
      WorkspaceSelectedItem: colors.red,
      DialogTitle: colors.white,
      DialogContent: colors.white,
      InputLabel: colors.lightblue,
      InputContent: colors.white,
      InputError: colors.red,
      ErrorLabel: colors.red,
      Buttons: colors.black,
      RadioBtn: colors.white,
      Activated: colors.red,
      AsyVersion: colors.whitesmoke,
    },
    icon: {
      SideBarControls: colors.white,
      SideBarControlsHover: colors.red,
      Wiki: colors.dimorange,
      Upload: colors.deepblue,
      Download: colors.deepblue,
      Run: colors.dimgreen,
      Stop: colors.semired,
      Clear: colors.red,
      Add: colors.whitesmoke,
      AddHover: colors.red,
    },
  }
});


