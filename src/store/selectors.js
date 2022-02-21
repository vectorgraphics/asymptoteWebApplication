// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%    GLOBAL SELECTORS
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function UCIDSelector(store) {
  return store.globals.uniqueClientId;
}
export function editorLineNumbersSelector(store) {
  return store.globals.editorLineNumbers;
}
export function editorFontsizeSelector(store) {
  return store.globals.editorFontsize;
}
export function editorKeyBindingSelector(store) {
  return store.globals.editorKeyBinding;
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
  return store.workspaces.checkedOutWorkspaceId;
}
export function wsNameSelector(store) {
  const id = store.workspaces.checkedOutWorkspaceId;
  return store.workspaces.entities[id].name;
}
export function editorReRenderSelector(store) {
  const id = store.workspaces.checkedOutWorkspaceId;
  return store.workspaces.entities[id].editorReRender;
}
export function asyVersionSelector(store) {
  return store.globals.asyVersion;
}
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  CODEMODULE SELECTORS
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function codeContentSelector(store) {
  const id = store.workspaces.checkedOutWorkspaceId;
  return store.workspaces.codeModule[id].input.codeContent;
}

export function cmInputSelector(store) {
  const id = store.workspaces.checkedOutWorkspaceId;
  return store.workspaces.codeModule[id].input;
}

export function cmOutputSelector(store) {
  const id = store.workspaces.checkedOutWorkspaceId;
  return store.workspaces.codeModule[id].output;
}
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  GRAPHMODULE SELECTORS
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function functionsSelector(store) {
  return store.workspaces.graphModule.functions;
}
export function axesSelector(store) {
  return store.workspaces.graphModule.axes;
}
export function pensSelector(store) {
  return store.workspaces.graphModule.pens;
}
export function LabelsSelector(store) {
  return store.workspaces.graphModule.Labels;
}
export function picturesSelector(store) {
  return store.workspaces.graphModule.pictures;
}
// export function legendsSelector(store) {
//   return store.workspaces.graphModule.legends;
// }

