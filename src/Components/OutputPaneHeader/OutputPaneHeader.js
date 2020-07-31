import React, { memo } from 'react';
import cssStyle from './OutputPaneHeader.module.css';
import { connect } from 'react-redux';
import { actionFact } from "../../Store/store";
import { workspaceInspector } from "../../Util/util";

const Containerconstructor = connect((store) => ({ workspaces: store.workspaces, selectedWorkspace: store.selectedWorkspace }),
  {
    corePanesDisplay: actionFact.corePanesDisplay,
  })

const CorePaneHeader = Containerconstructor((props) => {
  const currentWorkspace = workspaceInspector(props)
  return (
    <div className={cssStyle.corePanesHeader}>
      <div className={(currentWorkspace.corePanesDisplay.codePane && currentWorkspace.corePanesDisplay.outputPane) ? cssStyle.collapseExpand : cssStyle.collapseExpandBack}
        onClick={(event) => {
          const newValue = !currentWorkspace.corePanesDisplay.codePane;
          if (currentWorkspace.id !== null) {
            props.corePanesDisplay(currentWorkspace.id, { codePane: newValue, outputPane: true });
          }
        }
        }
      > </div>
      <div id="codeTitle" className={cssStyle.title} >
        {currentWorkspace.name.current + ".html"}
      </div>
    </div>
  )
})

export default memo(CorePaneHeader);