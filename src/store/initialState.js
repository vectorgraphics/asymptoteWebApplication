import { deepCopy } from "../utils/generalTools";
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
    checkedoutWorkspaceId: "1",
    workspacesIdOrder: ["1"],
    entities: {
      "1": {
        name: "workspace",
        // activeModule: "Code Module",
        activeModule: "Graph Module",
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
      Labels: {

      },
      pens: {

      },
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
          omitLabels: "",
          min: "",
          max: "",
          align: "NoAlign",
          axisLocation: "bottom",
          scale: "linear",
          extend: true,
          axisPen: "",
          endArrow: "None",
          ticks: "NoTicks",
          ticksLabel: "",
          ticksLabelFormat: "",
          ticksExtend: true,
          omitTicks: "",
          omitTicksLabels: "",
          majorTicksDivision: "",
          minorTicksDivision: "",
          majorTicksSteps: "",
          minorTicksSteps: "",
          majorTicksSize: "",
          minorTicksSize: "",
          majorTicksPen: "",
          minorTicksPen: "",
        }
      },
      verticalAxes: {
        "1": {
          label: "",
          relativePosition: 1,
          omitLabels: "",
          min: "",
          max: "",
          align: "NoAlign",
          axisLocation: "left",
          scale: "linear",
          extend: true,
          axisPen: "",
          endArrow: "None",
          ticks: "NoTicks",
          ticksLabel: "",
          ticksLabelFormat: "",
          ticksExtend: true,
          omitTicks: "",
          omitTicksLabels: "",
          majorTicksDivision: "",
          minorTicksDivision: "",
          majorTicksSteps: "",
          minorTicksSteps: "",
          majorTicksSize: "",
          minorTicksSize: "",
          majorTicksPen: "",
          minorTicksPen: "",
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
              funcLabel: "",
              funcLabelPos: "",
              funcLabelAlign: "NoAlign",
              funcLabelPen: "",
              funcLabelFill: "UnFill",
              funcFormula: "",
              lBound : "",
              uBound: "",
              parName: "",
              parLabel: "",
              parValues: "",
              conditionFunc: "return true;",
              joinOp: "straight",
              joinOpFunc: "",
              markerType: "circle",
              markerSize: "",
              markerFill: "fill",
              markerColor: "White",
              curvePen: "",
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

