import { useSelector } from "react-redux";
import { Stack } from "@mui/material";
import { CodeModule } from "../../modules/CodeModule/CodeModule.jsx";
import { selectWsIds } from "../../../state/slices/workspacesInfoSlice.js";

export const ModulePanel = () => {
  const WsIds = useSelector(selectWsIds);
  return (
    // <Stack sx={[{flexGrow: 1, order: 2}, mobile && {order: 1}]} direction="column">
    <Stack
      sx={{flexGrow: 1, maxHeight: {mobile: "calc(100vh - 2rem)", tablet: "calc(100vh)"}, order: {mobile: 1, tablet: 2}}} 
      direction="column"
    >
      {(WsIds.length > 0) && <CodeModule />}
    </Stack>
  );
};
