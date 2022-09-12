// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Global Actions, Action Creators & Reducers
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const glActions = {
  setClientId:          "setClientId",
  setEditorLineNumbers: "setEditorLineNumbers",
  setEditorFontsize:    "setEditorFontsize",
  setEditorKeyBinding:  "setEditorKeyBinding",
  reRenderSplitBtn:     "reRenderSplitBtn",
  resetApplication:     "resetApplication",
  setAsyVersion:        "setAsyVersion",
};

export const glActionCreator = {
  setClientId: (id) => ({
    type: glActions.setClientId,
    payload: {
      uniqueClientId: id,
    }
  }),
  setEditorLineNumbers: (isLineNumbers) => ({
    type: glActions.setEditorLineNumbers,
    payload: {
      editorLineNumbers: isLineNumbers
    }
  }),
  setEditorFontsize: (fontsize) => ({
    type: glActions.setEditorFontsize,
    payload: {
      editorFontsize: fontsize
    }
  }),
  setEditorKeyBinding: (keyBinding) => ({
    type: glActions.setEditorKeyBinding,
    payload: {
      editorKeyBinding: keyBinding
    }
  }),
  reRenderSplitBtn: (value) => ({
    type: glActions.reRenderSplitBtn,
    payload: {
      splitBtnReRender: value
    },
  }),
  resetApplication: (value) => ({
    type: glActions.resetApplication,
    payload: {
      appReset: value
    },
  }),
  setAsyVersion: (version) => ({
    type: glActions.setAsyVersion,
    payload: {
      asyVersion: version,
    }
  }),
}

export const globals = (state = {}, action) => {
  if (Object.keys(glActions).includes(action.type)) {
    return {...state, ...action.payload};
  }
  return state;
};

