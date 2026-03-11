const actionDecorator = store => next => action => {
  const regexp = /^(workspaces|workspacesInfo|inputs|outputs)\/(?!createWS|setCurrentCode|setCursorPos)/i;
  if (regexp.test(action.type)) {
    const state = store.getState();
    const currentWsId = state.workspacesInfo.currentWsId;
    const payload = action.payload;
    action.payload = {
      id: currentWsId,
      data: payload
    }
    // console.log(action)
  }
  // console.log(action)
  next(action);
}

export default actionDecorator;