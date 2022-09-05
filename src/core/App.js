import { useEffect } from "react";
import { useSelector } from "react-redux";
import { themeSelector } from "../store/selectors.js";
import { StylesProvider, jssPreset, ThemeProvider } from "@material-ui/core/styles";
import { AWAPlatform } from "../uis/AWA/Components/AWAPlatform/AWAPlatform";
import { darkTheme, lightTheme } from "../uis/AWA/Themes/awaThemes";
import { create } from 'jss';
import jssPluginSyntaxExtend from "jss-plugin-extend";

const jssExtended = create({
  plugins: [...jssPreset().plugins, jssPluginSyntaxExtend()],
});

export const App = ({UCID=0, asyVersion="unknown", ...props}) => {
  const appliedTheme = useSelector(themeSelector);
  useEffect(() => {}, [appliedTheme]);

  return (
    <StylesProvider jss={jssExtended}>
      <ThemeProvider theme={(appliedTheme === "darkTheme")? darkTheme: lightTheme}>
          <AWAPlatform UCID={UCID} asyVersion={asyVersion}/>
      </ThemeProvider>
    </StylesProvider>
  );
}
