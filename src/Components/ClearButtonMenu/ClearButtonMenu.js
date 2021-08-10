import React, { memo } from 'react';
import cssStyle from './ClearButtonMenu.module.css';
import { connect } from 'react-redux';
import { actionFact } from '../../Store/store';
import { workspaceInspector } from '../../Util/util';

const ContainerConstructor = connect((store) => ({ workspaces: store.workspaces, selectedWorkspace: store.selectedWorkspace }),
  {
    uploadCode: actionFact.uploadCode,
    updateTextareaContent: actionFact.updateTextareaContent,
    getRunResponse: actionFact.getRunResponse
  })

const ClearSubMenu = ContainerConstructor((props) => {

  const currentWorkspace = workspaceInspector(props);


  return (
    <div className={cssStyle.menuContainer}>
      <div className={cssStyle.menuBtnsContainer}>
        <button className={cssStyle.menuBtn}
          onClick={(event) => {
            props.updateTextareaContent(currentWorkspace.id, "");
            props.uploadCode(currentWorkspace.id, !currentWorkspace.uploaded);
            props.wipeSubMenuOut()
          }
          }
        >Code</button>
        <button className={cssStyle.menuBtn}
          onClick={(event) => {
            let clearedOutput = currentWorkspace.output;
            clearedOutput.responseType = "CLEARED";
            props.getRunResponse(currentWorkspace.id, clearedOutput);
            props.wipeSubMenuOut()
          }
          }
        >Output</button>
        <button className={cssStyle.menuBtn}
          onClick={(event) => {
            let clearedOutput = currentWorkspace.output;
            clearedOutput.responseType = "CLEARED";
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