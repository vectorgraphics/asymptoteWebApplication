import { cloneDeep } from "lodash-es";

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Globally Used Data Models
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const previewOutput = {
  serverRes: {
    resType: "",
    resText: "",
    resUrl: ""
  },
  error: {
    errType: null,
    errText: null,
    errCode: null,
    errContent: null,
  },
  stdout: "",
  stderr: "",
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%              initialState
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const initialState = {
  globals: {
    uniqueClientId: "-1",
    editorLineNumbers: true,
    editorFontsize: "default",     // Must be in lowercase for compatibility with Codemirror
    editorKeyBinding: "default",   // Must be in lowercase for compatibility with Codemirror
    splitBtnReRender: 0,
    appReset: true,
    asyVersion: "",
  },
  workspaces: {
    checkedOutWorkspaceId: "ws-1",
    workspacesIdOrder: ["ws-1"],
    entities: {
      "ws-1": {
        name: "workspace",
        activeModule: "Code Module",
        // activeModule: "Revolution Module",
        // activeModule: "Graph Module",
        editorReRender: 0,
        editorPaneView: true,
        previewPaneView: true,
      },
    },
    codeModule: {
      "ws-1": {
        code: {
          lastSuccessful: "",
          lastFailed: "",
          currentContent: "",
        },
        outFormat: "prev",
        output: previewOutput,
        shouldUpdate: false,
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
    revolutionModule: {
      "ws-1": {
        fFormula: "",
        gFormula: "",
        xMin: "0",
        xMax: "0",
        rotAxisType: "Vertical",
        rotAxisPos: "0",
        output: {
          ...previewOutput,
          parentModule: "revolutionModule",
        },
      }
    }
  },
  ui: {},
  themes: {
    appTheme: "darkTheme",
  },
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
  revolution:  initialStateCopy.workspaces.revolutionModule["ws-1"],
}

