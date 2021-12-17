import { deepCopy } from "../utils/generalTools";
import { slices } from "./initialState";
import { wsActions } from "./workspaces";
import { glActions } from "./globals";


// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  GRAPH MODULE ACTIONS
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const geActions = {
  update: "updateGeometries",
  resetGeometry:  "resetGeometry",
};
const haActions = {
  update: "updateHorizontalAxis",
  resetHorizontalAxes:  "resetHorizontalAxes",
};
const vaActions = {
  update: "updateVerticalAxis",
  resetVerticalAxes:  "resetVerticalAxes",
};
const leActions = {
  update: "updateLegend",
};
const piActions = {
  update: "updatePicture",
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%  GRAPH MODULE ACTION CREATORS
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const gmActionCreator = {
  add: (id) => {
    return {
      type: wsActions.add,
      payload: {
        id: id,
      }
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

export const geActionCreator = {
  update: (id, geFieldName, geFieldValue) => {
    return {
      type: geActions.update,
      payload: {
        id: id,
        field: geFieldValue,
      },
      meta: geFieldName,
    }
  },
  resetGeometry: (id) => {
    return {
      type: geActions.resetGeometry,
      payload: {
        id: id,
      },
    };
  },
};
export const haActionCreator = {
  update: (id, haFieldName, haFieldValue) => {
    return {
      type: haActions.update,
      payload: {
        id: id,
        field: haFieldValue,
      },
      meta: haFieldName,
    }
  },
  resetHorizontalAxes: (id) => {
    return {
      type: haActions.resetHorizontalAxes,
      payload: {
        id: id,
      },
    };
  },
};
export const vaActionCreator = {
  update: (id, vaFieldName, vaFieldValue) => {
    return {
      type: vaActions.update,
      payload: {
        id: id,
        field: vaFieldValue,
      },
      meta: vaFieldName,
    }
  },
  resetVerticalAxes: (id) => {
    return {
      type: vaActions.resetVerticalAxes,
      payload: {
        id: id,
      },
    };
  },

};
export const leActionCreator = {

};
export const piActionCreator = {

};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  GRAPHMODULE REDUCERS
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const geometries = (state = {}, action) => {
  const newCopy = deepCopy(state);
  switch (action.type) {
    case wsActions.add:
      newCopy[action.payload.id] = {...slices.geometries};
    return newCopy;
    case wsActions.remove:
      delete newCopy[action.payload.id];
    return newCopy;
    case glActions.resetApplication:
      return slices.workspaces.graphModule.geometries;
    case geActions.resetGeometry:
      newCopy[action.payload.id] = {...slices.geometries};
      return newCopy;
    case geActions.update: {
      const locObj = {...state};
      locObj[action.payload.id][action.meta] = action.payload.field;
      return locObj;
    }
    default:
      return state;
  }
}

export const horizontalAxes = (state = {}, action) => {
  const newCopy = deepCopy(state);
  switch (action.type) {
    case wsActions.add:
      newCopy[action.payload.id] = {...slices.horizontalAxes};
      return newCopy;
    case wsActions.remove:
      delete newCopy[action.payload.id];
      return newCopy;
    case glActions.resetApplication:
      return slices.workspaces.graphModule.horizontalAxes;
    case haActions.resetHorizontalAxes:
      newCopy[action.payload.id] = {...slices.horizontalAxes};
      return newCopy;
    case (haActions.update): {
      const locObj = {...state};
      locObj[action.payload.id][action.meta] = action.payload.field;
      return locObj;
    }
    default:
      return state;
  }
}

export const verticalAxes = (state = {}, action) => {
  const newCopy = deepCopy(state);
  switch (action.type) {
    case wsActions.add:
      newCopy[action.payload.id] = {...slices.verticalAxes};
      return newCopy;
    case wsActions.remove:
      delete newCopy[action.payload.id];
      return newCopy;
    case glActions.resetApplication:
      return slices.workspaces.graphModule.verticalAxes;
    case vaActions.resetVerticalAxes:
      newCopy[action.payload.id] = {...slices.verticalAxes};
      return newCopy;
    case vaActions.update: {
      const locObj = {...state};
      locObj[action.payload.id][action.meta] = action.payload.field;
      return locObj;
    }
    default:
      return state;
  }
}

export const legends = (state = {}, action) => {
  const newCopy = deepCopy(state);
  switch (action.type) {
    case wsActions.add:
      newCopy[action.payload.id] = {...slices.legends};
      return newCopy;
    case wsActions.remove:
      delete newCopy[action.payload.id];
      return newCopy;
    default:
      return state;
  }
}

export const pictures = (state = {}, action) => {
  const newCopy = deepCopy(state);
  switch (action.type) {
    case wsActions.add:
      newCopy[action.payload.id] = {...slices.pictures};
      return newCopy;
    case wsActions.remove:
      delete newCopy[action.payload.id];
      return newCopy;
    default:
      return state;
  }
}

