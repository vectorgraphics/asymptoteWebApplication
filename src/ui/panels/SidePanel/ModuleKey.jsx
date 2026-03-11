import { useState } from "react";
import { Box, List, Popover, useMediaQuery } from "@mui/material";
import { ModuleIcon, CodeModuleIcon, GraphModuleIcon, SorModuleIcon } from "../../../assets/icons/AppIcons.jsx";
// import { ListItemPlus } from "../../components/ListItemPlus";

// export const ModuleKey = ({sx={}, mobile=false}) => {
//   const [isClicked, setIsClicked] = useState(false);
//   const [moduleIndex, setModuleIndex] = useState(0);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const items = ["Code Module", "Graph Module", "SOR Module"];

//   const indexCheck = (theme, index) => 
//     moduleIndex === index ? theme.palette.muiColors.red[500] : theme.palette.text.primary;
//   const leadingIcons = [
//     <CodeModuleIcon sx={{color: (theme) => indexCheck(theme, 0)}}/>,
//     <GraphModuleIcon sx={{color: (theme) => indexCheck(theme, 1)}}/>,
//     <SorModuleIcon sx={{color: (theme) => indexCheck(theme, 2)}}/>
//   ];

//   const toggleMenu = (event) => {
//     anchorEl ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
//     setIsClicked((prevState) => !prevState);
//   };
//   const open = Boolean(anchorEl);
//   const id = open ? "Moduel Menu" : undefined;

//   return (
//     <Box sx={{p: 0, m: 0}}>
//       {(isClicked) ? 
//         <ModuleIcon sx={{...sx, color: "muiColors.red[500]"}} onClick={toggleMenu}/> :
//         <ModuleIcon sx={sx} onClick={toggleMenu}/>
//       }
//       <Popover slotProps={{
//         paper: {
//           sx: {
//             width: "200px",
//             ml: "0.25rem",
//             border: "1px solid grey",
//             backgroundColor: (theme) => theme.palette.background.main
//           }
//         }}}
//         anchorPosition={{
//           top: 1,
//           left: 1,
//         }}
//         anchorOrigin={{
//           vertical: "top",
//           horizontal: (mobile)? "left": "right",
//         }}
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={toggleMenu}
//       >
//         <List>
//           {items.map((itemName, index) => 
//             <ListItemPlus
//               sxs={{
//                 itemText: {color: (theme) => indexCheck(theme, index)}
//               }} 
//               key={itemName} 
//               leadingIcon={leadingIcons[index]} 
//               text={itemName}
//               onClick={() => setModuleIndex(index)}
//             />
//           )}
//         </List>
//       </Popover>
//     </Box>
//   );
// };
