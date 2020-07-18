import React, {Component, memo} from 'react';
import cssStyle from './RunStopButton.module.css';
import {connect} from 'react-redux';
import {actionFact} from '../../Store/store';
import {Ajax, workspaceInspector} from '../../Util/util';

const ContainerConstructor = connect ((store) => ({workspaces: store.workspaces, selectedWorkspace: store.selectedWorkspace}),
{
    getRunResponse : actionFact.getRunResponse,
})

const inactiveColor = "rgb(119, 136, 153)";
const activeColor = "rgb(200, 200, 200)";

const RunStopButton = ContainerConstructor(class extends Component {
    constructor(props){
        super(props);
        this.state = {
            buttonType : "Run"
        }
    }

    render(){
        const currentWorkspace = workspaceInspector(this.props);
        const noWorkspace = currentWorkspace.id === null;
        const emptyEditor = currentWorkspace.codeText === "";
        let runBtn = "";
        let stopBtn = "";

        if(this.state.buttonType === "Run"){
            return (
                <button className={cssStyle.Btn} ref={(button) => {runBtn = button}}
                    style={(noWorkspace || emptyEditor) ? { color: inactiveColor } : { color: activeColor }}
                    disabled={(noWorkspace || emptyEditor)}
                    onClick={(event) => {
                        runBtn.disabled = true;
                        const data = {
                            reqType: "run",
                            workspaceId: currentWorkspace.id,
                            workspaceName: currentWorkspace.name.current,
                            codeOption: currentWorkspace.codeOption.checked,
                            outputOption: currentWorkspace.outputOption.checked,
                            codeText: currentWorkspace.codeText,
                            isUpdated: currentWorkspace.output.isUpdated,
                        };
                        const dataJSON = JSON.stringify(data);
                        Ajax("POST", "/", {responseType: "json"}).contentType("json").done(dataJSON, (response) => {
                            response.stdout=response.stdout.replace(/\\:/g,':');
                            this.props.getRunResponse(currentWorkspace.id, response);
                            this.setState({
                                buttonType: "Run",
                            })
                        });
                        this.setState({
                            buttonType: "Stop",
                        })
                        runBtn.onClick = null;
                    }}
                >Run</button>
            )
        }else{
            return (
                <button className={cssStyle.BtnAnimated} ref={(button) => {stopBtn = button}}
                    onClick={(event) => {
                        stopBtn.disabled = true;
                        const data = {
                            reqType: "abort",
                            abortRequestFor: "Run",
                            workspaceId: currentWorkspace.id,
                            workspaceName: currentWorkspace.name.current,
                        };
                        const dataJSON = JSON.stringify(data);
                        Ajax("POST", "/", { responseType: "json" }).contentType("json").done(dataJSON, (response) => {
                            this.setState({
                                buttonType: "Run",
                            })
                        });
                        stopBtn.onClick = null;
                    }}
                >Stop</button>
            )
        }
    }
})

export default memo(RunStopButton);
