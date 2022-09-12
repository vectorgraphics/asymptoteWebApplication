import { cloneDeep } from "lodash-es";
import { slices } from "./initialState";
import { wsActions } from "./workspaces";
import { glActions } from "./globals";

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%  CodeModule Actions, Action Creators & Reducers
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // codeModule particular actions
const cmActions = {
  setCurrentCode:  "setCurrentCode",
  setOutFormat:    "setOutFormat",
  cmUpdateOutput:  "cmUpdateOutput",
  setShouldUpdate: "setShouldUpdate",
};

export const cmActionCreator = {
  setCurrentCode: (id, currentCode) => ({
    type: cmActions.setCurrentCode,
    payload: {
      id: id,
      currentCode: currentCode,
    }
  }),
  setOutFormat: (id, outFormat) => ({
    type: cmActions.setOutFormat,
    payload: {
      id: id,
      outFormat: outFormat,
    },
  }),
  updateOutput: (id, output) => ({
    type: cmActions.cmUpdateOutput,
    payload: {
      id: id,
      output: output
    },
  }),
  setShouldUpdate: (id, shouldUpdate) => ({
    type: cmActions.setShouldUpdate,
    payload: {
      id: id,
      shouldUpdate: shouldUpdate
    },
  }),
};

export const codeModule = (state = {}, action) => {
  const newCopy = cloneDeep(state);
  switch (action.type) {
    case wsActions.add:
      newCopy[action.payload.id] = {...slices.codeModule};
      return newCopy;
    case wsActions.remove:
      delete newCopy[action.payload.id];
      return newCopy;
    case glActions.resetApplication:
      return slices.workspaces.codeModule;
    case cmActions.setCurrentCode:
      newCopy[action.payload.id].currentCode = action.payload.currentCode;
      return newCopy;
    case cmActions.setOutFormat:
      newCopy[action.payload.id].outFormat = action.payload.outFormat;
      return newCopy;
    case cmActions.cmUpdateOutput:
      newCopy[action.payload.id].output = action.payload.output;
      return newCopy;
    case cmActions.setShouldUpdate:
      newCopy[action.payload.id].output.shouldUpdate = action.payload.output.shouldUpdate;
      return newCopy;
    default:
      return state
  }
}

