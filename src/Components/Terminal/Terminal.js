import React, { Fragment } from 'react';
import cssStyle from './Terminal.module.css';
import {connect} from 'react-redux';
import {actionFact} from "../../Store/store";
import {workspaceInspector} from "../../Util/util";


// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     REACT-REDUX CONNECTION
const ContainerConstructor = connect ((store) => ({workspaces: store.workspaces, selectedWorkspace: store.selectedWorkspace}), 
{
    updateTerminalText: actionFact.updateTerminalText
})

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     TERMINAL COMPONENT

const Editor = ContainerConstructor((props) => {
    const currentWorkspace = workspaceInspector(props);
    const stdoutText = currentWorkspace.output.stdout;
    const stderrText = currentWorkspace.output.stderr;

    if(stdoutText && stderrText !== "" && currentWorkspace.id !== null){
        return (
            <Fragment > 
                <div className={cssStyle.terminalHeader}>
                    <button className={cssStyle.closeBtn}
                    onClick={(event) => {
                        const outputObj = currentWorkspace.output;
                        outputObj.stdout = "";
                        outputObj.stderr = "";
                        props.updateTerminalText(currentWorkspace.id, outputObj);
                    }}
                    />
                </div>
                <textarea className={cssStyle.textarea} name="terminal" value={`Standard output:\n ${stdoutText}\n Standard error:\n ${stderrText}` }></textarea>
            </Fragment>
        );
    }else{
        return(
            <div></div>
        )
    }
})   

export default Editor;
