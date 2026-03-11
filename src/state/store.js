import { configureStore } from "@reduxjs/toolkit";
import appGlobalSlice from "./slices/editorSettingsSlice.js";
import editorSettingsReducer from "./slices/editorSettingsSlice.js";
import workspacesReducer from "./slices/workspacesSlice.js";
import workspacesInfoReducer from "./slices/workspacesInfoSlice.js";
import outputsReducer from "./slices/outputsSlice.js";
import inputsReducer from "./slices/inputsSlice.js";
import actionDecorator from "../state/middleware/actionDecorator.js";

export const store = configureStore({
  reducer: {
    appGlobals: appGlobalSlice,
    editorSettings: editorSettingsReducer,
    workspacesInfo: workspacesInfoReducer,
    workspaces: workspacesReducer,
    inputs: inputsReducer,
    outputs: outputsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(actionDecorator),
});


