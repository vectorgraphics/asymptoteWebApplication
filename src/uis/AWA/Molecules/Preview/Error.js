import { makeStyles } from "@material-ui/core/styles";
import { merge } from "lodash";

const basicStyle = (theme) => ({
  errorCont: {
    display: "grid",
    gridTemplateRows: "4rem 1fr",
    fontSize: "1rem",
    padding: "1rem",
  },
  errorHeader:{
    gridRow: "1/2",
    padding: 0,
    marginTop: "2rem",
    marginLeft: "1rem",
    color: theme.palette.text.active,
  },
  errorContent: {
    gridRow: "2/3",
    padding: "1rem",
    fontSize: "1rem",
    color: theme.palette.text.awaPrimaryContrast,
  },
});

const useStyle = makeStyles((theme) => ({
  errorCont:    (finalStyle) => merge(basicStyle(theme), finalStyle).errorCont,
  errorHeader:  (finalStyle) => merge(basicStyle(theme), finalStyle).errorHeader,
  errorContent: (finalStyle) => merge(basicStyle(theme), finalStyle).errorContent,
}))

export const Error = ({finalStyle={}, errObj={}, ...props}) => {
  const locClasses = useStyle(finalStyle);

  const errText = errObj.resText || "No response is received!";
  const stderr = errObj.stderr || "No response is received!";
  return (
    <div className={locClasses.errorCont}>
      <h4 className={locClasses.errorHeader}> {"Error: " + errText} </h4>
      <p className={locClasses.errorContent}> {stderr} </p>
    </div>
  );
};
