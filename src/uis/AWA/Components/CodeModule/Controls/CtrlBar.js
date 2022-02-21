import { makeStyles } from "@material-ui/core/styles";
import { MainButtons } from "./MainButtons";
import { OutFormats } from "./OutFormats";

const useStyle = makeStyles((theme) => ({
  ctrlBar: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    minWidth: "70rem",
    background: theme.palette.background.CtrlBar,
  },
}));

export function CtrlBar(props) {
  const locClasses = useStyle();
  return (
    <div className={locClasses.ctrlBar}>
      <MainButtons/>
      <OutFormats/>
    </div>
  );
}

