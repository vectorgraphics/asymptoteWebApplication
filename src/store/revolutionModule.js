import { cloneDeep } from "lodash-es";
import { slices } from "./initialState";
import { wsActions } from "./workspaces";
import { glActions } from "./globals";

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  RevolutionModule Global Action Creators
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const rmActions = {
  setInputs: "setInputs",
  resetFormula: "resetFormula",
  rmUpdateOutput: "rmUpdateOutput",
}
export const rmActionCreator = {
  setInputs: (id, inputObj) => ({
    type: rmActions.setInputs,
    payload: {
      id: id,
      input: inputObj,
    },
  }),
  resetFormula: (id) => ({
    type: rmActions.resetFormula,
    payload: {
      id: id,
    },
  }),
  updateOutput: (id, outputObj) => ({
    type: rmActions.rmUpdateOutput,
    payload: {
      id: id,
      output: outputObj,
    },
  }),
};

export const revolutionModule = (state = {}, action) => {
  const newCopy = cloneDeep(state);
  switch (action.type) {
    case wsActions.add:
      newCopy[action.payload.id] = {...slices.revolution};
      return newCopy;
    case wsActions.remove:
      delete newCopy[action.payload.id];
      return newCopy;
    case glActions.resetApplication:
      return slices.revolution;
    case rmActions.setInputs:
      newCopy[action.payload.id].input = action.payload.input;
      return newCopy;
    case rmActions.rmUpdateOutput:
      newCopy[action.payload.id].output = action.payload.output;
      return newCopy;
    case rmActions.resetFormula:
      newCopy[action.payload.id].input = slices.revolution.input;
      return newCopy;
    default:
      return state;
  }
}
