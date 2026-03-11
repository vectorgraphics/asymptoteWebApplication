import { StrictMode, Profiler } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { App } from "/src/App/App.jsx";
import { awaTheme } from "../theme/awaTheme.js";
import { store } from "../state/store.js";
import "./index.css";

createRoot(document.getElementById('root')).render(
    <Profiler id="App">
      <ThemeProvider theme={awaTheme} defaultMode="dark" noSsr disableTransitionOnChange>
        <Provider store={store}>
          <App/>
        </Provider>
      </ThemeProvider>
    </Profiler>
)

