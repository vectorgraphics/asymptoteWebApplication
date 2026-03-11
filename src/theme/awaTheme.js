import { createTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import * as muiColors from "@mui/material/colors";

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Extra Color Definitions
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const black = "rgb(0, 0, 0)";
const white = "rgb(255, 255, 255)";
const whiteSmoke = "rgb(245, 245, 245)";
const semiDarkGrey = "#aba8b7";
const dimGrey = "#5d6980";
const deepGrey = "#424242";
const greyBlue = "#282C34";
const semiGreyBlue = "#323844";
const lightGreyBlue = "#717e91";
const dimOrange = "#ef6c00";
const semiRed = "#F44336";
const pureRed = "#FF0000";
const dimGreen = "#2E7D32";
const deepBlue = "#283593";


// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% AWA Base Color Definitions
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const AWABaseColors = {
  darkMode: {
    panelLightestBG: "rgb(71, 76, 86)",
    panelLighterBG: "rgb(71, 76, 86)",
    panelLightBG: "rgb(61, 66, 76)",
    panelMainBG: "rgb(40, 44, 52)",
    panelDarkBG: "rgb(33, 37, 43)",
    panelContrastBG: "rgb(210, 210, 210)",
    bgText: "rgba(0,0,0)",
    primaryText: "rgba(255,255,255,0.87)",
    secondaryText: "rgba(255,255,255,0.6)",
    disabledText: "rgba(255,255,255,0.38)",
    divider: "rgb(11, 12, 15)",
    btnHover: "rgb(147,147,147)",
    btnSelected: "rgb(150,150,150)",
  },
  lightMode: {
    panelLightestBG: "rgb(255, 255, 255)",
    panelLighterBG: "rgb(234, 234, 234)",
    panelLightBG: "rgb(224, 224, 224)",
    panelMainBG: "rgb(210, 210, 210)",
    panelDarkBG: "rgb(170, 170, 170)",
    panelContrastBG: "rgb(155, 155, 155)",
    bgText: "rgba(255,255,255)",
    primaryText: "rgba(0, 0, 0, 0.87)",
    secondaryText: "rgba(0, 0, 0, 0.6)",
    disabledText: "rgba(0, 0, 0, 0.38)",
    divider: "rgba(255,255,255,0.75)",
    btnHover: "rgb(190,190,190)",
    btnSelected: "rgb(150,150,150)",
  },
}

const common = {
  black: black,
  white: white,
  whiteSmoke: whiteSmoke,
}

// const hover = {
//   buttonHover: vividgrey,
//   tabHover: darkgrey,
//   wsItemHover: semidarkgrey,
//   menuItemHover: grey[500],
// };

// const error = {
//   light: red[300],
//   main: red[500],
//   dark: red[900],
//   contrastText: black,
// };

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Theme Custom Tokens
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const extraColors = {
  black, white, whiteSmoke, semiDarkGrey, dimGrey, deepGrey, 
  greyBlue, semiGreyBlue, lightGreyBlue, dimOrange, semiRed, 
  pureRed, dimGreen, deepBlue
};

const codeColors = {
  fg:       "#383A42",
  bg:       "#FAFAFA",
  bg1:     "#E5E5E6",
  bghl:    "#CECECE",
  mono1:   "#383A42",
  mono2:   "#696C77",
  mono3:   "#A0A1A7",
  cyan:     "#0184BC",
  blue1:   "#284686ff",
  blue2:   "#526FFF",
  blue3:   "#4C82B1",
  purple:   "#A626A4",
  green:    "#50A14F",
  red1:    "#E45649",
  red2:    "#CA1243",
  orange1: "#986801",
  orange2: "#C18401",
  gray:     "#EDEDED",
  silver:   "#AAAAAA",
  black:    "#0F1011",
}


const highlighterLight = {
  definitionKeyword: "#A626A4",
  controlKeyword: "#A626A4",
  operatorKeyword: "#A626A4",
  namespace: "#E45649",
  Null: "#C18401",                // Must be Null with capital letter N to avoide collision with builtin type null.
  bool: "#C18401",
  standardTypeName: "#A626A4",
  atom: "magenta",
  typeName: "salmon",
  propertyName: "#383A42",
  functionExpr: "#383A42",
  variableName: "blue",
  functionCall: "blue",
  functionDef: "blue",
  operator: "black",
  arithmeticOperator: "gray",
  logicOperator: "gray",
  compareOperator: "gray",
  definitionOperator: "pink",
  updateOperator: "gray",
  lineComment: "#696C77",
  blockComment: "#696C77",
  number: "orange",
  string: "green",
  escape: "maroon",
  paren: "red",
  squareBracket: "gray",
  brace: "gray",
  angleBracket: "gray",
  separator: "gray",
}

const highlighterDark = {
  definitionKeyword: "#ff76ffff",
  controlKeyword: "#ff76ffff",
  operatorKeyword: "#ff76ffff",
  namespace: "#E45649",
  null: "#C18401",
  bool: "#C18401",
  standardTypeName: "#ff76ffff",
  atom: "#ff76ffff",
  typeName: "salmon",
  propertyName: "white",
  functionExpr: "white",
  variableName: "#45d4ffff",
  functionCall: "#45d4ffff",
  functionDef:  "#45d4ffff",
  definitionOperator: "pink",
  lineComment: "#b9bbc2ff",
  blockComment: "#b9bbc2ff",
  number: "orange",
  string: "lightgreen",
  escape: "maroon",
  operator: "lightgray",
  compareOperator: "lightgray",
  logicOperator: "lightgray",
  arithmeticOperator: "lightgray",
  updateOperator: "lightgray",
  squareBracket: "lightgray",
  brace: "yellow",
  paren: "red",
  angleBracket: "yellow",
  separator: "lightgray",
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Theme Overrides
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none",
      },
    },
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: "none",
      },
    },
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiButtonGroup: {
    defaultProps: {
      disableRipple: true,
    }
  },
  MuiMenuItem: {
    defaultProps: {
      disableRipple: true,
    }
  },
  MuiListItemButton: {
    defaultProps: {
      disableRipple: true,
    }
  },
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  awaTheme Definition
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const awaTheme = createTheme({
  components: components,
  breakpoints: {
    keys: ["mobile", "tablet", "laptop", "desktop"],
    values: {
      "mobile": 0,
      "tablet": 640,
      "laptop": 1024,
      "desktop": 1280,
    }
  },
  alpha: alpha,
  colorSchemes: {
    dark: {
      palette: {
        common: common,
        primary: {
          main: AWABaseColors.lightMode.panelMainBG, // Should be from the lightMode!
        },
        secondary: {
          main: greyBlue,
        },
        background: {
          lightest: AWABaseColors.darkMode.panelLightestBG,
          lighter: AWABaseColors.darkMode.panelLighterBG,
          light: AWABaseColors.darkMode.panelLightBG,
          main: AWABaseColors.darkMode.panelMainBG,
          dark: AWABaseColors.darkMode.panelDarkBG,
          contrast: AWABaseColors.darkMode.panelContrastBG,
        },
        text: {
          bgText: AWABaseColors.darkMode.bgText,
          primary: AWABaseColors.darkMode.primaryText,
          secondary: AWABaseColors.darkMode.secondaryText,
          disabled: AWABaseColors.darkMode.disabledText,
        },
        divider: AWABaseColors.darkMode.divider,
        btnHover: AWABaseColors.darkMode.btnHover,
        btnSelected: AWABaseColors.darkMode.btnSelected,
        extraColors: extraColors,
        muiColors: {...muiColors},
        codeHighlighter: highlighterDark,
        cmGutter: "gray"
      }
    },
    light: {
      palette: {
        common: common,
        primary: {
          main: AWABaseColors.darkMode.panelMainBG, // Should be from darkMode!
        },
        secondary: {
          main: whiteSmoke,
        },
        background: {
          lightest: AWABaseColors.lightMode.panelLightestBG,
          lighter: AWABaseColors.lightMode.panelLighterBG,
          light: AWABaseColors.lightMode.panelLightBG,
          main: AWABaseColors.lightMode.panelMainBG,
          dark: AWABaseColors.lightMode.panelDarkBG,
          contrast: AWABaseColors.lightMode.panelContrastBG,
        },
        text: {
          bgText: AWABaseColors.lightMode.bgText,
          primary: AWABaseColors.lightMode.primaryText,
          secondary: AWABaseColors.lightMode.secondaryText,
          disabled: AWABaseColors.lightMode.disabledText,
        },
        divider: AWABaseColors.lightMode.divider,
        btnHover: AWABaseColors.lightMode.btnHover,
        btnSelected: AWABaseColors.lightMode.btnSelected,
        extraColors: extraColors,
        muiColors: {...muiColors},
        codeHighlighter: highlighterLight,
        cmGutter: "darkgray"
      },
    },
  },
});
