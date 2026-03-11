import { createSlice } from '@reduxjs/toolkit';

// ==================================  State Slice
// ===============================================
const appGlobalSlice = createSlice({
  name: "appGlobal",
  initialState: {
      uuid: "-1",
      asyVersion: "",
  },
  reducers: {
    setUUID: (state, action) => {
      state.uuid = action.payload;
    },
    setAsyVersion: (state, action) => {
      state.asyVersion = action.payload;
    },
  }
});

// ====================================  Selectors
// ===============================================
const selectUUID = (state) => state.appGlobal.ucid;
const selectAsyVersion = (state) => state.appGlobal.asyVersion;

// ======================================  Exports
// ===============================================
export { selectUUID, selectAsyVersion };
export const { setUUID, setAsyVersion } = appGlobalSlice.actions;
export default appGlobalSlice.reducer;