// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%    GLOBAL SELECTORS
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const UCIDSelector = store => store.globals.uniqueClientId;
export const editorLineNumbersSelector = store => store.globals.editorLineNumbers;
export const editorFontsizeSelector = store => store.globals.editorFontsize;
export const editorKeyBindingSelector = store => store.globals.editorKeyBinding;
export const appResetSelector = store => store.globals.appReset;
export const asyVersionSelector = store => store.globals.asyVersion;

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  WORKSPACES SELECTORS
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const idSelector = store => store.workspaces.checkedOutWorkspaceId;
export const wsNameSelector = store => {
  const id = store.workspaces.checkedOutWorkspaceId;
  return store.workspaces.entities[id].name;
}
export const activeModuleSelector = store => {
  const id = store.workspaces.checkedOutWorkspaceId;
  return store.workspaces.entities[id].activeModule;
}
export const editorReRenderSelector = store => {
  const id = store.workspaces.checkedOutWorkspaceId;
  return store.workspaces.entities[id].editorReRender;
}
export const editorPaneViewSelector = store => {
  const id = store.workspaces.checkedOutWorkspaceId;
  return store.workspaces.entities[id].editorPaneView;
}
export const previewPaneViewSelector = store => {
  const id = store.workspaces.checkedOutWorkspaceId;
  return store.workspaces.entities[id].previewPaneView;
}
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  CODEMODULE SELECTORS
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const cmCurrentInputSelector = store => {
  const id = store.workspaces.checkedOutWorkspaceId;
  return {
    outFormat: store.workspaces.codeModule[id].outFormat,
    currentCode: store.workspaces.codeModule[id].currentCode,
  }
}
export const cmCurrentCodeSelector = store => {
  const id = store.workspaces.checkedOutWorkspaceId;
  return store.workspaces.codeModule[id].currentCode;
}
export const cmOutFormatSelector = store => {
  const id = store.workspaces.checkedOutWorkspaceId;
  return store.workspaces.codeModule[id].outFormat;
}
export const cmOutputSelector = store => {
  const id = store.workspaces.checkedOutWorkspaceId;
  return store.workspaces.codeModule[id].output;
}
export const cmShouldUpdateSelector = store => {
  const id = store.workspaces.checkedOutWorkspaceId;
  return store.workspaces.codeModule[id].output.shouldUpdate;
}
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  GRAPHMODULE SELECTORS
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const functionsSelector = store => store.workspaces.graphModule.functions;
export const axesSelector = store => store.workspaces.graphModule.axes;
export const pensSelector = store => store.workspaces.graphModule.pens;
export const LabelsSelector = store => store.workspaces.graphModule.Labels;
export const picturesSelector = store => store.workspaces.graphModule.pictures;
// export const legendsSelector = store => store.workspaces.graphModule.legends;

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  REVOLUTIONMODULE SELECTORS
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const rmInputSelector = store => {
  const id = store.workspaces.checkedOutWorkspaceId;
  return store.workspaces.revolutionModule[id].input;
}
export const rmOutputSelector = store => {
  const id = store.workspaces.checkedOutWorkspaceId;
  return store.workspaces.revolutionModule[id].output;
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  THEMES SELECTORS
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const themeSelector = store => store.themes.appTheme;