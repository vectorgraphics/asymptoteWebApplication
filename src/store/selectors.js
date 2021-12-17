// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%    GLOBAL SELECTORS
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function UCIDSelector(state) {
  return state.globals.uniqueClientId;
}
export function editorLineNumbersSelector(state) {
  return state.globals.editorLineNumbers;
}
export function editorFontsizeSelector(state) {
  return state.globals.editorFontsize;
}
export function editorKeyBindingSelector(state) {
  return state.globals.editorKeyBinding;
}
export function splitBtnReRenderSelector(store) {
  return store.globals.splitBtnReRender;
}
export function appResetSelector(store) {
  return store.globals.appReset;
}
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  WORKSPACES SELECTORS
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function idSelector(store) {
  return store.workspaces.checkedoutWorkspaceId;
}
export function wsNameSelector(store) {
  const id = store.workspaces.checkedoutWorkspaceId;
  return store.workspaces.entities[id].name;
}
export function editorReRenderSelector(store) {
  const id = store.workspaces.checkedoutWorkspaceId;
  return store.workspaces.entities[id].editorReRender;
}
export function asyVersionSelector(store) {
  return store.globals.asyVersion;
}
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  CODEMODULE SELECTORS
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function codeContentSelector(store) {
  const id = store.workspaces.checkedoutWorkspaceId;
  return store.workspaces.codeModule[id].input.codeContent;
}
export function cmInputSelector(store) {
  const id = store.workspaces.checkedoutWorkspaceId;
  return store.workspaces.codeModule[id].input;
}
export function cmOutputSelector(store) {
  const id = store.workspaces.checkedoutWorkspaceId;
  return store.workspaces.codeModule[id].output;
}
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  GRAPHMODULE SELECTORS
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function geometriesSelector(store) {
  return store.workspaces.graphModule.geometries;
}
export function horizontalAxesSelector(store) {
  return store.workspaces.graphModule.horizontalAxes;
}
export function verticalAxesSelector(store) {
  return store.workspaces.graphModule.verticalAxes;
}
export function legendsSelector(store) {
  return store.workspaces.graphModule.legends;
}
export function picturesSelector(store) {
  return store.workspaces.graphModule.pictures;
}
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  FUNCSUBMODULE SELECTORS
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function fIdSelector(store) {
  const id = store.workspaces.checkedoutWorkspaceId;
  return store.workspaces.graphModule.funcSubModule.funcEntities[id].checkedOutFuncId;
}
export function funcEntitiesSelector(store) {
  return store.workspaces.graphModule.funcSubModule.funcEntities;
}
export function funcListSelector(store) {
  return store.workspaces.graphModule.funcSubModule.funcList;
}

