import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  idSelector, appResetSelector, themeSelector, cmCurrentCodeSelector, editorKeyBindingSelector,
  editorReRenderSelector, editorLineNumbersSelector, editorFontsizeSelector,
} from "../../../../../store/selectors";
import { enActionCreator } from "../../../../../store/workspaces";
import { cmActionCreator } from "../../../../../store/codeModule";
import { makeStyles } from "@material-ui/core/styles";
import CodeMirror from "codemirror/src/codemirror";
import "./codemirror/codemirror.css";
import "./codemirror/theme.css";
import "./codemirror/asymptote";
import "./codemirror/keyMaps/emacs";
import "./codemirror/keyMaps/sublime";
import "./codemirror/keyMaps/vim";

const useStyle = makeStyles((theme) => ({
  editor: {
    gridRow: "2/3",
    alignSelf: "stretch",
    overflowY: "auto",
  },
  textarea: {
    display: "none",
    border: "none",
  }
}));

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     EDITOR COMPONENT
export const Editor = (props) => {
  const locClasses = useStyle();
  const cmInstance = useRef(null);
  const id = useSelector(idSelector);
  const currentCode = useSelector(cmCurrentCodeSelector);
  const editorLineNumber = useSelector(editorLineNumbersSelector);
  const editorReRender = useSelector(editorReRenderSelector);
  const editorKeyBinding = useSelector(editorKeyBindingSelector);
  const editorFontSize = useSelector(editorFontsizeSelector);
  const appRequest  = useSelector(appResetSelector);
  const selectedTheme = useSelector(themeSelector);
  const dispatch = useDispatch();

  let fontSize = "14px";
  switch (editorFontSize) {
    case "small":
      fontSize = "12px";
      break;
    case "medium":
      fontSize = "16px";
      break;
    case "large":
      fontSize = "18px";
      break;
    case "default":
      fontSize = "14px";
      break;
      default:
      fontSize = "14px";
      break;
  };

  useEffect(() => {
    cmInstance.current = CodeMirror.fromTextArea(document.getElementById("tmpTextarea"), {
      mode: {
        name: "asymptote",
        styleDefs: true,
      },
      theme: selectedTheme,
      lineNumbers: editorLineNumber,
      lineWrapping: true,
    });
    const scrollbarFiller = document.querySelector('.CodeMirror-scrollbar-filler');
    scrollbarFiller.parentElement.removeChild(scrollbarFiller);
    if (editorKeyBinding !== "default") {
      cmInstance.current.setOption('keyMap', editorKeyBinding);
    }
    cmInstance.current.getWrapperElement().style.fontSize = fontSize;                  // Setting fontSize each time the "editorKeyBinding" changes
    return () => cmInstance.current.toTextArea();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorKeyBinding, editorLineNumber]);

  useEffect(() => {
    cmInstance.current.getWrapperElement().style.fontSize = fontSize;                                      // Setting the awaReborn "selectedTheme" as the Codemirror theme
    if (selectedTheme === "darkTheme") {
      cmInstance.current.getWrapperElement().classList.remove("cm-s-lightTheme");
      cmInstance.current.getWrapperElement().classList.add("cm-s-darkTheme");
    } else {
      cmInstance.current.getWrapperElement().classList.remove("cm-s-darkTheme");
      cmInstance.current.getWrapperElement().classList.add("cm-s-lightTheme");
    }
  }, [selectedTheme]);


  useEffect(() => {                                                                   // Changing the editor fontSize
    cmInstance.current.getWrapperElement().style.fontSize = fontSize;
    dispatch(enActionCreator.reRenderEditor(id, editorReRender + 1));
  }, [editorFontSize]);

  useEffect(() => {
    function txtToStore(cm) {
      dispatch(cmActionCreator.setCurrentCode(id, cm.getValue()));
    }
    cmInstance.current.on('change', txtToStore);
    return () => cmInstance.current.off('change', txtToStore);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    cmInstance.current.setValue(currentCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appRequest, editorReRender]);

  return (
    <div className={locClasses.editor}>
      <textarea id="tmpTextarea" className={locClasses.textarea} autoFocus={true}/>
    </div>
  );
};