import { Fragment } from "react"
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  container: {
    overflow: "auto",
    // backgroundColor: "blue",
  },
  header: {
    display: "block",
    boxSizing: "content-box",
    lineHeight: "2rem",
    textAlign: "center",
    margin: "0 auto",
    width: "100%",
    maxHeight: "2rem",
    color: "white",
    fontWeight: "800",
    backgroundColor: "#5d6980",
    boxShadow: theme.shadows[3],
  },
  body: {
    display: "flex",
    flexFlow: "column nowrap",
    minHeight: "532px",
    maxHeight: "calc(100vh - 19.5rem)",
    justifyContent: "flex-start",
    alignContent: "center",
    overflow: "auto",
  }
}))

export function Workspace(props) {
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <div className={classes.header}> Workspace </div>
      <div className={classes.body}>
        <p> test </p>
        <p> test </p>
        <p> test </p>
        <p> test </p>
        <p> test </p>
      </div>
    </div>
);
}
