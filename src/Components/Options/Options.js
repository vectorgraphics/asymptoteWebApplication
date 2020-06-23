import React, {Fragment, memo} from 'react';
import cssStyle from './Options.module.css';
import {connect} from 'react-redux';
import {actionFact} from "../../Store/store";
import {workspaceInspector} from "../../Util/util";

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     REACT-REDUX CONNECTION
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const ContainerConstructor = connect ((store) => ({workspaces: store.workspaces, selectedWorkspace: store.selectedWorkspace}),
{
    selectOption : actionFact.selectOption,
})

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%          OPTIONS COMPONENT
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const Options = ContainerConstructor((props) => {
    const currentWorkspace = workspaceInspector(props);
    return (
        <Fragment >
            <label className={cssStyle.label} htmlFor="code"> Code </label>
            <div>
                <input className={cssStyle.input} type="checkbox" name="code" checked={currentWorkspace.codeOption.checked} disabled={currentWorkspace.codeOption.disabled}
                onChange = {(event) => props.selectOption(currentWorkspace.id, event.target.name, event.target.checked, currentWorkspace.codeOption.disabled)}/>
            </div>
            <label className={cssStyle.label} htmlFor="output"> Output </label>
            <div>
                <input className={cssStyle.input} type="checkbox" name="output" checked={currentWorkspace.outputOption.checked} 
                disabled={currentWorkspace.outputOption.disabled}
                onChange = {(event) => props.selectOption(currentWorkspace.id, event.target.name, event.target.checked, currentWorkspace.outputOption.disabled)}/>
            </div>
        </Fragment>
    );
})

export default memo(Options);