import { cloneDeep } from "lodash-es";
import { slices } from "./initialState";
import { wsActions } from "./workspaces";
import { glActions } from "./globals";

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%  CodeModule Actions, Action Creators & Reducers
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const cmActions = {
  // codeModule particular actions
  setCodeContent:   "setCodeContent",
  setOutFormat:     "setOutFormat",
  setStdin:         "setStdin",
  updateOutput:     "updateOutput",
  resetCodeModule:  "resetCodeModule",
};

export const cmActionCreator = {
  setCodeContent: function (id, codeContent) {
    return {
      type: cmActions.setCodeContent,
      payload: {
        id: id,
        codeContent: codeContent
      }
    };
  },
  setOutFormat: function (id, outFormat) {
    return {
      type: cmActions.setOutFormat,
      payload: {
        id: id,
        outFormat: outFormat,
      },
    };
  },
  setStdin: function (id, stdin) {
    return {
      type: cmActions.setStdin,
      payload: {
        id: id,
        stdin: stdin
      },
    };
  },
  updateOutput: function (id, output) {
    return {
      type: cmActions.updateOutput,
      payload: {
        id: id,
        output: output
      },
    };
  },
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
    case cmActions.setCodeContent:
      newCopy[action.payload.id].input.codeContent = action.payload.codeContent;
      return newCopy;
    case cmActions.setOutFormat:
      newCopy[action.payload.id].input.outFormat = action.payload.outFormat;
      return newCopy;
    case cmActions.setStdin:
      newCopy[action.payload.id].input.stdin = action.payload.stdin;
      return newCopy;
    case cmActions.updateOutput:
      newCopy[action.payload.id].output = action.payload.output;
      return newCopy;
    default:
      return state
  }
}

