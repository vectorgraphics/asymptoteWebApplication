import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { idSelector, editorLineNumbersSelector } from "../../../../../store/selectors";
import { enActionCreator } from "../../../../../store/workspaces";
import { glActionCreator } from "../../../../../store/globals";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowControllers } from "../ArrowControllers";
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import { MenuBtn } from "../../../Atoms/MenuBtn";


const useStyle = makeStyles((theme) => ({
  header: {
    display: "flex",
    flexFlow: "row nowrap",
    flex: "1 1 auto",
    minHeight: "2rem",
    maxHeight: "2rem",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.background.Header2,
    "&::selection": {
      backgroundColor: "transparent",
    }
  },
  editorSettings: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  sectionOne: {
    display: "flex",
    flexFlow: "row nowrap",
    padding: "0 0.5rem",
    borderRight: "2px groove dimgray",
  },
  toggleButtonGroup: {
    minHeight: "1.5rem",
    maxHeight: "1.5rem",
  },
  toggleButton: {
    minWidth: "1.5rem",
    maxWidth: "1.5rem",
    borderRadius: 0,
  },
  fontIcon: {
    minHeight: "1.5rem",
    maxHeight: "1.5rem",
  },
  sectionsTwoThree: {
    padding: "0 0.5rem",
    borderRight: "2px groove dimgray",
  },
}));

export function EditorHeader(props) {
  const locClasses = useStyle();
  const id = useSelector(idSelector);
  const previewPaneView = useSelector((store) => {
    return (id)? store.workspaces.entities[id].previewPaneView: true;
  });
  const dispatch = useDispatch();

  return (
    <div className={locClasses.header}>
      <div className={locClasses.editorSettings}>
        <div className={locClasses.sectionOne}>
          <MultipleToggleButtons />
        </div>
        <div className={locClasses.sectionsTwoThree}>
          <MenuBtn disableElevation={true}
            cssStyle={cssStyle} btnIcon={<FontIcon classes={locClasses.fontIcon}/>}
            items={["Default", "Small", "Medium", "Large"]} passedData={id}
            passedHandler={(selectedFontSize) => dispatch(glActionCreator.setEditorFontsize(selectedFontSize))}
          />
        </div>
        <div className={locClasses.sectionsTwoThree}>
          <MenuBtn disableElevation={true}
            cssStyle={cssStyle} btnIcon={<KeyboardIcon/>}
            items={["Default", "Vim", "Emacs", "Sublime"]} passedData={id}
            passedHandler={(selectedKeyBinding) => dispatch(glActionCreator.setKeyBinding(selectedKeyBinding))}
          />
        </div>
      </div>
      <ArrowControllers
        pane="editor" status={previewPaneView}
        onClick={(event) => dispatch(enActionCreator.setPreviewPaneView(id, !previewPaneView))}/>
    </div>
  );
}

 function MultipleToggleButtons(props) {
  const locClasses = useStyle();
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

function FontIcon({classes={}, onClick=() => {}, ...props}) {
  return (
    <div className={classes}>
      <svg xmlns="http://www.w3.org/2000/svg" style={{display: "block", margin: "0.25rem auto"}} width="1rem" height="1rem" viewBox="0 0 448 512">
        <path
          d="M432 416h-23.41L277.88 53.69A32 32 0 0 0 247.58 32h-47.16a32 32 0 0 0-30.3 21.69L39.41 416H16a16
          16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-19.58l23.3-64h152.56l23.3
          64H304a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM176.85 272L224
          142.51 271.15 272z"
        />
      </svg>
    </div>
  );
}


const cssStyle = {
  gBtn: {
    display: "flex",
    flexFlow: "row nowrap",
    maxWidth: "4.5rem",
    minWidth: "4.5rem",
    maxHeight: "1.5rem",
    borderRadius: "1px",
  },
  box: {
    minWidth: "4.5rem",
    maxWidth: "4.5rem",
    maxHeight: "1.5rem",
    fontSize: "0.875rem",
    textAlign: "center",
    lineHeight: "1.5rem",
    borderRadius: "1px 0 0 1px",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  list: {
    display: "flex",
    flexFlow: "column nowrap",
    minWidth: "4.5rem",
    maxWidth: "4.5rem",
    padding: 0,
    margin: 0,
    borderRadius: "1px",
  },
  item: {
    flex: "1 1 auto",
    minWidth: "100%",
    minHeight: "1.5rem",
    maxHeight: "1.5rem",
    padding: 0,
    margin: "0.125rem 0",
    justifyContent: "space-evenly",
    fontSize: "0.875rem",
    lineHeight: "1.5rem",
    "&:hover": {
      backgroundColor: "darkGrey"
    }
  },
  paper: {
    marginTop: "0.25rem",
    borderRadius: "1px",
  },
}