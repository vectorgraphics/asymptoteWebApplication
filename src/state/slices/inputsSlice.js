import { createSlice } from '@reduxjs/toolkit';
import { createWS, removeWS } from "./workspacesSlice";

// ==================================  State Slice 
// ===============================================
const initialInput = {
  submittedCode: null,
  currentCode: "",
  cursorPosition: "0",
  createdFormats: [],
}
const inputsSlice = createSlice({
  name: "inputs",
  initialState: {
    "_$WS": initialInput
  },
  reducers: {
    setSubmittedCode: (state, action) => {
      state[action.payload.id].submittedCode = action.payload.data;
    },
    setCurrentCode: (state, action) => {
      state[action.payload.id].currentCode = action.payload.data;
    },
    setCursorPos: (state, action) => {
      state[action.payload.id].cursorPosition = action.payload.data;
    },
    setCreatedFormats: (state, action) => {
      state[action.payload.id].createdFormats.push(action.payload.data);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createWS, (state, action) => {
      state[action.payload.id] = initialInput;
    }),
    builder.addCase(removeWS, (state, action) => {
      delete state[action.payload.id];
    })
  }
});

// ====================================  Selectors
// ===============================================
const selectSubmittedCode = (state) => {
  const currentWsId = state.workspacesInfo.currentWsId;
  return state.inputs[currentWsId].submittedCode;
}
const selectCurrentCode = (state) => {
  const currentWsId = state.workspacesInfo.currentWsId;
  return state.inputs[currentWsId].currentCode;
}
const selectCursorPos = (state) => {
  const currentWsId = state.workspacesInfo.currentWsId;
  return state.inputs[currentWsId].cursorPosition;
}
const selectCreatedFormats = (state) => {
  const currentWsId = state.workspacesInfo.currentWsId;
  return state.inputs[currentWsId].createdFormats;
}

// ======================================  Exports
// ===============================================
export { selectSubmittedCode, selectCurrentCode, selectCursorPos, selectCreatedFormats };
export const { setSubmittedCode, setCurrentCode, setCursorPos, setCreatedFormats } = inputsSlice.actions;

export default inputsSlice.reducer;