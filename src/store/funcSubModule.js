import { deepCopy } from "../utils/generalTools";
import { slices } from "./initialState";
import { wsActions } from "./workspaces";
import {glActions} from "./globals";

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  GRAPH MODULE ACTIONS
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const fsmActions = {
  addFunction:    "addFunction",
  removeFunction: "removeFunction",
  resetFunction:  "resetFunction",
}
const feActions = {
  checkOutFunction: "checkOutFunction",
  setVariableName: "setVariableName",
};
const flActions = {
  updateFunction: "updateFunction",
  eraseFunction:  "eraseFunction",
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%  GRAPH MODULE ACTION CREATORS
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const fsmActionCreator = {
  addFunction: (id, fId) => {
    return {
      type: fsmActions.addFunction,
      payload: {
        id: id,
        fId: fId,
      }
    };
  },
  removeFunction: (id, fId) => {
    return {
      type: fsmActions.removeFunction,
      payload: {
        id: id,
        fId: fId,
      },
    };
  },
  resetFunction: (id) => {
    return {
      type: fsmActions.resetFunction,
      payload: {
        id: id,
      },
    };
  },
};

export const feActionCreator = {
  checkOutFunction: (id, fId) => {
    return {
      type: feActions.checkOutFunction,
      payload: {
        id: id,
        fId: fId,
      },
    }
  },
  setVariableName: (id, variableName) => {
    return {
      type: feActions.setVariableName,
      payload: {
        id: id,
        variableName: variableName,
      },
    }
  },
};

export const flActionCreator = {
  updateFunction: (id, fId, fieldName, filedValue) => {
    return {
      type: flActions.updateFunction,
      payload: {
        id: id,
        fId: fId,
        field: filedValue,
      },
      meta: fieldName,
    }
  },
  eraseFunction: (id, fId) => {
    return {
      type: flActions.eraseFunction,
      payload: {
        id: id,
        fId: fId,
      },
    };
  },
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  FUNCMODULE REDUCERS
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const funcEntities = (state = {}, action) => {
  const newCopy = deepCopy(state);
  switch (action.type) {
    case wsActions.add:
      newCopy[action.payload.id] = {...slices.funcEntities["1"]};
      return newCopy;
    case wsActions.remove:
      delete newCopy[action.payload.id];
      return newCopy;
    case glActions.resetApplication:
      return slices.workspaces.graphModule.funcSubModule.funcEntities;
    case fsmActions.addFunction:
      newCopy[action.payload.id].checkedOutFuncId = action.payload.fId;
      newCopy[action.payload.id].functionsOrder.push(action.payload.fId);
      return newCopy;
    case fsmActions.removeFunction:
      const stateSlice = state[action.payload.id].functionsOrder;
      const index = stateSlice.indexOf(action.payload.fId);
      if (index === 0) {
        newCopy[action.payload.id].functionsOrder = [...stateSlice.slice(1)];
      } else if (index === stateSlice.length - 1) {
        newCopy[action.payload.id].functionsOrder = [...stateSlice.slice(0, index)];
      } else {
        newCopy[action.payload.id].functionsOrder = [...stateSlice.slice(0, index), ...stateSlice.slice(index + 1)];
      }
      return newCopy;
    case fsmActions.resetFunction:
      newCopy[action.payload.id] = {...slices.funcEntities};
      return newCopy;
    case feActions.checkOutFunction:
      newCopy[action.payload.id].checkedOutFuncId = action.payload.fId;
      return newCopy;
    case feActions.setVariableName:
      newCopy[action.payload.id].variableName = action.payload.variableName;
      return newCopy;
    default:
      return state;
  }
}
export const funcList = (state = {}, action) => {
  const newCopy = deepCopy(state);
  switch (action.type) {
    case wsActions.add:
      newCopy[action.payload.id] = {...slices.funcList["1"]};
      return newCopy;
    case wsActions.remove:
      delete newCopy[action.payload.id];
      return newCopy;
    case glActions.resetApplication:
      return slices.workspaces.graphModule.funcSubModule.funcList;
    case fsmActions.addFunction:
      newCopy[action.payload.id][action.payload.fId] = {...slices.funcList["1"]["f1"]};
      return newCopy;
    case fsmActions.removeFunction:
      delete newCopy[action.payload.id][action.payload.fId];
      return newCopy;
    case flActions.updateFunction:
      newCopy[action.payload.id][action.payload.fId][action.meta] = action.payload.field;
      return newCopy;
    case flActions.eraseFunction:
      newCopy[action.payload.id][action.payload.fId] = {...slices.funcList["1"]["f1"]};
      return newCopy;
    default:
      return state;
  }
}

