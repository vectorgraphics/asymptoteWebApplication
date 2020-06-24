import React, {memo} from 'react';
import cssStyle from './DownloadButton.module.css';
import {connect} from 'react-redux';
import {actionFact} from '../../Store/store';
import {Ajax, workspaceInspector} from '../../Util/util';

const ContainerConstructor = connect ((store) => ({workspaces: store.workspaces, selectedWorkspace: store.selectedWorkspace}),
{
    getRunResponse : actionFact.getRunResponse,
})

const activeColor = "rgb(200, 200, 200)";
const inactiveColor = "rgb(119, 136, 153)";

const DownloadButton = ContainerConstructor((props) => {

    const currentWorkspace = workspaceInspector(props);
    const noWorkspace = currentWorkspace.id === null;
    const emptyEditor = currentWorkspace.codeText === "";
    const noOptionChecked = !currentWorkspace.codeOption.checked && !currentWorkspace.outputOption.checked;
    const onlyCodeChecked = currentWorkspace.codeOption.checked && !currentWorkspace.outputOption.checked;
    const onlyOutputChecked = !currentWorkspace.codeOption.checked && currentWorkspace.outputOption.checked;
    const bothOptionsChecked = currentWorkspace.codeOption.checked && currentWorkspace.outputOption.checked;

    let downloadBTN = null;

    return (
        <button ref={(button) => downloadBTN = button} className={cssStyle.downloadBtn} 
                disabled={(noWorkspace || emptyEditor || noOptionChecked)}
                style={(noWorkspace || emptyEditor || noOptionChecked)? {color: inactiveColor}:{color: activeColor}}
                onClick={(event) => {
                    downloadBTN.classList.remove(cssStyle.downloadBtn);
                    downloadBTN.classList.add(cssStyle.downloadBtnAnimated);
                    const link = document.createElement("a");
                    
                    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  ONLY CODE
                    if(onlyCodeChecked){
                        downloadBTN.disabled = true;
                        downloadBTN.style.color = inactiveColor;
                        const data = {
                            reqType: "preRun",
                            workspaceId: currentWorkspace.id,
                            workspaceName: currentWorkspace.name.current,
                            codeOption: currentWorkspace.codeOption.checked,
                            outputOption: currentWorkspace.outputOption.checked,
                            codeText: currentWorkspace.codeText,
                            requestedOutformat: currentWorkspace.outformat,
                            partialMode: true
                        };
                        const dataJSON = JSON.stringify(data);
                        Ajax("POST", "/").contentType("json").done(dataJSON, (response) => {
                            downloadBTN.disabled = false;
                            downloadBTN.style.color = activeColor;
                            const parsedResponse = JSON.parse(response);
                            if(parsedResponse.status !== "PreRun_AsyFile_Saved"){
                                props.getRunResponse(currentWorkspace.id, parsedResponse);
                                downloadBTN.classList.remove(cssStyle.downloadBtnAnimated);
                                downloadBTN.classList.add(cssStyle.downloadBtn);                                   
                            }else{
                                Ajax("POST", "/clients", {responseType: "blob"}).contentType("json").done(dataJSON, (response) => {
                                    downloadBTN.disabled = false;
                                    downloadBTN.style.color = activeColor;
                                    downloadBTN.classList.remove(cssStyle.downloadBtnAnimated);
                                    downloadBTN.classList.add(cssStyle.downloadBtn);
                                    link.href = window.URL.createObjectURL(response);
                                    link.setAttribute("download", currentWorkspace.name.current + ".asy");
                                    link.click();
                                });
                            }
                        });
                    
                    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  ONLY OUTPUT
                    }else if(onlyOutputChecked){
                        let buttonText = downloadBTN.childNodes[0].nodeValue;
                        if (buttonText === "Download") {
                            downloadBTN.childNodes[0].nodeValue = "Stop";
                            const data = {
                                reqType: "preRun",
                                workspaceId: currentWorkspace.id,
                                workspaceName: currentWorkspace.name.current,
                                codeOption: currentWorkspace.codeOption.checked,
                                outputOption: currentWorkspace.outputOption.checked,
                                codeText: currentWorkspace.codeText,
                                requestedOutformat : currentWorkspace.outformat,
                                partialmode: false
                            };
                            
                            const dataJSON = JSON.stringify(data);
                            Ajax("POST", "/").contentType("json").done(dataJSON, (response) => {
                                const parsedResponse = JSON.parse(response);
                                console.log(parsedResponse);
                                if (parsedResponse.status !== "PreRun_Output_Saved"){
                                    downloadBTN.childNodes[0].nodeValue = "Download";
                                    downloadBTN.classList.remove(cssStyle.downloadBtnAnimated);
                                    downloadBTN.classList.add(cssStyle.downloadBtn);
                                    props.getRunResponse(currentWorkspace.id, parsedResponse);
                                }else{
                                    Ajax("POST", "/clients", {responseType: "blob"}).contentType("json").done(dataJSON, (response) => {
                                        downloadBTN.childNodes[0].nodeValue = "Download";
                                        downloadBTN.classList.remove(cssStyle.downloadBtnAnimated);
                                        downloadBTN.classList.add(cssStyle.downloadBtn);
                                        link.href = window.URL.createObjectURL(response);
                                        link.setAttribute("download", currentWorkspace.name.current + "." + currentWorkspace.outformat);
                                        link.click();
                                    });
                                }
                            });
                        }else{
                            downloadBTN.disabled = true;
                            downloadBTN.style.color = inactiveColor;
                            const data = {
                                reqType: "abort",
                                abortRequestFor: "Download",
                                workspaceId: currentWorkspace.id,
                                workspaceName: currentWorkspace.name.current,
                            };
                            const dataJSON = JSON.stringify(data);
                            Ajax("POST", "/", {}, false).contentType("json").done(dataJSON, (response) => {
                                downloadBTN.childNodes[0].nodeValue = "Download";
                                downloadBTN.classList.remove(cssStyle.downloadBtnAnimated);
                                downloadBTN.classList.add(cssStyle.downloadBtn);
                                downloadBTN.disabled = false;
                                downloadBTN.style.color = activeColor;
                                // const parsedResponse = JSON.parse(response);
                                // props.getRunResponse(currentWorkspace.id, parsedResponse);
                            });                            
                        }
                        
                    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  BOTH CODE & OUTPUT
                    }else if(bothOptionsChecked){
                        let buttonText = downloadBTN.childNodes[0].nodeValue;
                        if (buttonText === "Download") {
                            downloadBTN.childNodes[0].nodeValue = "Stop";
                            const data = {
                                reqType: "preRun",
                                workspaceId: currentWorkspace.id,
                                workspaceName: currentWorkspace.name.current,
                                codeOption: currentWorkspace.codeOption.checked,
                                outputOption: currentWorkspace.outputOption.checked,
                                codeText: currentWorkspace.codeText,
                                requestedOutformat: currentWorkspace.outformat,
                                partialmode: false
                            };
                            let dataJSON = JSON.stringify(data);
                            Ajax("POST", "/").contentType("json").done(dataJSON, (response) => {
                                const parsedResponse = JSON.parse(response);
                                if (parsedResponse.status !== "PreRun_Output_Saved"){
                                    downloadBTN.childNodes[0].nodeValue = "Download";
                                    downloadBTN.classList.remove(cssStyle.downloadBtnAnimated);
                                    downloadBTN.classList.add(cssStyle.downloadBtn);
                                    props.getRunResponse(currentWorkspace.id, parsedResponse);
                                }else{
                                    data.codeOption = true;
                                    data.outputOption = false;
                                    dataJSON = JSON.stringify(data);
                                    Ajax("POST", "/clients", {responseType: "blob"}).contentType("json").done(dataJSON, (response) => {
                                        downloadBTN.childNodes[0].nodeValue = "Download";
                                        downloadBTN.classList.remove(cssStyle.downloadBtnAnimated);
                                        downloadBTN.classList.add(cssStyle.downloadBtn);
                                        link.href = window.URL.createObjectURL(response);
                                        link.setAttribute("download", currentWorkspace.name.current + ".asy");
                                        link.click();
                                    });                                   
                                    data.codeOption = false;
                                    data.outputOption = true;
                                    dataJSON = JSON.stringify(data);
                                    Ajax("POST", "/clients", {responseType: "blob"}).contentType("json").done(dataJSON, (response) => {
                                        downloadBTN.classList.remove(cssStyle.downloadBtnAnimated);
                                        downloadBTN.classList.add(cssStyle.downloadBtn);
                                        link.href = window.URL.createObjectURL(response);
                                        link.setAttribute("download", currentWorkspace.name.current + "." + currentWorkspace.outformat);
                                        link.click();
                                    });                                            
                                }
                            });
                        }else{
                            downloadBTN.disabled = true;
                            downloadBTN.style.color = inactiveColor;
                            const data = {
                                reqType: "abort",
                                abortRequestFor: "Download",
                                workspaceId: currentWorkspace.id,
                                workspaceName: currentWorkspace.name.current,
                            };
                            const dataJSON = JSON.stringify(data);
                            Ajax("POST", "/", {}, false).contentType("json").done(dataJSON, (response) => {
                                downloadBTN.childNodes[0].nodeValue = "Download";
                                downloadBTN.classList.remove(cssStyle.controlBtnAnimated);
                                downloadBTN.classList.add(cssStyle.controlBtn);
                                downloadBTN.disabled = false;
                                downloadBTN.style.color = activeColor;
                                // const parsedResponse = JSON.parse(response);
                                // props.getRunResponse(currentWorkspace.id, parsedResponse);
                            });  
                        }                            
                    }                        
                }
            }                        
        >Download</button>
    )
})
    
export default memo(DownloadButton);