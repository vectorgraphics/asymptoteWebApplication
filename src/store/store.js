import { createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from "redux-devtools-extension";
import { initialState } from "./initialState";
import { globals } from "./globals";
import { geometries, horizontalAxes, verticalAxes, legends, pictures } from "./graphModule";
import { funcEntities, funcList } from "./funcSubModule";
import { checkedoutWorkspaceId, workspacesIdOrder, entities, codeModule } from "./workspaces";
import { themes } from "./themes";
import { ui } from "./ui";

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                     store
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const store = createStore(combineReducers({
  globals,
  workspaces: combineReducers({
    checkedoutWorkspaceId,
    workspacesIdOrder,
    entities,
    codeModule,
    graphModule: combineReducers({
      geometries,
      horizontalAxes,
      verticalAxes,
      legends,
      pictures,
      funcSubModule: combineReducers({
        funcEntities,
        funcList,
      }),
    }),
  }),
  ui,
  themes,
}), initialState, devToolsEnhancer());

