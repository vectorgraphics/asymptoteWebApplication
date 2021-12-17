import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const useStyle = makeStyles((theme) => ({
  terminalCont: {
    display: "flex",
    flexFlow: "column nowrap",
    flex: "1 1 10rem",
    maxHeight: "15rem",
  },
  resizer: {
    minHeight: "2px",
    maxHeight: "2px",
    width: "100%",
    backgroundColor: "#ABA8B7",
  },
  header: {
    position: "relative",
    flex: "1 1 0",
    minHeight: "1.5rem",
    maxHeight: "1.5rem",
    paddingBottom: "2px",
    lineHeight: "2rem",
    backgroundColor: "#ABA8B7",
    border: "1px solid black",
  },
  iconBtnRoot: {
    "&:hover": {
      backgroundColor: "transparent",
    }
  },
  iconBtn: {
    position: "absolute",
    top: "-2px",
    color: "#4c4c4c",
    left: "calc(100% - 1.5rem)",
    "&:hover": {
      color: "red",
    }
  },
  terminal: {
    flex: "1 1 auto",
    padding: "0.5rem",
    color: "whitesmoke",
    fontSize: "0.875rem",
    fontWeight: "100",
    backgroundColor: "#282C34",
  }
}))

export function Terminal({errorContent="", closeTerminal=() => {}, ...props}) {
  const locClasses = useStyle();

  return (
    <div className={locClasses.terminalCont}>
      <div className={locClasses.header}>
        <div className={locClasses.resizer}/>
        <IconButton
          classes={{root: locClasses.iconBtnRoot}} className={locClasses.iconBtn}
          size="small" onClick={(event) => closeTerminal()}
        >
          <CancelOutlinedIcon fontSize="small"/>
        </IconButton>
      </div>
      <div className={locClasses.terminal}> {errorContent} </div>
    </div>
  );
}
