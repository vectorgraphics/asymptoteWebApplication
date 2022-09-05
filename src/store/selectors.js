// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%    GLOBAL SELECTORS
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const UCIDSelector = store => store.globals.uniqueClientId;
export const editorLineNumbersSelector = store => store.globals.editorLineNumbers;
export const editorFontsizeSelector = store => store.globals.editorFontsize;
export const editorKeyBindingSelector = store => store.globals.editorKeyBinding;
export const splitBtnReRenderSelector = store => store.globals.splitBtnReRender;
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
export const cmCodeSelector = store => {
  const id = store.workspaces.checkedOutWorkspaceId;
  return store.workspaces.codeModule[id].code;
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
  return store.workspaces.codeModule[id].shouldUpdate;
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
export const fFormulaSelector = store => {
  const id = store.workspaces.checkedOutWorkspaceId;
  return store.workspaces.revolutionModule[id].fFormula;
}
export const gFormulaSelector = store => {
  const id = store.workspaces.checkedOutWorkspaceId;
  return store.workspaces.revolutionModule[id].gFormula;
}
export const xMinSelector = store => {
  const id = store.workspaces.checkedOutWorkspaceId;
  return store.workspaces.revolutionModule[id].xMin;
}
export const xMaxSelector = store => {
  const id = store.workspaces.checkedOutWorkspaceId;
  return store.workspaces.revolutionModule[id].xMax;
}
export const rotAxisTypeSelector = store => {
  const id = store.workspaces.checkedOutWorkspaceId;
  return store.workspaces.revolutionModule[id].rotAxisType;
}
export const rotAxisPosSelector = store => {
  const id = store.workspaces.checkedOutWorkspaceId;
  return store.workspaces.revolutionModule[id].rotAxisPos;
}
export const outputSelector = store => {
  const id = store.workspaces.checkedOutWorkspaceId;
  return store.workspaces.revolutionModule[id].output;
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  THEMES SELECTORS
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const themeSelector = store => store.themes.appTheme;