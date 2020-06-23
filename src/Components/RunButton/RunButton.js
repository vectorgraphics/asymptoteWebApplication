import React, {memo} from 'react';
import cssStyle from './RunButton.module.css';
import {connect} from 'react-redux';
import {actionFact} from '../../Store/store';
import {Ajax, workspaceInspector} from '../../Util/util';

const ContainerConstructor = connect ((store) => ({workspaces: store.workspaces, selectedWorkspace: store.selectedWorkspace}),
{
    getRunResponse : actionFact.getRunResponse,
})

const inactiveColor = "rgb(119, 136, 153)";
const activeColor = "rgb(200, 200, 200)";
  
const RunButton = ContainerConstructor((props) => {

    const currentWorkspace = workspaceInspector(props);
    const noWorkspace = currentWorkspace.id === null;
    const emptyEditor = currentWorkspace.codeText === "";
    let runBTN = null;

    return (
        <div className={props.cssClass}>
            <button ref={(button) => runBTN = button} className={cssStyle.runBtn}
                    style={(noWorkspace || emptyEditor)? {color: inactiveColor}:{color: activeColor}} 
                    disabled={(noWorkspace || emptyEditor)}
                    onClick={(event) => {
                            let buttonText = runBTN.childNodes[0].nodeValue;
                            if(buttonText === "Run"){
                                runBTN.childNodes[0].nodeValue = "Stop";
                                runBTN.classList.remove(cssStyle.runBtn);
                                runBTN.classList.add(cssStyle.runBtnAnimated);                                
                                const data = {
                                    reqType: "run",
                                    workspaceId: currentWorkspace.id,
                                    workspaceName: currentWorkspace.name.current,
                                    codeOption: currentWorkspace.codeOption.checked,
                                    outputOption: currentWorkspace.outputOption.checked,
                                    codeText: currentWorkspace.codeText,
                                    isUpdated : currentWorkspace.output.isUpdated,
                                };
                                const dataJSON = JSON.stringify(data);
                                Ajax("POST", "/").contentType("json").done(dataJSON, (response) => {
                                    runBTN.childNodes[0].nodeValue = "Run";
                                    runBTN.classList.remove(cssStyle.runBtnAnimated);  
                                    runBTN.classList.add(cssStyle.runBtn);
                                    const parsedResponse = JSON.parse(response);
                                    props.getRunResponse(currentWorkspace.id, parsedResponse);
                                });
                            } else {
                                runBTN.disabled = true;
                                runBTN.style.color = inactiveColor;
                                const data = {
                                    reqType: "abort",
                                    abortRequestFor: "Run",
                                    workspaceId: currentWorkspace.id,
                                    workspaceName: currentWorkspace.name.current,
                                };
                                const dataJSON = JSON.stringify(data);
                                Ajax("POST", "/", {}, false).contentType("json").done(dataJSON, (response) => {
                                    runBTN.childNodes[0].nodeValue = "Run";
                                    runBTN.disabled = false;
                                    runBTN.style.color = activeColor;
                                    runBTN.classList.remove(cssStyle.runBtnAnimated);
                                    runBTN.classList.add(cssStyle.runBtn);                                        
                                    // const parsedResponse = JSON.parse(response);
                                    // props.getRunResponse(currentWorkspace.id, parsedResponse);
                                });
                                
                            }
                        }
                    }
                    >Run</button>
        </div>
    )
})

export default memo(RunButton);