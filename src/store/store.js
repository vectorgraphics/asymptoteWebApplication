import { createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from "redux-devtools-extension";
import { initialState } from "./initialState";
import { globals } from "./globals";
import { codeModule } from "./codeModule";
import { checkedOutWorkspaceId, workspacesIdOrder, entities } from "./workspaces";
import { functions, axes, pens, Labels, pictures } from "./graphModule";
import { themes } from "./themes";
import { ui } from "./ui";

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                     store
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const store = createStore(combineReducers({
  globals,
  workspaces: combineReducers({
    checkedOutWorkspaceId,
    workspacesIdOrder,
    entities,
    codeModule,
    graphModule: combineReducers({
      functions,
      axes,
      pens,
      Labels,
      // pictures,
    }),
  }),
  ui,
  themes,
}), initialState, devToolsEnhancer());

