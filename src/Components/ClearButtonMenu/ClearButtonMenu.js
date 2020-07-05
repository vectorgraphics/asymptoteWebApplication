import React, {memo} from 'react';
import cssStyle from './ClearButtonMenu.module.css';
import {connect} from 'react-redux';
import {actionFact} from '../../Store/store';
import {workspaceInspector} from '../../Util/util';

const ContainerConstructor = connect ((store) => ({workspaces: store.workspaces, selectedWorkspace: store.selectedWorkspace}),
{
    updateTextareaContent : actionFact.updateTextareaContent,
    getRunResponse : actionFact.getRunResponse
})

const ClearSubMenu = ContainerConstructor((props) => {

    const currentWorkspace = workspaceInspector(props);
    let clearedOutput = currentWorkspace.output;
    clearedOutput.responseType = "CLEARED";

    return (
        <div className={cssStyle.menuContainer}>
            <div className={cssStyle.menuBtnsContainer}>
                <button className={cssStyle.menuBtn}
                        onClick={(event) => {
                                props.updateTextareaContent(currentWorkspace.id, "");
                                props.wipeSubMenuOut()
                            }
                        }
                    >Code</button>
                <button className={cssStyle.menuBtn}
                        onClick={(event) => {
                                props.getRunResponse(currentWorkspace.id, clearedOutput);
                                props.wipeSubMenuOut()
                            }
                        }
                    >Output</button>
                <button className={cssStyle.menuBtn}
                        onClick={(event) => {
                                props.getRunResponse(currentWorkspace.id, clearedOutput);
                                props.updateTextareaContent(currentWorkspace.id, "");
                                props.wipeSubMenuOut()
                            }
                        }
                    >Both</button>
            </div>
        </div>
    )
})

export default memo(ClearSubMenu);