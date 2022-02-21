import { slices } from "./initialState";
import { glActions } from "./globals";
import { cloneDeep } from "lodash-es";

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Workspace Actions, Action Creators & Reducers
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const wsActions = {
  // The following actions *** MUST BE ALSO IMPLEMENTED *** in entities, codeModule, and graphModule reducers
  add:    "add",
  remove: "remove",
  resetWorkspaces:  "resetWorkspaces",
  // workspaceIDs particular actions
  checkout:    "checkout",
  changeOrder: "changeOrder",
};

export const wsActionCreator = {
  checkout: (id) => {
    return {
      type: wsActions.checkout,
      payload: {
        id: id,
      }
    };
  },
  add: (id) => {
    return {
      type: wsActions.add,
      payload: {
        id: id,
      }
    };
  },
  remove: (id) => {
    return {
      type: wsActions.remove,
      payload: {
        id: id
      },
    };
  },
  changeOrder: (grabbedId, targetId) => {
    return {
      type: wsActions.changeOrder,
      payload: {
        grabbedId: grabbedId,
        targetId: targetId,
      },
    };
  },
}

export function checkedOutWorkspaceId(state = "", action) {
  switch (action.type) {
    case wsActions.add:
      return action.payload.id;
    case wsActions.checkout:
      return action.payload.id;
    case glActions.resetApplication:
      return slices.workspaces.checkedOutWorkspaceId;
    default:
      return state;
  }
}

export function workspacesIdOrder(state = [], action) {
  switch (action.type) {
    case wsActions.add:
      return [...state, action.payload.id];
    case wsActions.remove:
      const index = state.indexOf(action.payload.id);
      if (index === 0) {
        return [...state.slice(1)];
      } else if (index === state.length - 1) {
        return [...state.slice(0, index)];
      } else {
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
    case glActions.resetApplication:
      return slices.workspaces.workspacesIdOrder;
    default:
      return state;
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Entities Actions, Action Creators & Reducers
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const enActions = {
  // entities particular actions
  rename:             "rename",
  setActiveModule:    "setActiveModule",
  reRenderEditor:     "reRenderEditor",
  setEditorPaneView:  "setEditorPaneView",
  setPreviewPaneView: "setPreviewPaneView",
};

export const enActionCreator = {
  rename: function (id, newName) {
    return {
      type: enActions.rename,
      payload: {
        id: id,
        name: newName,
      },
    };
  },
  setActiveModule: function (id, moduleName) {
    return {
      type: enActions.setActiveModule,
      payload: {
        id: id,
        activeModule: moduleName,
      },
    };
  },
  reRenderEditor: function (id, value) {
    return {
      type: enActions.reRenderEditor,
      payload: {
        id: id,
        editorReRender: value
      },
    };
  },
  setEditorPaneView: function (id, viewStatus) {
    return {
      type: enActions.setEditorPaneView,
      payload: {
        id: id,
        editorPaneView: viewStatus,
      },
    };
  },
  setPreviewPaneView: function (id, viewStatus) {
    return {
      type: enActions.setPreviewPaneView,
      payload: {
        id: id,
        previewPaneView: viewStatus,
      },
    };
  },
};

export function entities(state = {}, action) {
  const newCopy = cloneDeep(state);
  switch (action.type) {
    case wsActions.add:
      newCopy[action.payload.id] = {...slices.entities};
      return newCopy;
    case wsActions.remove:
      delete newCopy[action.payload.id];
      return newCopy;
    case glActions.resetApplication:
      return slices.workspaces.entities
    case enActions.rename:
      newCopy[action.payload.id].name = action.payload.name;
      return newCopy;
    case enActions.setActiveModule:
      newCopy[action.payload.id].activeModule = action.payload.activeModule;
      return newCopy;
    case enActions.reRenderEditor:
      newCopy[action.payload.id].editorReRender = action.payload.editorReRender;
      return newCopy;
    case enActions.setEditorPaneView:
      newCopy[action.payload.id].editorPaneView = action.payload.editorPaneView;
      return newCopy;
    case enActions.setPreviewPaneView:
      newCopy[action.payload.id].previewPaneView = action.payload.previewPaneView;
      return newCopy;
    default:
      return state;
  }
}

