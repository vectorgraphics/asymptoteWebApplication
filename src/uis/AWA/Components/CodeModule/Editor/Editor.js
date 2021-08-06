import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useRef } from 'react';
// import CodeMirror from 'codemirror/src/codemirror'
// import { connect } from 'react-redux';
// import { actionFact } from '../../Store/store';
// import { workspaceInspector } from '../../Util/util';
import './codemirror/codemirror.css';
import './codemirror/theme.css';
import './codemirror/asymptote';
import './codemirror/keymap/emacs';
import './codemirror/keymap/sublime';
import './codemirror/keymap/vim';
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     REACT-REDUX CONNECTION
// const ContainerConstructor = connect((store) => ({
//   workspaces: store.workspaces,
//   selectedWorkspace: store.selectedWorkspace,
//   editorKeyBinding: store.editorKeyBinding
// }), {
//   updateTextareaContent: actionFact.updateTextareaContent,
// })

const useStyle = makeStyles((theme) => ({
  editor: {
    display: "block",
    flex: "10 1 auto",
    overflowY: "auto",
    // backgroundColor: "green",
  },
}));

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     EDITOR COMPONENT
// const instructionText = "TO START CODING, FIRST CREATE A NEW WORKSPACE!";

// const Editor = ContainerConstructor((props) => {
export function Editor(props) {
  const classes = useStyle();
  // const currentWorkspace = workspaceInspector(props);
  // const cmInstance = useRef(null);

  // useEffect(() => {
  //   cmInstance.current = CodeMirror.fromTextArea(document.getElementById("tmpTextarea"), {
  //     mode: {
  //       name: "asymptote",
  //       styleDefs: true
  //     },
  //     theme: "asyDracula",
  //     lineNumbers: true,
  //     lineWrapping: true,
  //   });
  //   const scrollbarFiller = document.querySelector('.CodeMirror-scrollbar-filler');
  //   scrollbarFiller.parentElement.removeChild(scrollbarFiller);
  //   if (props.editorKeyBinding !== 'default') {
  //     cmInstance.current.setOption('keyMap', props.editorKeyBinding);
  //   }
  //
  //   return () => cmInstance.current.toTextArea();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [props.editorKeyBinding]);
  //
  // useEffect(() => {
  //   function txtToStore(cm) {
  //     props.updateTextareaContent(currentWorkspace.id, cm.getValue());
  //   }
  //   if (currentWorkspace.id === null) {
  //     cmInstance.current.setOption('readOnly', 'nocursor');
  //     cmInstance.current.setOption('value', instructionText);
  //   } else {
  //     cmInstance.current.setOption('readOnly', false);
  //     cmInstance.current.focus();
  //     cmInstance.current.doc.setValue(currentWorkspace.codeText);
  //     cmInstance.current.doc.setCursor(cmInstance.current.doc.lineCount(), 0);
  //   }
  //   cmInstance.current.on('change', txtToStore);
  //   return () => cmInstance.current.off('change', txtToStore);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentWorkspace.id, props.editorKeyBinding]);

  return (
    <div className={classes.editor}>
      {/*<textarea id="tmpTextarea" autoFocus={true}></textarea>*/}
    </div>
  );
// })
}