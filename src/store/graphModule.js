import { cloneDeep } from "lodash-es";
import { slices } from "./initialState";
import { wsActions } from "./workspaces";
import { glActions } from "./globals";

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  GraphModule Global Action Creators
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const gmActionCreator = {
  add: (id) => {
    return {
      type: wsActions.add,
      payload: {
        id: id,
      },
    };
  },
  remove: (id) => {
    return {
      type: wsActions.remove,
      payload: {
        id: id,
      },
    };
  },
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Functions Actions, Action Creators & Reducers
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const fuActions = {
  addFunction:    "addFunction",
  removeFunction: "removeFunction",
  updateFunction: "updateFunction",
}
export const fuActionCreator = {
  addFunction: (id, funcId, funcObj={}) => {
    return {
      type: fuActions.addFunction,
      payload: {
        id: id,
        funcId: funcId,
        funcObj: funcObj
      },
    };
  },
  removeFunction: (id, funcId) => {
    return {
      type: fuActions.removeFunction,
      payload: {
        id: id,
        funcId: funcId,
      },
    };
  },
  updateFunction: (id, funcId, funcObj={}) => {
    return {
      type: fuActions.updateFunction,
      payload: {
        id: id,
        funcId: funcId,
        funcObj: funcObj,
      },
    };
  },
};

export const functions = (state = {}, action) => {
  const newCopy = cloneDeep(state);
  switch (action.type) {
    case wsActions.add:
      newCopy[action.payload.id] = {};
      return newCopy;
    case wsActions.remove:
      delete newCopy[action.payload.id];
      return newCopy;
    case glActions.resetApplication:
      return slices.workspaces.graphModule.localFunctions;
    case fuActions.addFunction:
      newCopy[action.payload.id][action.payload.funcId] = action.payload.funcObj;
      return newCopy;
    case fuActions.removeFunction:
      delete newCopy[action.payload.id][action.payload.funcId];
      return newCopy;
    case fuActions.updateFunction:
      newCopy[action.payload.id][action.payload.funcId] = action.payload.funcObj;
      return newCopy;
    default:
      return state;
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Axes Actions, Action Creators & Reducers
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const axActions = {
  addAxis:    "addAxis",
  removeAxis: "removeAxis",
  updateAxis: "updateAxis",
}
export const axActionCreator = {
  addAxis: (axisName, axisObj={}) => {
    return {
      type: axActions.addAxis,
      payload: {
        axisName: axisName,
        axisObj: axisObj,
      },
    };
  },
  removeAxis: (axisName) => {
    return {
      type: axActions.removeAxis,
      payload: {
        axisName: axisName,
      },
    };
  },
  updateAxis: (axesId, axesObj={}) => {
    return {
      type: axActions.updateAxis,
      payload: {
        axisId: axesId,
        axisObj: axesObj,
      },
    };
  },
};

export const axes = (state = {}, action) => {
  const newCopy = cloneDeep(state);
  switch (action.type) {
    case axActions.addAxis:
      newCopy[action.payload.axisName] = action.payload.axisObj;
      return newCopy;
    case axActions.removeAxis:
      delete newCopy[action.payload.axisName];
      return newCopy;
    case axActions.updateAxis:
      newCopy[action.payload.axisName] = action.payload.axisObj;
      return newCopy;
    default:
      return state;
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Pens Actions, Action Creators & Reducers
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const peActions = {
  addPen:    "addPen",
  removePen: "removePen",
  updatePen: "updatePen",
};
export const peActionCreator = {
  addPen: (penId, penObj={}) => {
  return {
    type: peActions.addPen,
    payload: {
      penId: penId,
      penObj: penObj,
    }
  }

  },
  removePen: (penId) => {
    return {
      type: peActions.removePen,
      payload: {
        penId: penId,
      },
    };
  },
  updatePen: (penId, penObj) => {
    return {
      type: peActions.updatePen,
      payload: {
        penId: penId,
        penObj: penObj,
      },
    };
  },
};

export const pens = (state = {}, action) => {
  const newCopy = cloneDeep(state);
  switch (action.type) {
    case glActions.resetApplication:
      return slices.workspaces.graphModule.pens;
    case peActions.addPen:
      newCopy[action.payload.penId] = action.payload.penObj;
      return newCopy;
    case peActions.removePen:
      delete newCopy[action.payload.penId];
      return newCopy;
    case peActions.updatePen:
      newCopy[action.payload.penId] = action.payload.penObj;
      return newCopy;
    default:
      return state;
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Labels  Actions, Action Creators & Reducers
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const lbActions = {
  addLabel:    "addLabel",
  removeLabel: "removeLabel",
  updateLabel: "updateLabel",
};
export const lbActionCreator = {
  addLabel: (labelId, labelObj={}) => {
    return {
      type: lbActions.addLabel,
      payload: {
        labelId: labelId,
        labelObj: labelObj,
      },
    };
  },
  removeLabel: (labelId) => {
    return {
      type: lbActions.removeLabel,
      payload: {
        labelId: labelId,
      },
    };
  },
  updateLabel: (labelId, labelObj={}) => {
    return {
      type: lbActions.updateLabel,
      payload: {
        labelId: labelId,
        labelObj: labelObj,
      },
    };
  },
};

export const Labels = (state = {}, action) => {
  const newCopy = cloneDeep(state);
  switch (action.type) {
    case glActions.resetApplication:
      return slices.workspaces.graphModule.labels;
    case lbActions.addLabel:
      newCopy[action.payload.labelId] = action.payload.labelObj;
      return newCopy;
    case lbActions.removeLabel:
      delete newCopy[action.payload.labelId];
      return newCopy;
    case lbActions.updateLabel:
      newCopy[action.payload.labelId] = action.payload.labelObj;
      return newCopy;
    default:
      return state;
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Pictures Actions, Action Creators & Reducers
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const piActions = {
  addPicture:    "addPicture",
  removePicture: "removePicture",
  updatePicture: "updatePicture",
};
export const piActionCreator = {
  addPicture: (picId, picObj={}) => {
    return {
      type: piActions.addPicture,
      payload: {
        picId: picId,
        picObj: picObj,
      },
    };
  },
  removePicture: (picId) => {
    return {
      type: piActions.removePicture,
      payload: {
        picId: picId,
      },
    };
  },
  updatePicture: (picId, picObj={}) => {
    return {
      type: piActions.updatePicture,
      payload: {
        picId: picId,
        picObj: picObj,
      },
    };
  },
};

export const pictures = (state = {}, action) => {
  const newCopy = cloneDeep(state);
  switch (action.type) {
    case glActions.resetApplication:
      return slices.workspaces.graphModule.pictures;
    case piActions.addPicture:
      newCopy[action.payload.picId] = action.payload.picObj;
      return newCopy;
    case piActions.removePicture:
      delete newCopy[action.payload.picId];
      return newCopy;
    case piActions.updatePicture:
      newCopy[action.payload.picId] = action.payload.picObj;
      return newCopy;
    default:
      return state;
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%



// export const funcEntities = (state = {}, action) => {
//   const newCopy = cloneDeep(state);
//   switch (action.type) {
//     case wsActions.add:
//       newCopy[action.payload.id] = {...slices.funcEntities["1"]};
//       return newCopy;
//     case wsActions.remove:
//       delete newCopy[action.payload.id];
//       return newCopy;
//     case glActions.resetApplication:
//       return slices.workspaces.graphModule.funcSubModule.funcEntities;
//     case fsmActions.addFunction:
//       newCopy[action.payload.id].checkedOutFuncId = action.payload.fId;
//       newCopy[action.payload.id].functionsOrder.push(action.payload.fId);
//       return newCopy;
//     case fsmActions.removeFunction:
//       const stateSlice = state[action.payload.id].functionsOrder;
//       const index = stateSlice.indexOf(action.payload.fId);
//       if (index === 0) {
//         newCopy[action.payload.id].functionsOrder = [...stateSlice.slice(1)];
//       } else if (index === stateSlice.length - 1) {
//         newCopy[action.payload.id].functionsOrder = [...stateSlice.slice(0, index)];
//       } else {
//         newCopy[action.payload.id].functionsOrder = [...stateSlice.slice(0, index), ...stateSlice.slice(index + 1)];
//       }
//       return newCopy;
//     case fsmActions.resetFunction:
//       newCopy[action.payload.id] = {...slices.funcEntities};
//       return newCopy;
//     case feActions.checkOutFunction:
//       newCopy[action.payload.id].checkedOutFuncId = action.payload.fId;
//       return newCopy;
//     case feActions.setVariableName:
//       newCopy[action.payload.id].variableName = action.payload.variableName;
//       return newCopy;
//     default:
//       return state;
//   }
// }


