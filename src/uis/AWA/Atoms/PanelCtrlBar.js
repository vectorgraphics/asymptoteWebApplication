import { makeStyles, IconButton } from "@material-ui/core";
import MinimizeIcon from "@material-ui/icons/Minimize";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
const MaximizeIcon = CheckBoxOutlineBlankIcon

const useStyle = makeStyles((theme) => ({
  menuBarCont: (props) => {
    return  {
    display: "grid",
    gridAutoFlow: "column",
    justifyContent: "stretch",
    alignItems: "center",
    minWidth: "100%",
    minHeight: "2rem",
    maxHeight: "2rem",
    marginBottom: "0.5rem",
    borderBottom: (props.borderBottom)? props.borderBottom: "none",
    backgroundColor: props.backgroundColor || "transparent",
  }},
  titleBar: (props) => props.titleBar || {
    display: "grid",
    minWidth: "100%",
    gridAutoFlow: "column",
    justifyContent: "start",
    alignItems: "center",
    // border: "1px solid blue",
  },
  ctrlBar: (props) => props.ctrlBar || {
    display: "grid",
    gridAutoFlow: "column",
    justifyContent: "end",
  },
  btnCont: {
    marginRight: "0.25rem",
    width: "max-content",
  },
  iconBtn: {
    maxWidth: "1.75rem",
    maxHeight: "1.75rem",
  },
  minIcon: {
    fontSize: "1.15rem",
    color: "whitesmoke",
  },
  maxIcon: {
    fontSize: "1.15rem",
    color: "orange",
  },
  closeIcon: {
    fontSize: "1.15rem",
    color: "red",
  },
}));

export function PanelCtrlBar({titleBarComponent=null, onMin=() => {}, onMax=() => {}, onClose=() => {}, ...props}) {
  const locClasses = useStyle(props);

  return (
    <div className={locClasses.menuBarCont}>
      <div className={locClasses.titleBar}> {titleBarComponent} </div>
      <div className={locClasses.ctrlBar}>
        <div className={locClasses.btnCont}>
          <IconButton className={locClasses.iconBtn} onClick={(event) => onMin(event)}>
            <MinimizeIcon className={locClasses.minIcon}/>
          </IconButton>
          <IconButton className={locClasses.iconBtn} onClick={(event) => onMax(event)}>
            <MaximizeIcon className={locClasses.maxIcon}/>
          </IconButton>
          <IconButton className={locClasses.iconBtn} onClick={(event) => onClose(event)}>
            <CancelIcon className={locClasses.closeIcon}/>
          </IconButton>
        </div>
      </div>
    </div>
  );
}