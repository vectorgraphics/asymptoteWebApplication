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
        if(currentWorkspace.output.responseType === "ERROR"){
            const errorText = (currentWorkspace.output.stderr !== "") ? currentWorkspace.output.stderr : currentWorkspace.output.errorText;
            return (
                <div className={cssStyle.outputElse}> 
                    <div>
                        <h4> Error: </h4>
                            <p> {errorText} </p>
                    </div>
                </div>
            )
        } else {
            let string = (currentWorkspace.output.isUpdated)? " ": "";
            return (
                <iframe id="outFrame" className={cssStyle.outputPreview}
                        src={string + currentWorkspace.output.path}
                        width="100%" height="100%" title="outputFrame" frameBorder="0"/>
            )
        }
    } else {
        return (
            <div className={cssStyle.outputPreview}> 
                {/* <iframe title="outputFrame" frameBorder="0"/> */}
            </div>
        )
    }
})   

export default Output;
