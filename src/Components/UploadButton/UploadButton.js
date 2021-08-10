import React, { memo } from 'react';
import cssStyle from './UploadButton.module.css';
import { connect } from 'react-redux';
import { actionFact } from '../../Store/store';
import { workspaceInspector } from '../../Util/util';

const ContainerConstructor = connect((store) => ({ workspaces: store.workspaces, selectedWorkspace: store.selectedWorkspace }),
  {
    uploadCode: actionFact.uploadCode,
    updateTextareaContent: actionFact.updateTextareaContent
  })

const inactiveColor = "rgb(119, 136, 153)";
const activeColor = "rgb(200, 200, 200)";

const UploadButton = ContainerConstructor((props) => {
  const currentWorkspace = workspaceInspector(props);
  const noWorkspace = currentWorkspace.id === null;

  return (
    <button className={cssStyle.Btn}
      disabled={(noWorkspace)}
      style={(noWorkspace) ? { color: inactiveColor } : { color: activeColor }}
      onClick={(clickEvent) => {
        const inputElement = document.createElement("input");
        inputElement.type = "file";
        inputElement.click();
        inputElement.addEventListener("change", function (changeEvent) {
          let reader = new FileReader();
          reader.addEventListener("load", (loadEvent) => {
            props.updateTextareaContent(currentWorkspace.id, loadEvent.target.result.toString());
            props.uploadCode(currentWorkspace.id, !currentWorkspace.uploaded);
          }, false)
          reader.readAsText(this.files[0]);
        }, false)
      }}
    >Upload</button>
  )
})

export default memo(UploadButton);