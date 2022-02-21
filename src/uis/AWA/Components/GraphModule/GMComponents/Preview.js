import { useSelector } from "react-redux";
import { idSelector } from "../../../../../store/selectors";
import { makeStyles } from "@material-ui/core/styles";
import { scrollbarStyler } from "../../../../../utils/appTools";

const useStyle = makeStyles((theme) => ({
  container: {
    flex: "1 1 auto",
    margin: "0.5rem",
    minHeight: "calc(100% - 1rem)",
  },
  consolePreviewPane: {
    display: "flex",
    flexFlow: "column nowrap",
    flex: "1 1 auto",
    ...scrollbarStyler(),
  },
  iframe: {
    flex: "1 0 auto",
    backgroundColor: "transparent",
    "&::selection": {
      backgroundColor: "transparent",
    },
  },
}));


export function Preview({drawResult = {}, ...props}) {
  const locClasses = useStyle();
  const id = useSelector(idSelector);

  return (
    <div className={locClasses.container}>
      <div className={locClasses.consolePreviewPane}>
        {
          (drawResult.responseType && drawResult.responseType === "ERROR")
            ? <Errors errorText={drawResult.errorText} stdErr={drawResult.stderr + drawResult.stdout}/>
            : <iframe className={locClasses.iframe} id="output" src={drawResult.path} width="100%" height="100%" title="outputFrame" frameBorder="0"/>
        }
      </div>
    </div>
  );
}

const internalStyle = makeStyles((theme) => ({
  errorCont: {
    flex: "1 0 auto",
    fontSize: "1rem",
    padding: "1rem",
    color: "whitesmoke",
  },
  h4:{
    padding: 0,
    marginTop: "2rem",
    marginLeft: "1rem",
    color: theme.palette.text.textActivated,
  },
  p: {
    fontSize: "1rem",
    padding: "1rem",
    color: "black",
  },
}))

function Errors({errorText="Default Error Text!", stdErr="", ...props}) {
  const locClasses = internalStyle();
  return (
    <div className={locClasses.errorCont}>
      <h4 className={locClasses.h4}> {"Error:"} </h4>
      <p className={locClasses.p}> {errorText} </p>
      <p className={locClasses.p}> {stdErr} </p>
    </div>
  );
}
