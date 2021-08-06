import { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  iframe: {
    display: "block",
    width: "100%",
  },
  versionBox: {
    display: "block",
    marginBottom: "2rem",
    fontSize: "1rem",
    fontWeight: "medium",
    // color: "rgb(200, 200, 200)",
    // animationName: "fadeInVersion",
    // animationIterationCount: 1,
    // webkitAnimationTimingFunction: "ease-in",
    // animationDuration: "1s",
  }
}))
export function LogoPane(props) {
  const classes = useStyle();
  return (
    <Fragment>
      {/*<iframe className={classes.iframe} id="logo" title="logoFrame" src="./logo3d.html" frameBorder="0"/>*/}
      {/*<div className={classes.versionBox}> {"placeholder"} </div>*/}
    </Fragment>
  );
}
