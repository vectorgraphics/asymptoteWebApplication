import { createSlice } from '@reduxjs/toolkit';

// ==================================  State Slice
// ===============================================
const editorSettingsSlice = createSlice({
  name: "editorSettings",
  initialState: {
    lineNumber: true,
    fontSize: "16", 
    keyBinding: "VSCode",
  },
  reducers: {
    setLineNumber: (state, action) => {
      state.lineNumber = action.payload;
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
    setKeyBinding: (state, action) => {
      state.keyBinding = action.payload;
    },
  }
});

// ====================================  Selectors
// ===============================================
const selectLineNumber = (state) => state.editorSettings.lineNumber;
const selectFontSize = (state) => state.editorSettings.fontSize;
const selectKeyBinding = (state) => state.editorSettings.keyBinding;

// ======================================  Exports
// ===============================================
export { selectLineNumber, selectFontSize, selectKeyBinding };
export const { setLineNumber, setFontSize, setKeyBinding } = editorSettingsSlice.actions;
export default editorSettingsSlice.reducer;


// (() => {
//       const value = localStorage.getItem("lineNumber");
//       console.log(value)
//       if (value) {
//         return Boolean(value);
//       } else {
//         return true;
//       }
//     })()