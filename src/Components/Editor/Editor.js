import React from 'react';
import cssStyle from './Editor.module.css';
import { connect } from 'react-redux';
import { actionFact } from "../../Store/store";
import { workspaceInspector } from "../../Util/util";


// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     REACT-REDUX CONNECTION
const ContainerConstructor = connect((store) => ({ workspaces: store.workspaces, selectedWorkspace: store.selectedWorkspace }),
  {
    updateTextareaContent: actionFact.updateTextareaContent,
  })

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     EDITOR COMPONENT
const codingText = "Click here and enter code (end each statement with a semicolon)...";
const instructionText = "TO START CODING, FIRST CREATE A NEW WORKSPACE!";


const Editor = ContainerConstructor((props) => {
  const currentWorkspace = workspaceInspector(props);
  return (
    <textarea
      className={cssStyle.textarea} name="editor" placeholder={(currentWorkspace.id !== null) ? codingText : instructionText}
      disabled={currentWorkspace.id === null} value={currentWorkspace.codeText}
    onChange={(event) => props.updateTextareaContent(currentWorkspace.id, event.target.value.replace(/\xa0/g,' '))}
    ></textarea>
  );

})

export default Editor;
