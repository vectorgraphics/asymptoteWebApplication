import { makeStyles } from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { Btn } from "../../../Atoms/Btn";
import { ClearBtn } from "../../../Atoms/ClearBtn";

const useStyle = makeStyles((theme) => ({
  buttonContainer: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    marginLeft: "0.5rem",
    minHeight: "2.5rem",
    maxHeight: "2.5rem",
  },
  btn: {
    margin: "0 0.5rem"
  },
  uploadBtnIcon: {
    color: theme.palette.icon.Upload,
  },
  runBtnIcon: {
    color: theme.palette.icon.Run,
  }
}));

export function MainButtons(props) {
  const classes = useStyle();
  return (
    <div className={classes.buttonContainer}>
      <Btn className={classes.btn} startIcon={<PublishIcon className={classes.uploadBtnIcon}/>}> Upload </Btn>
      <Btn className={classes.btn} startIcon={<PlayArrowIcon className={classes.runBtnIcon}/>}> Run </Btn>
      <ClearBtn className={classes.btn}/>
    </div>

  );
}
