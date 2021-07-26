import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  controlpanel: {
    display: "grid",
    height: "100vh",
    gridTemplateRows: "2.5rem 1.5rem minmax(400px, 3fr) minmax(200px, 1.25fr)",
    backgroundColor: theme.palette.common.ControlPanel_Bg,
  },
  controlpane: {
    gridRow: "1 2",
  },
  workspacepane: {
    gridRow: "2 3",
  },
  logopane: {
    gridRow: "3 4",
  },
}))

export function ControlPanel(props) {
  const classes = useStyle(props)
  return (
    <div className={classes.controlpanel}>
      <div className={classes.controlpane}> </div>
      <div className={classes.workspacepane}> </div>
      <div className={classes.logopane}> </div>
    </div>
  );
}
