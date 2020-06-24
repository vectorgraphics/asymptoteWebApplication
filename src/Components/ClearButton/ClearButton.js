import React, {memo, Component} from 'react';
import cssStyle from './ClearButton.module.css';
import {connect} from 'react-redux';
import {workspaceInspector} from '../../Util/util';
import ClearButtonMenu from '../ClearButtonMenu/ClearButtonMenu'

const ContainerConstructor = connect ((store) => ({workspaces: store.workspaces, selectedWorkspace: store.selectedWorkspace}), {})

const displayTrue = {
    displaySubMenu : true
}
const displayFalse = {
    displaySubMenu : false
}

const ClearButton = ContainerConstructor(class extends Component{
    constructor(props){
        super();
        this.currentWorkspace = workspaceInspector(props);
        this.state = displayFalse;
    }

    wipeSubMenuOut = () => {
        this.setState(displayFalse);
    }

    render(){
        if (this.state.displaySubMenu){
            return (
                <div className={this.props.cssClass} style={{ position: "relative" }}
                        onMouseOver={(event) => {this.setState(displayTrue)}}
                        onMouseLeave={(event) => {this.setState(displayFalse)}}                
                    >
                    <button className={cssStyle.clearBtn}>Clear</button>
                    <ClearButtonMenu wipeSubMenuOut={this.wipeSubMenuOut}/>
                </div>
            )
        } else {
            return (
                <div className={this.props.cssClass} style={{ position: "relative" }}
                    onMouseOver={(event) => { this.setState(displayTrue) }}
                    onMouseLeave={(event) => { this.setState(displayFalse) }}    
                    >
                    <button className={cssStyle.clearBtn}>Clear</button>
                </div>
            )

        }
    }
    
})

export default memo(ClearButton);