import './App.css';
import { ThemeProvider } from "@material-ui/core/styles";
import { asymptoteTheme } from "../uis/AWA/Theme/asymptoteTheme";
import { AWAPlatform } from "../uis/AWA/Components/AWAPlatform/AWAPlatform";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={asymptoteTheme}>
        <AWAPlatform/>
      </ThemeProvider>
    </div>
  );
}

export default App;
