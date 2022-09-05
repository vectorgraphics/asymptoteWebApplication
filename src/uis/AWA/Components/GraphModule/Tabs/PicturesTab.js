// // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%   AxesTab component
// // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// import { useState } from "react";
// import { useSelector, useDispatch} from "react-redux";
// import { piActionCreator } from "../../../../../store/graphModule";
// import { idSelector, picturesSelector } from "../../../../../store/selectors";
// import { makeStyles, TextField, } from "@material-ui/core";
// import { ComboBox } from "../../../Atoms/ComboBox";
// import { DefTableConsoleMui } from "../Atoms/DefTableConsoleMui";
// import {TabControls} from "../Atoms/TabControls";
// import { SelectField } from "../../../Atoms/SelectField";
//
// const axesStyle = makeStyles((theme) => ({
//   // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//   // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Legend of FieldSet
//   // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//   legend: {
//     fontSize: "0.85rem",
//     padding: "0 0.5rem",
//     margin: "0 1rem",
//   },
//   // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//   // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Picture of FieldSet
//   // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//   pictureFieldSet: {
//     display: "grid",
//     margin: "1rem",
//     padding: "1rem",
//     maxWidth: "calc(100% - 2rem)",
//     borderRadius: "4px",
//     border: "2px groove black",
//   },
//   picturePropsFieldSet: {
//     padding: "0.5rem",
//     borderRadius: "4px",
//     border: "2px groove black",
//   },
//   pictureDefElementsContainer: {
//     display: "grid",
//     height: "2.75rem",
//     justifyContent: "space-between",
//     alignContent: "space-between",
//     gridTemplateColumns: "8rem 8rem 8rem 8rem 9rem",
//     // border: "1px solid pink",
//   },
//   pictureName: {
//     width: "8rem",
//     gridColumn: "1/2",
//     "& label": {
//       fontSize: "0.85rem",
//     }
//   },
//   width: {
//     width: "8rem",
//     gridColumn: "2/3",
//     "& label": {
//       fontSize: "0.85rem",
//     }
//   },
//   height: {
//     width: "8rem",
//     gridColumn: "3/4",
//     "& label": {
//       fontSize: "0.85rem",
//     }
//   },
//   aspect: {
//     marginTop: "0.5rem",
//     gridColumn: "4/5",
//   },
//   addBtn: {
//     marginTop: "0.5rem",
//     gridColumn: "5/6",
//   },
//   defConsole: {
//     height: "8rem",
//     gridColumn: "1/6",
//   },
//   // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Buttons & Console
//   // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//   CtrlBtnsCont: {
//     display: "grid",
//     marginTop: "1rem",
//     justifyContent: "space-between",
//     gridTemplateColumns: "1fr",
//     // border: "1px solid blue",
//   },
//   // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//   // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Pictures List Fieldset
//   // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//   tableAndConsole: {
//     display: "flex",
//     flexFlow: "column",
//     minHeight: "40.75rem",
//     marginTop: "0.5rem",
//     border: "1px solid blue",
//   },
// }))
//
// export function PicturesTab(props) {
//   const locClasses = axesStyle(props);
//   const [picData, setPicData] = useState(picInitState);
//   const id = useSelector(idSelector);
//   const pictures = useSelector(picturesSelector);
//   const dispatch = useDispatch();
//
//   const tableHeader = ["name", "width", "height", "aspectRatio"];
//   const tableHeaderDisp = ["name", "width", "height", "aspect ratio"];
//   const consoleContent = [];
//
//   return (
//     <fieldset className={locClasses.pictureFieldSet}>
//       <legend className={locClasses.legend}> Picture Definition </legend>
//       <fieldset className={locClasses.picturePropsFieldSet}>
//         <legend className={locClasses.legend}> Picture Properties </legend>
//         <div className={locClasses.pictureDefElementsContainer}>
//           <TextField
//             className={locClasses.pictureName} size="small" label="picture name" value={picData.name}
//             onChange={(event) => setPicData({...picData, name: event.target.value})}
//           />
//           <TextField
//             className={locClasses.width} size="small" label="width" value={picData.width}
//             onChange={(event) => setPicData({...picData, width: event.target.value})}
//           />
//           <TextField
//             className={locClasses.height} size="small" label="height" value={picData.height}
//             onChange={(event) => setPicData({...picData, height: event.target.value})}
//           />
//           <ComboBox
//             className={locClasses.aspect}
//             label="aspect ratio" dataArray={[{text:"Aspect"}, {text:"Ignore-Aspect"}]}
//             width="9rem" property="text" value={{text: picData.aspectRatio}}
//             onChange={(event, value) => setPicData({...picData, aspectRatio: value.text})}
//           />
//         </div>
//       </fieldset>
//       <TabControls className={locClasses.CtrlBtnsCont}/>
//       <div className={locClasses.tableAndConsole}>
//         <DefTableConsoleMui
//           tableFieldName="Axes list" tableRowsDataObj={pictures}
//           tableHeaderSelector={tableHeader} tableHeaderDisp={tableHeaderDisp}
//           consoleContent={consoleContent}
//         />
//       </div>
//       </fieldset>
//   )
// }
//
// // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Data Collections
// // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// const picInitState = {
//   name: "",
//   width: "10 cm",
//   height: "10 cm",
//   aspectRatio: "Ignore-Aspect",
// }