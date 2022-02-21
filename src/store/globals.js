// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Global Actions, Action Creators & Reducers
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const glActions = {
  setClientId:          "setClientId",
  setEditorLineNumbers: "setEditorLineNumbers",
  setEditorFontsize:    "setEditorFontsize",
  setKeyBinding:        "setKeyBinding",
  reRenderSplitBtn:     "reRenderSplitBtn",
  resetApplication:     "resetApplication",
  setAsyVersion:        "setAsyVersion",
};

export const glActionCreator = {
  setClientId: (id) => {
    return {
      type: glActions.setClientId,
      payload: {
        uniqueClientId: id,
      }
    };
  },
  setEditorLineNumbers: (isLineNumbers) => {
    return {
      type: glActions.setEditorLineNumbers,
      payload: {
        editorLineNumbers: isLineNumbers
      }
    };
  },
  setEditorFontsize: (fontsize) => {
    return {
      type: glActions.setEditorFontsize,
      payload: {
        editorFontsize: fontsize
      }
    };
  },
  setKeyBinding: (keyBinding) => {
    return {
      type: glActions.setKeyBinding,
      payload: {
        editorKeyBinding: keyBinding
      }
    };
  },
  reRenderSplitBtn: function (value) {
    return {
      type: glActions.reRenderSplitBtn,
      payload: {
        splitBtnReRender: value
      },
    };
  },
  resetApplication: function (value) {
    return {
      type: glActions.resetApplication,
      payload: {
        appReset: value
      },
    };
  },
  setAsyVersion: (version) => {
    return {
      type: glActions.setAsyVersion,
      payload: {
        asyVersion: version,
      }
    };
  },
}

export function globals(state = {}, action) {
  if (Object.keys(glActions).includes(action.type)) {
    return {...state, ...action.payload};
  }
  return state;
}

