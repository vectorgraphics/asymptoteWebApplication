import { makeStyles, IconButton } from "@material-ui/core";
import { Minimize, Cancel as Close, CheckBoxOutlineBlank as Maximize } from "@material-ui/icons";
import { merge } from "lodash";

const basicStyle = (theme) => ({
  panelBarCont: {
    display: "grid",
    gridTemplateColumns: "1fr max-content",
    justifyContent: "stretch",
    alignItems: "center",
    minWidth: "100%",
    minHeight: "2rem",
    maxHeight: "2rem",
    backgroundColor: theme.palette.background.headerType2,
  },
  title: {
    display: "grid",
    justifyContent: "center",
    marginLeft: "3.05rem",
    minWidth: "100%",
    color: theme.palette.text.awaPrimaryContrast,
  },
  controls: {
    display: "grid",
    gridAutoFlow: "column",
    justifyContent: "end",
  },
  btnCont: {
    width: "max-content",
  },
  iconBtnStyle: {
    maxWidth: "1.75rem",
    maxHeight: "1.75rem",
  },
  minIcon: {
    fontSize: "1.15rem",
    color: theme.palette.text.awaPrimaryContrast,
    "&:hover": {
      color: "orange",
    }
  },
  maxIcon: {
    fontSize: "1.15rem",
    color: theme.palette.text.awaPrimaryContrast,
    "&:hover": {
      color: "orange",
    }
  },
  closeIcon: {
    fontSize: "1.15rem",
    color: theme.palette.text.awaPrimaryContrast,
    "&:hover": {
      color: "red",
    }
  },
});

const useStyle = makeStyles((theme) => ({
  panelBarCont: (finalStyle) => merge(basicStyle(theme), finalStyle).panelBarCont,
  title:        (finalStyle) => merge(basicStyle(theme), finalStyle).title,
  controls:     (finalStyle) => merge(basicStyle(theme), finalStyle).controls,
  btnCont:      (finalStyle) => merge(basicStyle(theme), finalStyle).btnCont,
  iconBtnStyle: (finalStyle) => merge(basicStyle(theme), finalStyle).iconBtnStyle,
  minIcon:      (finalStyle) => merge(basicStyle(theme), finalStyle).minIcon,
  maxIcon:      (finalStyle) => merge(basicStyle(theme), finalStyle).maxIcon,
  closeIcon:    (finalStyle) => merge(basicStyle(theme), finalStyle).closeIcon,
}));

export const PanelCtrlBar = ({finalStyle={}, onMin=()=>{}, onMax=()=>{}, onClose=()=>{}, ...props}) => {
  const locClasses = useStyle(finalStyle);

  return (
    <div className={locClasses.panelBarCont}>
      <div className={locClasses.title}> Terminal </div>
      <div className={locClasses.controls}>
        <div className={locClasses.btnCont}>
          <IconButton className={locClasses.iconBtnStyle} onClick={onMin}>
            <Minimize className={locClasses.minIcon}/>
          </IconButton>
          <IconButton className={locClasses.iconBtnStyle} onClick={onMax}>
            <Maximize className={locClasses.maxIcon}/>
          </IconButton>
          <IconButton className={locClasses.iconBtnStyle} onClick={onClose}>
            <Close className={locClasses.closeIcon}/>
          </IconButton>
        </div>
      </div>
    </div>
  );
};