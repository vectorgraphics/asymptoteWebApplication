import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material";
import { tags } from "@lezer/highlight";
import { HighlightStyle } from "@codemirror/language";
import { standardTypeName, functionExpr, functionCall, functionDef } from "./asyLanguage/asyParser/highlight.js";
import { setCurrentCode, setCursorPos, selectCurrentCode, selectCursorPos } from "../../../../state/slices/inputsSlice.js";
import { selectLineNumber, selectFontSize, selectKeyBinding } from "../../../../state/slices/editorSettingsSlice.js";
import { selectCurrentWsId } from "../../../../state/slices/workspacesInfoSlice.js";
import { asymptote } from "./asyLanguage/src/asymptote.ts";
import { EditorState, EditorSelection } from '@codemirror/state';
import {
  EditorView, keymap, highlightSpecialChars, drawSelection,
  highlightActiveLine, dropCursor, rectangularSelection,
  crosshairCursor, lineNumbers, highlightActiveLineGutter
} from "@codemirror/view";
import { syntaxHighlighting, indentOnInput, bracketMatching, foldGutter, foldKeymap } from "@codemirror/language";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { searchKeymap, highlightSelectionMatches } from "@codemirror/search";
import { autocompletion, completionKeymap, closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete";
import { lintKeymap } from "@codemirror/lint";
import { vscodeKeymap } from "@replit/codemirror-vscode-keymap";
import { emacs } from "@replit/codemirror-emacs";
import { vim } from "@replit/codemirror-vim";


export const CodeContainer = ({codeInEditor="", onKeyDown = null}) => {
  const dispatch = useDispatch();
  const isLineNumber = useSelector(selectLineNumber);
  const currentWsId = useSelector(selectCurrentWsId);
  const savedCode = useSelector(selectCurrentCode);
  const cursorSavedPos = useSelector(selectCursorPos);
  const fontSize = useSelector(selectFontSize);
  const keyBinding = useSelector(selectKeyBinding).toLowerCase();
  const awaTheme = useTheme();
  const editorViewRef = useRef(null);
  const divId = useRef(1);
  
  const themeObj = {
    "&": {
      backgroundColor: "transparent",
      margin: 0,
      padding: 0,
      fontSize: `${fontSize}px`
    },
    // "&.cm-gutter &.cm-foldGutter": {
    //   backgroundColor: "red",
    //   color: "red",
    // },

    // ".cm-panels": {backgroundColor: "red", color: "blue"},
    // ".cm-panels.cm-panels-top": {borderBottom: "2px solid black"},
    // ".cm-panels.cm-panels-bottom": {borderTop: "2px solid black"},

    ".cm-tooltip": {
      border: "none",
      backgroundColor: awaTheme.palette.background.light,
    },
    ".cm-tooltip .cm-tooltip-arrow:before": {
      borderTopColor: "transparent",
      borderBottomColor: "transparent"
    },
    ".cm-tooltip .cm-tooltip-arrow:after": {
      borderTopColor: awaTheme.palette.text.primary,
      borderBottomColor: awaTheme.palette.text.primary
    },
    // ".cm-tooltip-autocomplete": {
    //   "& > ul > li[aria-selected]": {
    //     backgroundColor: highlightBackground,
    //     color: ivory
    //   }
    // },
  
    "&.cm-content, .cm-dropCursor": {
      caretColor: awaTheme.palette.text.primary,
    },
    "&.cm-focused .cm-cursor": {
      borderLeftColor: awaTheme.palette.text.primary,
    },
    ".cm-activeLine .cm-line": {
      backgroundColor: "gray !important",
    },
    ".cm-layer .cm-selectionBackground": {
        backgroundColor: "rgba(36, 56, 168, 1)",
    },
    // "&.cm-gutters": {
    //   backgroundColor: "darkgray",
    //   // color: awaTheme.palette.cmGutter,
    //   color: "red",
    //   border: "none"
    // },
  }
  
  const subExtensions = [
    lineNumbers(),
    foldGutter(),
    highlightSpecialChars(),
    history(),
    drawSelection(),
    dropCursor(),
    EditorState.allowMultipleSelections.of(true),
    indentOnInput(),
    bracketMatching(),
    closeBrackets(),
    autocompletion(),
    rectangularSelection(),
    crosshairCursor(),
    highlightActiveLine(),
    highlightActiveLineGutter(),
    highlightSelectionMatches(),
    keymap.of(
      keyBinding === "vscode"? vscodeKeymap: [
      ...closeBracketsKeymap,
      ...defaultKeymap,
      ...searchKeymap,
      ...historyKeymap,
      ...foldKeymap,
      ...completionKeymap,
      ...lintKeymap,
    ]),
  ]

  const colors = awaTheme.palette.codeHighlighter
  const asyHighlights = HighlightStyle.define([
    {tag: tags.definitionKeyword, color: colors.definitionKeyword},
    {tag: tags.controlKeyword, color: colors.controlKeyword},
    {tag: tags.operatorKeyword, color: colors.operatorKeyword},
    {tag: tags.namespace, color: colors.namespace},
    {tag: tags.null, color: colors.Null},
    {tag: tags.bool, color: colors.bool},
    {tag: standardTypeName, color: colors.standardTypeName},
    {tag: tags.atom, color: colors.atom},
    {tag: tags.typeName, color: colors.typeName},
    {tag: tags.propertyName, color: colors.propertyName},
    {tag: functionExpr, color: colors.functionExpr},
    {tag: tags.variableName, color: colors.variableName},
    {tag: functionCall, color: colors.functionCall},
    {tag: functionDef, color: colors.functionDef},
    {tag: tags.operator, color: colors.operator},
    {tag: tags.arithmeticOperator, color: colors.arithmeticOperator},
    {tag: tags.logicOperator, color: colors.logicOperator},
    {tag: tags.compareOperator, color: colors.compareOperator},
    {tag: tags.definitionOperator, color: colors.definitionOperator},
    {tag: tags.updateOperator, color: colors.updateOperator},
    {tag: tags.lineComment, color: colors.lineComment},
    {tag: tags.blockComment, color: colors.blockComment},
    {tag: tags.number, color: colors.number},
    {tag: tags.string, color: colors.string},
    {tag: tags.escape, color: colors.escape},
    {tag: tags.paren, color: colors.paren},
    {tag: tags.squareBracket, color: colors.squareBracket},
    {tag: tags.brace, color: colors.brace},
    {tag: tags.angleBracket, color: colors.angleBracket},
    {tag: tags.separator, color: colors.separator},
  ])

  function setCaretToEnd(view, pos) {
    view.dispatch({
      selection: EditorSelection.cursor(pos),
    });
  }

  isLineNumber ? subExtensions.shift() : "";

  useEffect(() => {
    divId.current++;
    const parentElement = document.getElementById("codemirror");
    const awaEditorTheme = EditorView.theme(themeObj, {dark: false});
    const otherExtensions = [];
    if (keyBinding === "emacs") {
      otherExtensions.push(emacs());
    } else if(keyBinding === "vim") {
      otherExtensions.push(vim());
    }

    const view = new EditorView({
      parent: parentElement,
      state: EditorState.create({
        doc: savedCode,
        extensions: [
          EditorView.updateListener.of(update => codeInEditor.current = update.state.doc.toString()),
          ...subExtensions,
          asymptote(),
          syntaxHighlighting(asyHighlights),
          awaEditorTheme,
          ...otherExtensions,
        ],
      }),
    })
    view.focus();
    setCaretToEnd(view, cursorSavedPos);
    editorViewRef.current = view;
    return () => {
      const document = view.state.doc.toString(); 
      const cursorHead = view.state.selection.main.head;
      if ( document !== savedCode) {
        dispatch(setCurrentCode({
          id: currentWsId,
          data: document
        }));
      }
      if ( cursorHead !== cursorSavedPos) {
        dispatch(setCursorPos({
          id: currentWsId,
          data: cursorHead
        }));
      }
    }
  }, )

  return (
    <div
      key={divId.current + currentWsId}
      id="codemirror"
      style={{
        width: "100%",
        overflow: "auto"
      }}
      onKeyDown={onKeyDown}
    >
    </div>
  );
};


    // <textarea
    //   ref={taRef}
    //   style={{
    //     minWidth: "100%",
    //     maxHeight: "100%",
    //     flexGrow: 1,
    //     fontSize: "1rem",
    //     padding: "0.5rem",
    //     color: `${awaTheme.palette.text.primary}`,
    //     backgroundColor: "transparent",
    //     outline: "none",
    //     border: "none",
    //     resize: "none",
    //     overflow: "auto",
    //   }}
    //   autoFocus
    //   onKeyDown={onKeyDown}
    //   onClick={() => taRef.current.focus()}
    //   onInput={(event) => dispatch(setCurrentCode(event.currentTarget.value))}
    //   placeholder={"Code text goes here"}
    // />