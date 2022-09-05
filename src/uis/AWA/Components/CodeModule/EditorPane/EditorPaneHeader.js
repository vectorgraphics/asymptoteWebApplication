import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  idSelector, previewPaneViewSelector, editorLineNumbersSelector,
  editorKeyBindingSelector, editorFontsizeSelector
} from "../../../../../store/selectors";
import { enActionCreator } from "../../../../../store/workspaces";
import { glActionCreator } from "../../../../../store/globals";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowControllers } from "../ArrowControllers";
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { FormatListNumbered as FormatListNumberedIcon } from '@material-ui/icons';
import { FontIcon, KeyboardIcon } from "../../../../../assets/svgs/appwideSvgs.js";
import { SplitBtn } from "../../../Atoms/SplitBtn.js";
import { Upload } from "./Upload.js";
import { RunStop } from "./RunStop.js";
import { Download } from "./Download.js";
import { Erase } from "./Erase.js";


const useStyle = makeStyles((theme) => ({
  headerCont: {
    display: "flex",
    flexFlow: "row nowrap",
    minHeight: "2rem",
    maxHeight: "2rem",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.background.headerType1,
    "&::selection": {
      backgroundColor: "transparent",
    }
  },
  actionButtons: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  lineNumbering: {
    display: "flex",
    flexFlow: "row nowrap",
    padding: "0 0.5rem",
    marginLeft: "1.5rem",
    borderRight: "2px groove dimgray",
  },
  otherButtons: {
    display: "flex",
    padding: "0 0.5rem",
    alignItems: "center",
    borderRight: "2px groove dimgray",

  },
  fontIcon: {
    minWidth: "1.25rem",
    maxWidth: "1.25rem",
    minHeight: "1.25rem",
    maxHeight: "1.25rem",
  },
}));

export function EditorPaneHeader(props) {
  const locClasses = useStyle();
  const id = useSelector(idSelector);
  const previewPaneView = useSelector(previewPaneViewSelector);
  let editorKeybinding = useSelector(editorKeyBindingSelector);
  let editorFontsize = useSelector(editorFontsizeSelector);
  const dispatch = useDispatch();

  editorKeybinding = (editorKeybinding === "default")? "Default": editorKeybinding;
  editorFontsize = (editorFontsize === "default")? "Default": editorFontsize;

  return (
    <div className={locClasses.headerCont}>
      <div className={locClasses.actionButtons}>
        <div className={locClasses.lineNumbering}>
          <MultipleToggleButtons/>
        </div>
        <div className={locClasses.otherButtons}>
          <SplitBtn
            splitType="splitStatic" items={["Default", "Small", "Medium", "Large"]}
            finalStyle={fontSplitBtn} currentItem={editorFontsize} disableElevation={true}
            onSelect={(selectedFontSize) => dispatch(glActionCreator.setEditorFontsize(selectedFontSize))}
          >
            <FontIcon className={locClasses.fontIcon}/>
          </SplitBtn>
        </div>
        <div className={locClasses.otherButtons}>
          <SplitBtn
            splitType="splitStatic" items={["Default", "Vim", "Emacs", "Sublime"]}
            finalStyle={keyboardSplitBtn} currentItem={editorKeybinding} disableElevation={true}
            onSelect={(selectedKeyBinding) => dispatch(glActionCreator.setKeyBinding(selectedKeyBinding))}
          >
            <KeyboardIcon className={locClasses.keyboardIcon}/>
          </SplitBtn>
        </div>
        <div className={locClasses.otherButtons}> <Upload/> </div>
        <div className={locClasses.otherButtons}> <RunStop/> </div>
        <div className={locClasses.otherButtons}> <Download/> </div>
        <div className={locClasses.otherButtons}> <Erase/> </div>
      </div>
      <ArrowControllers
        pane="editor" status={previewPaneView}
        onClick={(event) => dispatch(enActionCreator.setPreviewPaneView(id, !previewPaneView))}/>
    </div>
  );
}


const useInternalStyle = makeStyles((theme) => ({
  toggleButtonGroup: {
    minHeight: "1.5rem",
    maxHeight: "1.5rem",
  },
  toggleButton: {
    minWidth: "1.5rem",
    maxWidth: "1.5rem",
    borderRadius: 0,
  },
}));

 function MultipleToggleButtons(props) {
  const locClasses = useInternalStyle();
  const editorLineNumbers = useSelector(editorLineNumbersSelector);
  const [format, setFormat] = useState(() => [editorLineNumbers]);
  const dispatch = useDispatch();
  const handleFormat = (event, newFormats) => {
    setFormat(newFormats);
    const locVar = (newFormats.length === 0)? false: newFormats[0];
    dispatch(glActionCreator.setEditorLineNumbers(locVar));
  };

  return (
    <ToggleButtonGroup classes={{root: locClasses.toggleButtonGroup}} value={format} onChange={handleFormat}>
      <ToggleButton classes={{root: locClasses.toggleButton}} value={true} disableRipple={true}>
        <FormatListNumberedIcon/>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}




const fontSplitBtn = {
  btnSize: {
    maxWidth: "4rem",
    minWidth: "4rem",
  },
  groupBtn: {
    "& span": {
      minWidth: "1.25rem",
      maxWidth: "1.25rem",
      minHeight: "1.25rem",
      maxHeight: "1.25rem",
    }
  }
}

const keyboardSplitBtn = {
  btnSize: {
    maxWidth: "4rem",
    minWidth: "4rem",
  },
  groupBtn: {
    "& span": {
      minWidth: "1.5rem",
      maxWidth: "1.5rem",
      minHeight: "1.5rem",
      maxHeight: "1.5rem",
    }
  }
}
