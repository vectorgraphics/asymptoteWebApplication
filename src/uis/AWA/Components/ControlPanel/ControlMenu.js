import { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Btn } from "../../Atoms/Btn";
import { SplitBtn } from "../../Atoms/SplitBtn";
import { Link } from "@material-ui/icons";


const useStyle = makeStyles((theme) => ({
  splitBtn: {
    flex: "1 1 auto",
    padding: 0,
    margin: 0,
  },
  btn: {
    flex: "1 1 auto",
    padding: 0,
    margin: 0,
    minWidth: "5rem",
    maxWidth: "5rem",
    maxHeight: "2rem",
  },
  link: {
    color: theme.palette.icon.Wiki,
  }
}))

export function ControlMenu(props) {
  const classes = useStyle();
  return (
    <Fragment>
      <SplitBtn className={classes.splitBtn} items={['Code Module', 'Graph Module']}/>
      <Btn className={classes.btn} variant="contained" startIcon={<Link className={classes.link}/>}> Wiki </Btn>
    </Fragment>
  );
}
