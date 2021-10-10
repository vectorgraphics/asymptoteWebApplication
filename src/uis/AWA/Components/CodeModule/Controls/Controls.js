import { makeStyles } from "@material-ui/core/styles";
import { MainButtons } from "./MainButtons";
import { Outformats } from "./Outformats";

const useStyle = makeStyles((theme) => ({
  controls: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    minWidth: "70rem",
  },
}));

export function Controls(props) {
  const locClasses = useStyle();
  return (
    <div className={locClasses.controls}>
      <MainButtons/>
      <Outformats/>
    </div>
  );
}

