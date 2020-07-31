import React, { memo } from 'react';
import cssStyle from './CodePaneHeader.module.css';
import { connect } from 'react-redux';
import { actionFact } from "../../Store/store";
import { workspaceInspector } from "../../Util/util";

const Containerconstructor = connect((store) => ({ workspaces: store.workspaces, selectedWorkspace: store.selectedWorkspace }),
  {
    corePanesDisplay: actionFact.corePanesDisplay
  })


const CodePaneHeader = Containerconstructor((props) => {
  const currentWorkspace = workspaceInspector(props);
  return (
    <div className={cssStyle.corePanesHeader}>
      <div className={cssStyle.title}> {currentWorkspace.name.current + '.asy'} </div>
      <div className={(currentWorkspace.corePanesDisplay.codePane && currentWorkspace.corePanesDisplay.outputPane) ? cssStyle.collapseExpand : cssStyle.collapseExpandBack}
        onClick={(event) => {
          const newValue = !currentWorkspace.corePanesDisplay.outputPane;
          if (currentWorkspace.id !== null) {
            props.corePanesDisplay(currentWorkspace.id, { codePane: true, outputPane: newValue });
          }
        }
        }
      >  </div>
    </div>
  )
})

export default memo(CodePaneHeader);