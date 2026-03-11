import { createSlice, current } from '@reduxjs/toolkit';

// ==================================  State Slice 
// ===============================================
const initialWS = {
  id: "_$WS",
  name: "Workspace",
  module: "code module",
  isCompiling: false,
  isDownloading: false
};

const workspacesSlice = createSlice({
  name: "workspaces",
  initialState: {
    "_$WS": initialWS,
  },
  reducers: {
    createWS: (state, action) => {
      state[action.payload.id] = {...initialWS, ...action.payload};
    },
    removeWS: (state, action) => {
      delete state[action.payload];
    },
    renameWS: (state, action) => {
      state[action.payload.id].name = action.payload.data;
    },
    setIsCompiling: (state, action) => {
      state[action.payload.id].isCompiling = action.payload.data;
    },
    setIsDownloading: (state, action) => {
      state[action.payload.id].isDownloading = action.payload.data;
    },
  }
});

// ====================================  Selectors
// ===============================================
const selectCurrentWs = (state) => {
  const currentWsId = state.workspacesInfo.currentWsId;
  return state.workspaces[currentWsId];
};

// ======================================  Exports
// ===============================================
export { selectCurrentWs };
export const { createWS, removeWS, renameWS, setIsCompiling, setIsDownloading } = workspacesSlice.actions;

export default workspacesSlice.reducer;
