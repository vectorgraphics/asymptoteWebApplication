import React, {memo} from 'react';
import cssStyle from './ToggleKey.module.css';
import {connect} from 'react-redux';
import {actionFact} from "../../Store/store";
import { ReactComponent as HideIcon } from '../../assets/hide.svg';
import { ReactComponent as ShowIcon } from '../../assets/show.svg';

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     REACT-REDUX CONNECTION
const ContainerConstructor = connect ((store) => ({
        workspaces: store.workspaces, 
        selectedWorkspace: store.selectedWorkspace, 
        workspacePaneStatus: store.workspacePaneStatus
    }), 
    {
        changeWorkspacePaneStatus: actionFact.changeWorkspacePaneStatus
    }
)

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     ToggleKey COMPONENT

const ToggleKey = ContainerConstructor((props) => {
    if (props.workspacePaneStatus.view){
        return (
            <div className={cssStyle.toggleKey}
                 onClick={()=>{
                    props.changeWorkspacePaneStatus(false);
                 }}>
                <ShowIcon/>
            </div>
        )
    }else{
        return (
            <div className={cssStyle.toggleKey}
                onClick={() => {
                    props.changeWorkspacePaneStatus(true);
                }}>
                <HideIcon/>
            </div>
        )
        
    }
})   

export default memo(ToggleKey);
