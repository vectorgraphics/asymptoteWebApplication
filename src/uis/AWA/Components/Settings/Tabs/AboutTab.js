import { makeStyles } from "@material-ui/core/styles";
import awaIcon from "../../../../../assets/images/awaIcon.png"

const useStyle = makeStyles((theme) => ({
  tabCont: {
    minWidth: "100%",
    minHeight: "100%"
  },
  header: {
    minHeight: "5rem",
    margin: "0 auto",
  },
  appIcon: {
    minWidth: "10rem",
    maxWidth: "10rem",
    minHeight: "5rem",
    margin: "0 auto",
    backgroundImage: `url(${awaIcon})`,
    backgroundSize: "contain",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    // border: "1px solid white"
  },
  description: {
    margin: "1rem 2rem",
    marginBottom: "0",
    fontWeight: "bold",
    color: theme.palette.text.awaPrimaryContrast,
    textAlign: "center",
  },
  version: {
    margin: "1rem 2rem",
    marginBottom: "0",
    fontWeight: "bold",
    color: theme.palette.text.active,
  },
  design: {
    margin: "1rem 2rem",
    marginBottom: "0",
    color: theme.palette.text.awaPrimaryContrast,
  },
  develop:{
    margin: "1rem 2rem",
    marginBottom: "0",
    color: theme.palette.text.awaPrimaryContrast,
  },
  textTitle: {
    fontWeight: "bold",
    color: theme.palette.text.active,
  }
}))


export const AboutTab = (props) => {
  const locClasses = useStyle();

  return (
    <div className={locClasses.tabCont}>
      <div className={locClasses.header}>
        <div className={locClasses.appIcon}/>
      </div>
      <div>
        <p className={locClasses.description}> Asymptote Web Application Powered by the Asymptote Graphics Language. </p>
        <p className={locClasses.version}> Version 2.0.0 </p>
        <p className={locClasses.design}>
          <span className={locClasses.textTitle}>Design Team:</span> Pedram Emami & John C. Bowman
        </p>
        <p className={locClasses.develop}>
          <span className={locClasses.textTitle}>Developer:</span> Pedram Emami
        </p>
      </div>
    </div>
  );
};