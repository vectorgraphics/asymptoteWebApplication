import { Fragment } from "react";
import { useSelector } from "react-redux";
import { asyVersionSelector } from "../../../../store/selectors";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  iframe: {
    display: "block",
    marginTop: "2rem",
    width: "100%",
  },
  versionBox: {
    display: "block",
    marginBottom: "1rem",
    fontSize: "1rem",
    fontWeight: "medium",
    textAlign: "center",
    color: "rgb(200, 200, 200)",
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
    <Fragment>
      <iframe className={locClasses.iframe} id="logo" title="logoFrame" src="./logo3d.html" frameBorder="0"/>
      <div className={locClasses.versionBox}> {asyVersion} </div>
    </Fragment>
  );
}
