import { cloneDeep } from "lodash-es";
import { slices } from "./initialState";
import { wsActions } from "./workspaces";
import { glActions } from "./globals";

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%  CodeModule Actions, Action Creators & Reducers
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // codeModule particular actions
const cmActions = {
  setCode:         "setCode",
  setOutFormat:    "setOutFormat",
  // setStdin:       "setStdin",
  updateOutput:    "updateOutput",
  setShouldUpdate: "setShouldUpdate",
};

export const cmActionCreator = {
  setCode: (id, content, subCode = "currentContent") => {
    return {
      type: cmActions.setCode,
      payload: {
        id: id,
        subCode: subCode,
        content: content
      }
    };
  },
  setOutFormat: (id, outFormat) => {
    return {
      type: cmActions.setOutFormat,
      payload: {
        id: id,
        outFormat: outFormat,
      },
    };
  },
  // setStdin: (id, stdin) => {
  //   return {
  //     type: cmActions.setStdin,
  //     payload: {
  //       id: id,
  //       stdin: stdin
  //     },
  //   };
  // },
  updateOutput: (id, output) => {
    return {
      type: cmActions.updateOutput,
      payload: {
        id: id,
        output: output
      },
    };
  },
  setShouldUpdate: (id, shouldUpdate) => {
    return {
      type: cmActions.updateOutput,
      payload: {
        id: id,
        shouldUpdate: shouldUpdate
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
    case cmActions.setCode:
      newCopy[action.payload.id].code[action.payload.subCode] = action.payload.content;
      return newCopy;
    case cmActions.setOutFormat:
      newCopy[action.payload.id].outFormat = action.payload.outFormat;
      return newCopy;
    // case cmActions.setStdin:
    //   newCopy[action.payload.id].input.stdin = action.payload.stdin;
    //   return newCopy;
    case cmActions.updateOutput:
      newCopy[action.payload.id].output = action.payload.output;
      return newCopy;
    case cmActions.setShouldUpdate:
      newCopy[action.payload.id].shouldUpdate = action.payload.shouldUpdate;
      return newCopy;
    default:
      return state
  }
}

