import { makeStyles } from "@material-ui/core/styles";
import { MainButtons } from "./MainButtons";
import { Outformats } from "./Outformats";

const useStyle = makeStyles((theme) => ({
  controls: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

export function Controls(props) {
  const classes = useStyle();
  return (
    <div className={classes.controls}>
      <MainButtons/>
      <Outformats/>
    </div>
  );
}

