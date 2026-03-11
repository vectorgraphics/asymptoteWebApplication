import { useRef, useState } from "react";
import { Stack, useColorScheme } from "@mui/material";
import { LinkIcon, MenuIcon, HelpIcon, Palette } from "../../../assets/icons/AppIcons.jsx";
import { AboutModal } from "../SidePanel/AboutModal.jsx";
// import { ModuleKey } from "./ModuleKey.jsx";

export const SideCtrlBar = ({openMenu=()=>{}}) => {
  const anchor = useRef();
  const {mode, setMode} = useColorScheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleMode = (mode) => (mode === "dark")? setMode("light"): setMode("dark");

  const iconCommonCSS = {
    display: "block",
    p: {mobile: "0.25rem", tablet: "0.5rem"},
    width: {mobile: "3rem", tablet: "2.5rem"},
    height: {mobile: "2rem", tablet: "3rem"},
    "&:hover": {
      color: "red",
      backgroundColor: 'background.main',
    },
  }

  return (
    <Stack
      sx={(theme) => ({
        [theme.breakpoints.down("tablet")]: {
          borderTop: "1px solid grey",
          backgroundColor: 'background.light',
          order: 2
        },
        [theme.breakpoints.up("tablet")]: {
          maxWidth: "3rem",
          borderLeft: "1px solid grey",
          borderRight: "1px solid grey",
          backgroundColor: 'background.light',
          order: 1
        }
      })}
      direction={{mobile: "row", tablet: "column"}}
    >
      <Stack 
        sx={{justifyContent: "flex-start", alignItems: "center", position: "relative"}} 
        direction={{mobile: "row", tablet: "column"}}
      >
        <MenuIcon sx={iconCommonCSS} onClick={openMenu}/>
        {/* <ModuleKey mobile={mobile} sx={iconCommonCSS}/> */}
        <div onClick={() => anchor.current.click()}>
          <LinkIcon sx={iconCommonCSS}/>
          <a ref={anchor} style={{position: "absolute"}} href="https://asymptote.sourceforge.io" target="_blank"/>
        </div>
      </Stack>
      <Stack 
        sx={{flexBasis: 0, flexGrow:1, justifyContent: "flex-end", alignItems: "center"}}
        direction={{mobile: "row", tablet: "column"}}
      >
        <Palette sx={iconCommonCSS} onClick={() => toggleMode(mode)}/>
        <HelpIcon
          sx={{
            m: {mobile: 0, tablet: "0 0 2rem 0"},
            ...iconCommonCSS
          }}
          onClick={() => setIsModalOpen(true)}
        />
      </Stack>
      <AboutModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </Stack>
  );
};


//   const iconCommonCSS = {
//     display: "block",
//     p: (mobile)? "0.25rem": "0.5rem",
//     width: (mobile)? "3rem": "2.5rem",
//     height: (mobile)? "2rem": "3rem",
//     "&:hover": {
//       color: "red",
//       backgroundColor: 'background.main',
//     },
//   }

//   return (
//     <Stack
//       sx={(mobile)? {
//         maxHeight: "2rem",
//         borderTop: "1px solid grey",
//         backgroundColor: 'background.light',
//         order: 2
//       }:{
//         maxWidth: "3rem",
//         borderLeft: "1px solid grey",
//         borderRight: "1px solid grey",
//         backgroundColor: 'background.light',
//         order: 1
//       }}
//       direction={(mobile)? "row": "column"}
//     >
//       <Stack 
//         sx={{justifyContent: "flex-start", alignItems: "center", position: "relative"}} 
//         direction={(mobile)? "row": "column"}
//       >
//         <MenuIcon sx={iconCommonCSS} onClick={openMenu}/>
//         {/* <ModuleKey mobile={mobile} sx={iconCommonCSS}/> */}
//         <div onClick={() => anchor.current.click()}>
//           <LinkIcon sx={iconCommonCSS}/>
//           <a ref={anchor} style={{position: "absolute"}} href="https://asymptote.sourceforge.io" target="_blank"/>
//         </div>
//       </Stack>
//       <Stack 
//         sx={{flexBasis: 0, flexGrow:1, justifyContent: "flex-end", alignItems: "center"}}         
//         direction={(mobile)? "row": "column"}
//       >
//         {/* <ThemeIcon sx={iconCommonCSS} onClick={() => toggleMode(mode)}/> */}
//         <Palette sx={iconCommonCSS} onClick={() => toggleMode(mode)}/>
//         <HelpIcon
//           sx={{
//             m: (mobile) ? "0 2rem 0 0" : "0 0 2rem 0",
//             ...iconCommonCSS
//           }}
//           onClick={() => setIsModalOpen(true)}
//         />
//       </Stack>
//       <AboutModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
//     </Stack>
//   );
// };