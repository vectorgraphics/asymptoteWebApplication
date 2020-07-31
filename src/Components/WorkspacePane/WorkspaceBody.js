import React from 'react';
import cssStyle from "./WorkspaceBody.module.css";
import { connect } from "react-redux";
import WorkspaceEntry from './WorkspaceEntry';

const ContainerConstructor = connect((store) => ({ workspaces: store.workspaces, ContainerConstructor: store.currentWorkspace }), {})


const WorkspaceBody = ContainerConstructor((props) => {
  return (
    <div className={cssStyle.workspaceBody}>
      {
        props.workspaces.map((workspace, index) => (<WorkspaceEntry key={index} wsId={workspace.id} wsName={workspace.name.current} />))
      }
    </div>
  )
})
export default WorkspaceBody;
