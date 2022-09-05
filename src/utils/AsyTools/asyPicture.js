// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Asy picture Code generator
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function asyPicCodeGen(picData, moduleToImport) {
  return `
  size(${picData.width}, ${picData.height}, ${picData.aspectRatio});
  `;
}