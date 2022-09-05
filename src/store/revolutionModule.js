import { cloneDeep } from "lodash-es";
import { slices } from "./initialState";
import { wsActions } from "./workspaces";
import { glActions } from "./globals";

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  RevolutionModule Global Action Creators
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const rmActions = {
  setFFormula: "setFFormula",
  setGFormula: "setGFormula",
  setXMin: "setXMin",
  setXMax: "setXMax",
  setRotAxisType: "setRotAxisType",
  setRotAxisPos: "setRotAxisPos",
  updateOutput: "updateOutput",
}
export const rmActionCreator = {
  setFFormula: (id, value) => {
    return {
      type: rmActions.setFFormula,
      payload: {
        id: id,
        fFormula: value,
      },
    };
  },
  setGFormula: (id, value) => {
    return {
      type: rmActions.setGFormula,
      payload: {
        id: id,
        gFormula: value,
      },
    };
  },
  setXMin: (id, value) => {
    return {
      type: rmActions.setXMin,
      payload: {
        id: id,
        xMin: value,
      },
    };
  },
  setXMax: (id, value) => {
    return {
      type: rmActions.setXMax,
      payload: {
        id: id,
        xMax: value,
      },
    };
  },
  setRotAxisType: (id, type) => {
    return {
      type: rmActions.setRotAxisType,
      payload: {
        id: id,
        rotAxisType: type,
      },
    };
  },
  setRotAxisPos: (id, pos) => {
    return {
      type: rmActions.setRotAxisPos,
      payload: {
        id: id,
        rotAxisPos: pos,
      },
    };
  },
  updateOutput: (id, outputData) => {
    return {
      type: rmActions.updateOutput,
      payload: {
        id: id,
        output: outputData,
      },
    };
  }
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
    case rmActions.setFFormula:
      newCopy[action.payload.id].fFormula = action.payload.fFormula;
      return newCopy;
    case rmActions.setGFormula:
      newCopy[action.payload.id].gFormula = action.payload.gFormula;
      return newCopy;
    case rmActions.setXMin:
      newCopy[action.payload.id].xMin = action.payload.xMin;
      return newCopy;
    case rmActions.setXMax:
      newCopy[action.payload.id].xMax = action.payload.xMax;
      return newCopy;
    case rmActions.setRotAxisType:
      newCopy[action.payload.id].rotAxisType = action.payload.rotAxisType;
      return newCopy;
    case rmActions.setRotAxisPos:
      newCopy[action.payload.id].rotAxisPos = action.payload.rotAxisPos;
      return newCopy;
    case rmActions.updateOutput:
      newCopy[action.payload.id].output = action.payload.output;
      return newCopy;
    default:
      return state;
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

