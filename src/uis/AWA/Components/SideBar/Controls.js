import {makeStyles} from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import HomeIcon from "@material-ui/icons/Home";

const useStyle = makeStyles((theme) => ({
  control_container: {
    display: "flex",
    flexFlow: "column nowrap",
    alignContent: "center",
    marginBottom: "3rem",
  },
  control: {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    height: "3rem",
    fontSize: "1rem",
    color: "white",
    // border: "1px solid white",
    "&:hover": {
      color: "maroon",
    }
  },
  icon: {
    display: "block",
    margin: "0 auto",
  }
}))

export function Controls(props) {
  const classes = useStyle();
  return (
    <div className={classes.control_container}>
      <div className={classes.control}> <SettingsIcon className={classes.icon}/> </div>
      <div className={classes.control}> <HomeIcon className={classes.icon}/> </div>
    </div>
  );
}
