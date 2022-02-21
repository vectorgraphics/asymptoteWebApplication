import { makeStyles } from "@material-ui/core";
import { Upload } from "./Buttons/Upload";
import { Run } from "./Buttons/Run";
import { Clear } from "./Buttons/Clear";

const useStyle = makeStyles((theme) => ({
  btnCont: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    marginLeft: "0.5rem",
    minHeight: "2.5rem",
    maxHeight: "2.5rem",
  },
}));

export function MainButtons(props) {
  const locClasses = useStyle();

  return (
    <div className={locClasses.btnCont}>
      <Upload/>
      <Run/>
      <Clear/>
    </div>
  );
}