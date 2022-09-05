import { useSelector } from "react-redux";
import { idSelector } from "../../../../../store/selectors";
import { makeStyles } from "@material-ui/core/styles";
import { scrollbarStyler } from "../../../../../utils/appTools";
import { Preview } from "../../../Molecules/Preview/Preview.js";

const useStyle = makeStyles((theme) => ({
  container: {
    flex: "1 1 auto",
    margin: "0.5rem",
    minHeight: "calc(100% - 1rem)",
  },
  consolePreviewPane: {
    display: "flex",
    flexFlow: "column nowrap",
    flex: "1 1 auto",
    ...scrollbarStyler(),
  },
}));


export function PreviewPane({drawResult = {}, ...props}) {
  const locClasses = useStyle();
  const id = useSelector(idSelector);

  return (
    <div className={locClasses.container}>
      <div className={locClasses.consolePreviewPane}>
        <Preview finalStyle={{}} outputObj={{}}/>
      </div>
    </div>
  );
}

