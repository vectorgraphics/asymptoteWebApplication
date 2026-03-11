import { createSlice } from '@reduxjs/toolkit';
import { createWS, removeWS } from "./workspacesSlice";

// ==================================  State Slice 
// ===============================================
const initialOutput = {
  recentOperation: null,
  operationStatus: null,
  generatedFile: null,
  serverResponse: {
    error: null,
    stdObj: null,
  },
}
const outputsSlice = createSlice({
  name: "outputs",
  initialState: {
    "_$WS": initialOutput
  },
  reducers: {
    setOutput: (state, action) => {
      state[action.payload.id] = action.payload.data;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createWS, (state, action) => {
      state[action.payload.id] = initialOutput;
    }),
    builder.addCase(removeWS, (state, action) => {
      delete state[action.payload.id];
    })
  }
});

// ====================================  Selectors
// ===============================================
const selectOutput = (state) => {
  const currentWsId = state.workspacesInfo.currentWsId;
  return state.outputs[currentWsId];
};

// ======================================  Exports
// ===============================================
export { selectOutput };
export const { setOutput } = outputsSlice.actions;

export default outputsSlice.reducer;