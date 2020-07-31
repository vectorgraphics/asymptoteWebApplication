import React, { memo } from 'react';
import cssStyle from './ToggleKey.module.css';
import { connect } from 'react-redux';
import { actionFact } from "../../Store/store";

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     REACT-REDUX CONNECTION
const ContainerConstructor = connect((store) => ({
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
  if (props.workspacePaneStatus.view) {
    return (
      <div className={cssStyle.toggleKeyShow}
        onClick={() => {
          props.changeWorkspacePaneStatus(false);
        }}>
      </div>
    )
  } else {
    return (
      <div className={cssStyle.toggleKeyHide}
        onClick={() => {
          props.changeWorkspacePaneStatus(true);
        }}>
      </div>
    )

  }
})

export default memo(ToggleKey);
