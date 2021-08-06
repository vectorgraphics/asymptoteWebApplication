import { makeStyles } from "@material-ui/core/styles";
const useStyle = makeStyles((theme) => ({
  graphPlatform: {
    display: "grid",
    minHeight: "650px",
    height: "100vh",
    gridTemplateRows: "1rem minmax(300px, 1fr) 1rem minmax(300px, 1fr) 1rem",
    gridTemplateColumns: "1rem minmax(400px, 1fr) 1rem minmax(400px, 1fr) 1rem",
  },
  formulaPanel: {
    gridRow: "2/3",
    gridColumn: "2/3",
    backgroundColor: "white",
  },
  figureSettings: {
    gridRow: "4/5",
    gridColumn: "2/3",
    backgroundColor: "white",
  },
  graphsSettings: {
    gridRow: "2/5",
    gridColumn: "4/5",
    backgroundColor: "white",
  }
}))

export function GraphModule(props) {
  const classes = useStyle();
  return (
    <div className={classes.graphPlatform}>
      <div className={classes.formulaPanel}></div>
      <div className={classes.figureSettings}></div>
      <div className={classes.graphsSettings}></div>
    </div>
  )
}
