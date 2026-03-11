import { useState } from "react";
import { WorkspaceMenu } from "../WorkspacePanel/WorkspaceMenu.jsx";
import { SideCtrlBar } from "./SideCtrlBar.jsx";

export const SidePanel = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <SideCtrlBar openMenu={() => setIsMenuOpen(true)}/>
      <WorkspaceMenu isMenuOpen={isMenuOpen} onMenuClose={() => setIsMenuOpen(false)}/>
    </>
  )
};
