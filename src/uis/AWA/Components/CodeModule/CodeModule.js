import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  codeModule: {
    display: "grid",
    height: "100vh",
    gridTemplateRows: "2.5rem 2rem minmax(400px, 3fr) minmax(200px, 1.25fr)",
    gridTemplateColumns: "minmax(400px, 1fr) minmax(400px, 1fr)",
  }
}))

export function CodeModule(props) {
  const classes = useStyle();
  return (
    <div className={classes.codeModule}>

    </div>
  )
}
