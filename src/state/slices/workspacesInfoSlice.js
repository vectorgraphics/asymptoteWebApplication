import { createSlice } from '@reduxjs/toolkit';
import { createWS, removeWS, renameWS } from "./workspacesSlice";

// ==================================  State Slice 
// ===============================================
const workspacesInfoSlice = createSlice({
  name: "workspacesInfo",
  initialState: {
    currentWsId: "_$WS",
    WsIds: ["_$WS"],
    WsIdsAndNames: {
      "_$WS": "Workspace",
    }
  },
  reducers: {
    setCurrentWS: (state, action) => {
      state.currentWsId = action.payload.data;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createWS, (state, action) => {
      state.currentWsId = action.payload.id;
      state.WsIds.push(action.payload.id);
      state.WsIdsAndNames[action.payload.id] = action.payload.name;
    }),
    builder.addCase(removeWS, (state) => {
      [state.currentWsId, state.WsIds, state.WsIdsAndNames] = filterState(state.WsIds, state.WsIdsAndNames, state.currentWsId)
    }), 
    builder.addCase(renameWS, (state, action) => {
      state.WsIdsAndNames[action.payload.id] = action.payload.data;
    })
  }
});

// ====================================  Selectors
// ===============================================
const selectCurrentWsId = (state) => state.workspacesInfo.currentWsId;
const selectWsIds = (state) => state.workspacesInfo.WsIds;
const selectWsIdsAndNames = (state) => state.workspacesInfo.WsIdsAndNames;

// ======================================  Exports
// ===============================================
export { selectCurrentWsId, selectWsIds, selectWsIdsAndNames };
export const { setCurrentWS } = workspacesInfoSlice.actions;

export default workspacesInfoSlice.reducer;

// ============================== Internal Methods  
// ===============================================
const filterState = (wsIds, WsIdsAndNames, id) => {
  const numberOfWS = wsIds.length;
  let reducedIdList = null;
  let reducedIdsAndNames = WsIdsAndNames;
  const currentWsIndex = wsIds.indexOf(id);
  switch (currentWsIndex) {
    case 0:
      [, ...reducedIdList] = wsIds;
      delete reducedIdsAndNames.id;
      return [reducedIdList[0], reducedIdList, reducedIdsAndNames]
    case numberOfWS:
      reducedIdList = wsIds.pop(); 
      return [reducedIdList[numberOfWS - 2], reducedIdList, reducedIdsAndNames]
    default:
      reducedIdList = wsIds.filter((element, index) => index !== currentWsIndex); 
      return [reducedIdList[currentWsIndex - 1], reducedIdList, reducedIdsAndNames]  
  }
}


