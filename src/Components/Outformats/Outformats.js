import React, {Fragment, memo} from 'react';
import cssStyle from './Outformats.module.css';
import {connect} from 'react-redux';
import {actionFact} from "../../Store/store";
import {workspaceInspector} from "../../Util/util";


// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     REACT-REDUX CONNECTION
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const ContainerConstructor = connect ((store) => ({workspaces: store.workspaces, selectedWorkspace: store.selectedWorkspace}),
{
    selectFormat : actionFact.selectFormat,
})

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%           OPTION COMPONENT
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const Outformats = ContainerConstructor((props) => {

    const currentWorkspace = workspaceInspector(props);
    const noWorkspace = currentWorkspace.id === null;
    const emptyEditor = currentWorkspace.codeText === "";
    const outputOptionNotChecked = !currentWorkspace.outputOption.checked;

    return (
        props.providedFormats.map((format, index) => (
            <Fragment key={index} >
                <label className={cssStyle.label} htmlFor="outformat"> {format} </label>
                <div>
                    <input onChange = {(event)=> props.selectFormat(currentWorkspace.id, event.target.value)}
                    className={cssStyle.input} type="radio" name="outformat" value={format} 
                    checked={currentWorkspace.outformat === format}
                    disabled={(noWorkspace || emptyEditor || outputOptionNotChecked)}
                    />
                </div>
            </Fragment>
        ))        
    );
})

export default memo(Outformats);