import React, { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror/src/codemirror'
import cssStyle from './Editor.module.css';
import { connect } from 'react-redux';
import { actionFact } from '../../Store/store';
import { workspaceInspector } from '../../Util/util';
import './codemirror.css'
import './theme.css'
import './asymptote'
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     REACT-REDUX CONNECTION
const ContainerConstructor = connect((store) => ({ workspaces: store.workspaces, selectedWorkspace: store.selectedWorkspace }),
  {
    updateTextareaContent: actionFact.updateTextareaContent,
  })

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     EDITOR COMPONENT
const instructionText = "TO START CODING, FIRST CREATE A NEW WORKSPACE!";

const Editor = ContainerConstructor((props) => {
  const currentWorkspace = workspaceInspector(props);
  const cmInstance = useRef(null);

  useEffect(() => {
    cmInstance.current = CodeMirror.fromTextArea(document.getElementById("tmpTextarea"), {
      mode: {
        name: "asymptote",
        styleDefs: true
      },
      theme: "asyDracula",
      lineNumbers: true,
      lineWrapping: true
    });
    const scrollbarFiller = document.querySelector('.CodeMirror-scrollbar-filler');
    scrollbarFiller.parentElement.removeChild(scrollbarFiller);
    return () => {
      cmInstance.current.toTextArea();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    function txtToStore(cm) {
      props.updateTextareaContent(currentWorkspace.id, cm.getValue());
    }
    if (currentWorkspace.id === null) {
      cmInstance.current.setOption('readOnly', 'nocursor');
      cmInstance.current.setOption('value', instructionText);
    } else {
      cmInstance.current.setOption('readOnly', false);
      cmInstance.current.focus();
      console.log(currentWorkspace.codeText);
      cmInstance.current.doc.setValue(currentWorkspace.codeText);
      cmInstance.current.doc.setCursor(cmInstance.current.doc.lineCount(), 0);
    }
    cmInstance.current.on("change", txtToStore);
    return () => {
      cmInstance.current.off("change", txtToStore);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWorkspace.id]);
  return (
    <div className={cssStyle.cmContainer}>
      <textarea id="tmpTextarea" autoFocus={true}></textarea>
    </div>
  );
})

export default Editor;