import './App.css';
import { store } from "../store/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import { darkTheme, lightTheme } from "../uis/AWA/Themes/awaThemes";
import { AWAPlatform } from "../uis/AWA/Components/AWAPlatform/AWAPlatform";

function App({UCID=0, asyVersion="unknown", ...props}) {
  return (
    <Provider store={store}>
      <div className="App">
        <ThemeProvider theme={lightTheme}>
          <AWAPlatform UCID={UCID} asyVersion={asyVersion}/>
        </ThemeProvider>
      </div>
    </Provider>
  );
}

export default App;
