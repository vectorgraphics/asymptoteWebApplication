import React from 'react';
import cssStyle from "./WorkspacePane.module.css";
import { connect } from 'react-redux';
import { actionFact } from "../../Store/store";

import Controls from './Controls';
import WorkspaceBody from './WorkspaceBody';

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     REACT-REDUX CONNECTION
const ContainerConstructor = connect((store) => ({
  workspaces: store.workspaces,
  selectedWorkspace: store.selectedWorkspace,
  workspacePaneStatus: store.workspacePaneStatus
}),
  {
    changeWorkspacePaneStatus: actionFact.changeWorkspacePaneStatus
  }
)
const WorkspacePane = ContainerConstructor((props) => {
  return (
    <div className={cssStyle.workspace} style={(props.workspacePaneStatus.view) ? { display: "flex" } : { display: "none" }}>
      <div className={cssStyle.workspaceHeader}>
        <div>Workspaces</div>
        <Controls />
      </div>
      <WorkspaceBody />
      <iframe id="logo" style={{ marginTop: "2rem" }} title="logoFrame" src="./logo3d.html" frameBorder="0"></iframe>
      <div className={cssStyle.versionBox}> {props.asyVersion} </div>
    </div>
  )
})
export default WorkspacePane;