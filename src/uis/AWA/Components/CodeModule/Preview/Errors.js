import { makeStyles } from "@material-ui/core/styles";
const useStyle = makeStyles((theme) => ({
  "errorCont": {
    flex: "10 1 auto",
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
    flex: "10 1 auto",
    fontSize: "1rem",
    padding: "1rem",
    color: "whitesmoke",
  },
}))

export function Errors({errorText="Unknown Error!", ...props}) {
  const locClasses = useStyle();
  return (
    <div className={locClasses["errorCont"]}>
      <h4 className={locClasses.h4}> {"Error:"} </h4>
      <p className={locClasses.p}> {errorText} </p>
    </div>
  );
}
