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
    common: {
      SidBar_Bg: "#282C34",
      SidBarTabs_Bg: "#323844",
      // ControlPanel_Bg: "#5B6370",
      ControlPanel_Bg: "#3C4353",
      ModulePanel_Bg: "#282C34",
      WorkspaceHeader: "#36393F",
      panelBg_5: "#AAB2BF",
    }
  }
})