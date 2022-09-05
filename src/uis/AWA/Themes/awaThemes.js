import { createTheme } from "@material-ui/core/styles";
import { grey, red, pink, orange, deepOrange, blue, green, blueGrey } from "@material-ui/core/colors";

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Common Data
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const white = "#FFFFFF";
const whitesmoke = "#F5F5F5";
const vividgrey = "#E0E0E0";
const lightgrey = "#D3D3D3";
const semidarkgrey = "#aba8b7";
const darkgrey = "#A9A9A9";
const dimgrey = "#5d6980";
const deepgrey = "#424242";
const greyedblue = "#282C34";
const semigreyedblue = "#323844";
const lightgreyedblue = "#717e91";
const dimorange = "#ef6c00";
const semired = "#F44336";
const pureRed = "#FF0000";
const dimgreen = "#2E7D32";
const lightblue = "#B9D6E0";
const deepblue = "#283593";
const black = "#000000";

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

const common = {
  black, white, whitesmoke, grey, red, pink, orange, deepOrange, blue, green, blueGrey,
  vividgrey, lightgrey, semidarkgrey, darkgrey, dimgrey, deepgrey, greyedblue, semigreyedblue,
  lightgreyedblue, dimorange, semired, pureRed, dimgreen, lightblue, deepblue,
};
const awaPrimary = {
  awaLight: whitesmoke,
  awaMain: lightgrey,
  awaDark: darkgrey,
  awaContrastText: black,
};
const hover = {
  buttonHover: vividgrey,
  tabHover: darkgrey,
  wsItemHover: semidarkgrey,
  menuItemHover: grey[500],
};
const outline = {
  panelBorder: grey[700],
  radio: white,
  radioChecked: pureRed,
  input: deepblue,
  inputError: pureRed,
};
const error = {
  light: red[300],
  main: red[500],
  dark: red[900],
  contrastText: black,
};
const text = {
  commonLight: whitesmoke,
  commonDark: black,
  primaryHighlight: pureRed,
  secondaryHighlight: blue[500],
  active: pureRed,
  disabled: lightgrey,
  hint: blue[500],
};
const icon = {
  home: white,
  settings: white,
  wiki: orange[700],
  add: whitesmoke,
  upload: blue[500],
  download: blue[500],
  run: green[500],
  stop: red[500],
  progress: pureRed,
  erase: pureRed,
  delete: pureRed,
  reset: pureRed,
  headerArrow: grey[700],

  homeHover: pureRed,
  settingsHover: pureRed,
  wikiHover: orange[700],
  addHover: blue[100],
  uploadHover: blue[500],
  downloadHover: blue[500],
  runHover: green[500],
  stopHover: red[500],
  eraseHover: pureRed,
  deleteHover: pureRed,
  resetHover: pureRed,
  headerArrowHover: red[500],
};
const divider = {
  primaryDark: "rgba(0, 0, 0, 0.75)",
  secondaryDark: "rgba(0, 0, 0, 0.25)",
  primaryLight: "rgba(255, 255, 255, 0.75)",
  secondaryLight: "rgba(255, 255, 255, 0.25)",
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Light Theme
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const lightTheme = createTheme({
  overrides: {...overrides},
  props: {...props},
  palette: {
    common,
    awaPrimary,
    background: {
      module: darkgrey,
      moduleContrast: grey[200],
      panel: whitesmoke,
      panelContrast: darkgrey,
      sideBar: darkgrey,
      dialog: darkgrey,
      tab: darkgrey,
      menu: darkgrey,
      headerType1: whitesmoke,
      headerType2: grey[500],
      headerType3: semidarkgrey,
      headerType4: darkgrey,
      console: darkgrey,
      popUpPanel: darkgrey,
      buttons: vividgrey,
      workspaceItemsHover: semidarkgrey,
    },
    hover: {
      ...hover,
      wsItemHover: grey[400],
    },
    outline,
    error,
    text: {
      amaPrimary: white,
      amaSecondary: whitesmoke,
      amaPrimaryContrast: black,
      amaSecondaryContrast: grey[900],
      ...text,
    },
    icon,
    divider: {
      ...divider,
    }
  }
});

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Dark Theme
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const darkTheme = createTheme({
  overrides: {...overrides},
  props: {...props},
  palette: {
    common,
    awaPrimary: {
      ...awaPrimary,
      awaContrastText: whitesmoke,
    },
    background: {
      module: greyedblue,
      moduleContrast: grey[200],
      panel: semigreyedblue,
      panelContrast: lightgrey,
      sideBar: greyedblue,
      dialog: semigreyedblue,
      tab: semigreyedblue,
      menu: greyedblue,
      headerType1: whitesmoke,
      headerType2: dimgrey,
      headerType3: semigreyedblue,
      headerType4: semidarkgrey,
      console: darkgrey,
      popUpPanel: darkgrey,
      buttons: vividgrey,
    },
    hover,
    outline,
    error,
    text: {
      awaPrimary: black,
      awaSecondary: grey[900],
      awaPrimaryContrast: white,
      awaSecondaryContrast: whitesmoke,
      ...text,
    },
    icon,
    divider: {
      ...divider,
    }
  },
});

