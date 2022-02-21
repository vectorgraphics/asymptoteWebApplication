// import { useSelector } from "react-redux";
// import { pensSelector, LabelsSelector } from "../../store/selectors";
// // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//
// // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Asy axis generator
// // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// export function asyAxisCodeGen(axesData, moduleToImport) {
//   const {hAxisData, vAxisData} = axesDataSplitter(axesData)
//   const refinedHAxisData = axisDefaultsCheck(hAxisData);
//   const refinedVAxisData = axisDefaultsCheck(vAxisData);
//
//   const hAxisCode = `xaxis(currentpicture, $${axisData.label}$, ${axisData.extend}, ${axisData.min}, ${axisData.max}, ${axisData.axisPen}, ${axisData.ticks}, ${axisData.endArrow}, false);\n`;
//   const vAxisCode = `yaxis(currentpicture, $${axisData.label}$, ${axisData.extend}, ${axisData.min}, ${axisData.max}, ${axisData.axisPen}, ${axisData.ticks}, ${axisData.endArrow}, false);\n`;
//
//   return `${hAxisCode}\n\n ${vAxisCode}`
// }
//
// function axisDefaultsCheck(axisData) {
//   const {
//     label, relativePos, omitLabels, min, max, align, axisLocation, scale, extend, axisPen, endArrow,
//     ticks, ticksLabel, ticksLabelFormat, ticksExtend, omitTicks, omitTicksLabels, majorTicksDivision,
//     minorTicksDivision, majorTicksSteps, minorTicksSteps, majorTicksSize, minorTicksSize, majorTicksPen,
//     minorTicksPen
//   } = axisData;
//   const pureAxisData = {
//     label, relativePos, omitLabels, min, max, align, axisLocation, scale, extend, axisPen, endArrow
//   };
//   const axisTicksData = {
//     ticks, ticksLabel, ticksLabelFormat, ticksExtend, omitTicks, omitTicksLabels, majorTicksDivision,
//     minorTicksDivision, majorTicksSteps, minorTicksSteps, majorTicksSize, minorTicksSize, majorTicksPen,
//     minorTicksPen
//   }
// }
//
// // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Asy ticks generator
// // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// function ticksCodeGen(ticksData, axis="verticalAxis") {
//   if (ticksData.ticks !== "NoTicks") {
//     return `
//       ${ticksData.ticks}(${ticksData.ticksLabelFormat}, ${ticksData.ticksLabel},
//         ${ticksData.ticksBeginLabel},${ticksData.ticksEndLabel},
//         ${ticksData.majorTicksSteps}, ${ticksData.minorTicksSteps},
//         ${ticksData.ticksBegin}, ${ticksData.ticksEnd}, None,
//         ${ticksData.majorTicksSize}, ${ticksData.minorTicksSize}, ${ticksData.ticksExtend},
//         ${ticksData.majorTicksPen}, ${ticksData.minorTicksPen});
//       `;
//   } else {
//     return false;
//   }
// }