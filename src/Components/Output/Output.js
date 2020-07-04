import React from 'react';
import cssStyle from './Output.module.css';
import {connect} from 'react-redux';
import {workspaceInspector} from '../../Util/util';

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     REACT-REDUX CONNECTION
const ContainerConstructor = connect ((store) => ({workspaces: store.workspaces, selectedWorkspace: store.selectedWorkspace}), {})

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     EDITOR COMPONENT
const Output = ContainerConstructor((props) => {
    const currentWorkspace = workspaceInspector(props);

    if (currentWorkspace.id !== null) {
      let string = (currentWorkspace.output.isUpdated)? " ": "";
      return (
          <iframe id="outFrame" className={cssStyle.outputPreview} src={string + currentWorkspace.output.path}
                  width="100%" height="100%" title="outputFrame" frameBorder="0"/>
      )
    } else {
        return (
            <div className={cssStyle.outputPreview}> 
            </div>
        )
    }
})   

export default Output;
