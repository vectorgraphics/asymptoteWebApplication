import { Fragment } from "react";
import { useSelector } from "react-redux";
import { asyVersionSelector } from "../../../../store/selectors";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  logoPaneCont: {
    // flex: "1 1 auto",
    gridRow: "4/5",
    minWidth: "18rem",
    minHeight: "15rem",
    maxHeight: "15rem",
    backgroundColor: theme.palette.background.LogoPane,
  },
  iframe: {
    display: "block",
    marginTop: "3rem",
    width: "100%",
  },
  versionBox: {
    display: "block",
    height: "100%",
    marginBottom: "1rem",
    fontSize: "1rem",
    fontWeight: "medium",
    textAlign: "center",
    color: theme.palette.text.AsyVersion,
    animationName: "fadeInVersion",
    animationIterationCount: 1,
    webkitAnimationTimingFunction: "ease-in",
    animationDuration: "1s",
  }
}))
export function LogoPane(props) {
  const asyVersion = useSelector(asyVersionSelector);
  const locClasses = useStyle();
  return (
    <div className={locClasses.logoPaneCont}>
      <iframe className={locClasses.iframe} id="logo" title="logoFrame" src="./logo3d.html" frameBorder="0"/>
      <div className={locClasses.versionBox}> {asyVersion} </div>
    </div>
  );
}
