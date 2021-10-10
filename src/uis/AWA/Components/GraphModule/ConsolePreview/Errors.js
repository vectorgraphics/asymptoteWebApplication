import { makeStyles } from "@material-ui/core/styles";
const useStyle = makeStyles((theme) => ({
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
    color: "whitesmoke",
  },
}))

export function Errors({errorText="Default Error Text!", ...props}) {
  const locClasses = useStyle();
  return (
    <div className={locClasses.errorCont}>
      <h4 className={locClasses.h4}> {"Error:"} </h4>
      <p className={locClasses.p}> {errorText} </p>
    </div>
  );
}
