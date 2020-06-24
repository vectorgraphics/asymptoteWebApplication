import React, {Fragment, memo} from 'react';
import cssStyle from './Controls.module.css';
import {connect} from 'react-redux';
import {actionFact} from '../../Store/store';

const ContainerConstructor = connect((store) => ({workspaces: store.workspaces, selectedWorkspace: store.selectedWorkspace}), 
{   
    addWorkspace: actionFact.addWorkspace, 
    removeWorkspace: actionFact.removeWorkspace,
    selectWorkspace: actionFact.selectWorkspace
})

let wsCounter = 2;

const Controls = ContainerConstructor((props) => {
    return (
        <Fragment>
        <div onClick={(event) => {
                const id = wsCounter++;
                // const lastIndex = props.workspaces.length;
                props.addWorkspace(id); 
                props.selectWorkspace(id, 0);
            }
        } 
        className={cssStyle.controller + " " + cssStyle.controllerAdd} ></div>
        <div onClick={(event) => {
                if (props.selectedWorkspace.id !== null){
                    const length = props.workspaces.length;
                    const currentIndex = props.selectedWorkspace.index;
                    const currentId = props.workspaces[currentIndex].id;
                    if (currentIndex < length-1 && currentIndex > 0){
                        props.removeWorkspace(currentId);
                        const nextWsId = props.workspaces[currentIndex].id;
                        props.selectWorkspace(nextWsId, currentIndex); 
                    } else if (currentIndex === length-1  && currentIndex > 0){
                        const previousWsId = props.workspaces[currentIndex-1].id;
                        props.selectWorkspace(previousWsId, currentIndex-1); 
                        props.removeWorkspace(currentId);
                    } else if (currentIndex === 0 && length > 1){
                        console.log("here")
                        const nextWsId = props.workspaces[1].id;
                        props.selectWorkspace(nextWsId, 0); 
                        props.removeWorkspace(currentId);
                    } else if (currentIndex === 0 && length === 1){
                        props.removeWorkspace(currentId);
                        props.selectWorkspace(null, null);
                    }
                }
            }
        }
        className={cssStyle.controller + " " + cssStyle.controllerRemove}></div>
    </Fragment>
    )  
})

export default memo(Controls);