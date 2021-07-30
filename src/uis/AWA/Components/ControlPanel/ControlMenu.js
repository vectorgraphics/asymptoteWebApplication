import { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Btn } from "../../Atoms/Btn";
import { SplitBtn } from "../../Atoms/SplitBtn";

const useStyle = makeStyles((theme) => ({
  rootSplitBtn: {
    flex: "1 1 auto",
    padding: 0,
    margin: 0,
  },
  rootBtn: {
    flex: "1 1 auto",
    padding: 0,
    margin: 0,
    minWidth: "6rem",
    maxWidth: "6rem",
    maxHeight: "2rem",
  }
}))

export function ControlMenu(props) {
  const classes = useStyle();
  return (
    <Fragment>
      <SplitBtn className={classes.rootSplitBtn} items={['Code Module', 'Graph Module']}/>
      <Btn className={classes.rootBtn} variant="contained"> Wiki </Btn>
    </Fragment>
  );
}
