import React from 'react';
import cssStyle from './WorkspaceEntry.module.css';
import {connect} from "react-redux";
import {actionFact} from '../../Store/store'
import {workspaceInspector} from '../../Util/util'


const ContainerConstructor = connect((store) => ({workspaces: store.workspaces, selectedWorkspace: store.selectedWorkspace}),
{
    renameWorkspace: actionFact.renameWorkspace,
})

const selectedTextColor = "rgb(255, 128, 128)";
const selectedBgColor = "rgb(104, 104, 104)";
const deSelectedTextColor = "rgb(200, 200, 200)";

const WorkspaceEntry = ContainerConstructor((props) => {
    let wsEntry;
    let EscFlag = false;
    const currentWorkspace = workspaceInspector(props);

    function reducer (accumulator, element, index){
        return accumulator + Number(element.id === props.wsId)*index;
    }
    function bySelect(){
        wsEntry.disabled = false;
        wsEntry.value = "";
        wsEntry.focus();
        wsEntry.style.backgroundColor = selectedBgColor;
    }
    function registerName(event){
        props.renameWorkspace(props.wsId, wsEntry.value, wsEntry.value);
        wsEntry.style.backgroundColor = "transparent";
        wsEntry.disabled = true;
    }
    function byDeselect(){
        wsEntry.disabled = true;
        wsEntry.style.backgroundColor = "transparent";
    }
    return (
        <div className={cssStyle.entries}
             onClick={(event) => {props.selectWorkspace(props.wsId, props.workspaces.reduce(reducer,0))}}
             onDoubleClick={bySelect} > 
            <input  ref={(input) => (wsEntry = input)} type="text" disabled={true} value={props.wsName}
                    style={(props.wsId === currentWorkspace.id)? ({color: selectedTextColor}): ({color: deSelectedTextColor})}
                    onChange={(event)=> {
                        props.renameWorkspace(props.wsId, currentWorkspace.name.lastAssigned, event.target.value)}
                    }  
                    onBlur={(event) => {
                            if (wsEntry.value !== "" && !EscFlag){
                                registerName();
                                EscFlag = false;
                            }else{
                                props.renameWorkspace(props.wsId, currentWorkspace.name.lastAssigned, currentWorkspace.name.lastAssigned);
                                byDeselect();
                                EscFlag = false;
                            }
                        }
                    }
                    onKeyDown={(event) => {
                        switch(event.key){
                            case 'Enter':
                                if (wsEntry.value !== ""){
                                    registerName();
                                }else{
                                    props.renameWorkspace(props.wsId, currentWorkspace.name.lastAssigned, currentWorkspace.name.lastAssigned);
                                    byDeselect();
                                    EscFlag = false;
                                }
                                break;
                            case 'Escape':
                                EscFlag = true;
                                props.renameWorkspace(props.wsId, currentWorkspace.name.lastAssigned, currentWorkspace.name.lastAssigned);
                                byDeselect();
                                break;
                            default:
                        }
                    }}
            /> 
        </div>
    )
})

export default WorkspaceEntry;