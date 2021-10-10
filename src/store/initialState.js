import { deepCopy } from "../utils/generalTools";
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%              initialState
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const initialState = {
  globals: {
    uniqueClientId: null,
    editorLineNumbers: true,
    editorFontsize: "default",
    editorKeyBinding: "default",
    splitBtnReRender: 0,
    appReset: 0,
  },
  workspaces: {
    checkedoutWorkspaceId: "1",
    workspacesIdOrder: ["1"],
    entities: {
      "1": {
        name: "workspace",
        activeModule: "Code Module",
        // activeModule: "Graph Module",
        editorReRender: 0,
        editorPaneView: true,
        previewPaneView: true,
      },
    },
    codeModule: {
      "1": {
        input: {
          codeContent: "",
          outformat: "prev",
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
      geometries: {
        "1": {
          width: "",
          height: "",
          aspectRatio: "Aspect",
        },
      },
      horizontalAxes: {
        "1": {
          label: "",
          relativePosition: 1,
          omitLabels: undefined,
          min: undefined,
          max: undefined,
          align: undefined,
          axisLocation: "bottom",
          scale: "linear",
          extend: true,
          axisPen: undefined,
          endArrow: "None",
          ticks: "NoTicks",
          ticksLabel: undefined,
          ticksLabelFormat: undefined,
          ticksExtend: true,
          omitTicks: undefined,
          omitTicksLabels: undefined,
          majorTicksDivision: undefined,
          minorTicksDivision: undefined,
          majorTicksSteps: undefined,
          minorTicksSteps: undefined,
          majorTicksSize: undefined,
          minorTicksSize: undefined,
          majorTicksPen: undefined,
          minorTicksPen: undefined,
        }
      },
      verticalAxes: {
        "1": {
          label: "",
          relativePosition: 1,
          omitLabels: undefined,
          min: undefined,
          max: undefined,
          align: "NoAlign",
          axisLocation: "left",
          scale: "linear",
          extend: true,
          axisPen: undefined,
          endArrow: "None",
          ticks: "NoTicks",
          ticksLabel: "",
          ticksLabelFormat: undefined,
          ticksExtend: true,
          omitTicks: undefined,
          omitTicksLabels: undefined,
          majorTicksDivision: undefined,
          minorTicksDivision: undefined,
          majorTicksSteps: undefined,
          minorTicksSteps: undefined,
          majorTicksSize: undefined,
          minorTicksSize: undefined,
          majorTicksPen: undefined,
          minorTicksPen: undefined,
        }
      },
      legends: {
        "1": {

        },
      },
      pictures: {
        "1": {

        },
      },
      funcSubModule: {
        funcEntities: {
          "1": {
            checkedOutFuncId: "f1",
            functionsOrder: ["f1"],
            variableName: "",
          },
        },
        funcList: {
          "1": {
            "f1": {
              funcName: "",
              funcLabel: undefined,
              funcLabelPos: undefined,
              funcLabelAlign: "NoAlign",
              funcLabelPen: undefined,
              funcLabelFill: "UnFill",
              funcFormula: "",
              lBound : "",
              uBound: "",
              parName: undefined,
              parLabel: undefined,
              parValues: undefined,
              conditionFunc: "return true;",
              joinOp: "straight",
              joinOpFunc: undefined,
              markerType: "circle",
              markerSize: "",
              markerFill: "fill",
              markerColor: "White",
              curvePen: undefined,
              isDrawn: true,
            }
          }
        }
      },
    },
  },
  ui: {},
  themes: {},
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%         data model slices
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const initialStateCopy = deepCopy(initialState);
export const slices = {
  globals:        initialStateCopy.globals,
  workspaces:     initialStateCopy.workspaces,
  entities:       initialStateCopy.workspaces.entities["1"],
  codeModule:     initialStateCopy.workspaces.codeModule["1"],
  geometries:     initialStateCopy.workspaces.graphModule.geometries["1"],
  horizontalAxes: initialStateCopy.workspaces.graphModule.horizontalAxes["1"],
  verticalAxes:   initialStateCopy.workspaces.graphModule.verticalAxes["1"],
  legends:        initialStateCopy.workspaces.graphModule.legends["1"],
  pictures:       initialStateCopy.workspaces.graphModule.pictures["1"],
  funcSubModule:  initialStateCopy.workspaces.graphModule.funcSubModule,
  funcEntities:   initialStateCopy.workspaces.graphModule.funcSubModule.funcEntities,
  funcList:       initialStateCopy.workspaces.graphModule.funcSubModule.funcList,
}

