import { useEffect } from "react";
import { CssBaseline, useTheme, Stack } from "@mui/material";
import { ModulePanel } from "../ui/panels/ModulePanel/ModulePanel.jsx";
import { SidePanel } from "../ui/panels/SidePanel/SidePanel.jsx";
import { xFetch } from "../utils/xFetch.js";

export const App = () => {
  const awaTheme = useTheme();
  console.log(awaTheme);
  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <>
      <CssBaseline/>
      <Stack 
        sx={{
          flexGrow: 1,
          height: "100%",
          maxHeight: "100vh",
          bgcolor: awaTheme.palette.mode === "dark" ? "background.dark" : "background.lightest"
        }}
        direction={{mobile: "column", tablet: "row"}}
      >
        <ModulePanel/>
        <SidePanel/>
      </Stack>
    </>
  )
};


// async function getData() {
//   let response = "";
//   try {
//     response = await fetch("https://free.freeipapi.com/api/json/");
//     try {
//       const data = await response.json();
//       console.log(data);
//       xFetch.post("/", data);
//     } catch (err) {
//       // Let the server know that the json parse threw error
//       // return;
//     }
//   } catch (err) {
//     if (response.Ok !== "200") {
//       // let the server know about fetch error
//     } else {
//       // Let the server know about response error
//     }
//   }
// }

