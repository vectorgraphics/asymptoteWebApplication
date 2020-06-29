import React from 'react';
import cssStyle from './Output.module.css';
import {connect} from 'react-redux';
import {workspaceInspector} from '../../Util/util';

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     REACT-REDUX CONNECTION
const ContainerConstructor = connect ((store) => ({workspaces: store.workspaces, selectedWorkspace: store.selectedWorkspace}), {})

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     EDITOR COMPONENT
const Output = ContainerConstructor((props) => {
    const currentWorkspace = workspaceInspector(props);

    if(currentWorkspace.id !== null){
        if(currentWorkspace.output.responseType === "Error"){
            return (
                <div className={cssStyle.outputElse}> 
                    <div>
                        <h4> Error: </h4>
                            <p> {currentWorkspace.output.response} </p>
                    </div>
                </div>
            )
        } else if (currentWorkspace.output.status === "PreRun_No_Output") {
            return (
                <div className={cssStyle.outputElse}>
                    <div>
                        <h4> User Action: </h4>
                        <p> Output file download request </p>
                        <h4> Status: </h4>
                        <p> The code did not generate any output. </p>
                    </div>
                </div>
            )
        } else if (currentWorkspace.output.responseType === "Process_Terminated") {
            return (
                <div className={cssStyle.outputElse}>
                    <div>
                        <h4> Error: </h4>
                        <p> {currentWorkspace.output.response} </p>
                    </div>
                </div>
            )
        }else{
            let string = (currentWorkspace.output.isUpdated)? " ": "";
            return(
                    <iframe id="outFrame" className={cssStyle.outputPreview}
                            src={string + currentWorkspace.output.response}
                            width="100%" height="100%" title="outputFrame" frameBorder="0"/>
                    )
                }
            } else {
                return(
                    <div className={cssStyle.outputPreview}> 
                <iframe title="outputFrame" frameBorder="0"/>
            </div>
        )
    }
})   

export default Output;