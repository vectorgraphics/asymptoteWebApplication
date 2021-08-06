import {makeStyles} from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import HomeIcon from "@material-ui/icons/Home";

const useStyle = makeStyles((theme) => ({
  controlCont: {
    display: "block",
    height: "6rem",
    gridRow: "3/4",
  },
  control: {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    minHeight: "3rem",
    color: "white",
    "&:hover": {
      color: theme.palette.icon.SideBarControlsHover,
    }
  },
  icon: {
    display: "block",
    margin: "0 auto",
  },
  anchor: {
    color: "white",
    "&:hover": {
      color: "inherit",
    }
  }
}))

export function Controls(props) {
  const classes = useStyle();
  return (
    <div className={classes.controlCont}>
      <div className={classes.control}> <SettingsIcon className={classes.icon}/> </div>
      <div className={classes.control}>
        <a className={classes.anchor} href={"https://asymptote.sourceforge.io/"} target={"_blank"} rel="noreferrer">
          <HomeIcon className={classes.icon}/>
        </a>
      </div>
    </div>
  );
}
