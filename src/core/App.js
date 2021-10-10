import './App.css';
import { store } from "../store/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import { asymptoteTheme } from "../uis/AWA/Theme/asymptoteTheme";
import { AWAPlatform } from "../uis/AWA/Components/AWAPlatform/AWAPlatform";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ThemeProvider theme={asymptoteTheme}>
          <AWAPlatform/>
        </ThemeProvider>
      </div>
    </Provider>
  );
}

export default App;
