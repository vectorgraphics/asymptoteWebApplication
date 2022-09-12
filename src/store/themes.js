// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Themes Actions, Action Creators & Reducers
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const tmActions = {
  changeTheme: "changeTheme",
};

export const tmActionCreator = {
  changeTheme: (value) => ({
    type: tmActions.changeTheme,
    payload: {
      appTheme: value,
    },
  }),
}

export const themes = (state = {}, action) => {
  switch (action.type) {
    case tmActions.changeTheme:
      return {...state, ...action.payload};
    default:
      return state;
  }
};