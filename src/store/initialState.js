import { cloneDeep } from "lodash-es";

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%              initialState
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const initialState = {
  globals: {
    uniqueClientId: "-1",
    editorLineNumbers: true,
    editorFontsize: "default",
    editorKeyBinding: "default",
    splitBtnReRender: 0,
    appReset: 0,
    asyVersion: "",
  },
  workspaces: {
    checkedOutWorkspaceId: "ws-1",
    workspacesIdOrder: ["ws-1"],
    entities: {
      "ws-1": {
        name: "workspace",
        // activeModule: "Code Module",
        activeModule: "Graph Module",
        editorReRender: 0,
        editorPaneView: true,
        previewPaneView: true,
      },
    },
    codeModule: {
      "ws-1": {
        input: {
          codeContent: "",
          outFormat: "prev",
          stdin: "",
        },
        output: {
          responseType: null,
          responseText: null,
          path: "",
          errorType: null,
          errorText: null,
          errorCode: null,
          errorContent: null,
          stdout: "",
          stderr: "",
          entryExists: false,
          isUpdated: false,
        },
      },
    },
    graphModule: {
      functions: {
        "ws-1": {}
      },
      axes: {},
      pens: {},
      Labels: {},
      // pictures: {},
    },
  },
  ui: {},
  themes: {},
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%         data model slices
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const initialStateCopy = cloneDeep(initialState);
export const slices = {
  globals:     initialStateCopy.globals,
  workspaces:  initialStateCopy.workspaces,
  entities:    initialStateCopy.workspaces.entities["ws-1"],
  codeModule:  initialStateCopy.workspaces.codeModule["ws-1"],
  functions:   initialStateCopy.workspaces.graphModule.functions["ws-1"],
  axes:        initialStateCopy.workspaces.graphModule.axes,
  pens:        initialStateCopy.workspaces.graphModule.pens,
  Labels:      initialStateCopy.workspaces.graphModule.Labels,
  pictures:    initialStateCopy.workspaces.graphModule.pictures,
}

