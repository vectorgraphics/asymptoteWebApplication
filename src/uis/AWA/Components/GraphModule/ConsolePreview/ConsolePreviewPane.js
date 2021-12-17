import { useSelector } from "react-redux";
import { idSelector } from "../../../../../store/selectors";
import { makeStyles } from "@material-ui/core/styles";
import { Btn } from "../../../Atoms/Btn";
import { Errors } from "./Errors";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    margin: "0.5rem",
    minHeight: "calc(100% - 1rem)",
  },
  consPrevPane: {
    display: "flex",
    flexFlow: "column nowrap",
    flex: "1 1 auto",
    border: "2px solid darkgrey",
  },
  mapBtn: {
    flex: "1 1 0",
    marginTop: "0.5rem",
    maxHeight: "2rem",
  },
  iframe: {
    flex: "1 0 auto",
    backgroundColor: "transparent",
    "&::selection": {
      backgroundColor: "transparent",
    },
  },
}));


export function ConsolePreviewPane({drawResult = {} , ...props}) {
  const locClasses = useStyle();
  const id = useSelector(idSelector);

  return (
    <div className={locClasses.container}>
      <div className={locClasses.consPrevPane}>
        {
          (drawResult.responseType && drawResult.responseType === "ERROR")
            ? <Errors errorText={drawResult.errorText} stdErr={drawResult.stderr + drawResult.stdout}/>
            : <iframe className={locClasses.iframe} id="output" src={drawResult.path} width="100%" height="100%" title="outputFrame" frameBorder="0"/>
        }
      </div>
        {
          (drawResult.responseType && drawResult.responseType !== "ERROR")
            ? <div className={locClasses.mapBtn}>
                <Btn minWidth="12rem" minHeight="2rem"> Map to Code </Btn>
              </div>
            : null
        }
    </div>
  );
}
