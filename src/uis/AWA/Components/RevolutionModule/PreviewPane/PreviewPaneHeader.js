import { useDispatch, useSelector } from "react-redux";
import { idSelector } from "../../../../../store/selectors";
import { makeStyles } from "@material-ui/core/styles";
import { enActionCreator } from "../../../../../store/workspaces";
import { EraserSVG } from "../../../../../assets/svgs/appwideSvgs.js";
import { GetApp as DownloadIcon } from "@material-ui/icons";


const useStyle = makeStyles((theme) => ({
  headerCont: {
    gridRow: "1/2",
    display: "grid",
    gridTemplateColumns: "1fr 2.5rem 2.5rem",
    minHeight: "2rem",
    maxHeight: "2rem",
    minWidth: "50%",
    backgroundColor: theme.palette.background.headerType1,
    "&::selection": {
      backgroundColor: "transparent",
    },
    borderBottom: "2px groove black",
  },
  headerBody: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
  },
  downloadBtn: {
    gridColumn: "2/3",
    placeSelf: "center",
    minHeight: "1.5rem",
    maxHeight: "1.5rem",
    textAlign: "center",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.icon.downloadHover,
    }
    // border: "1px solid blue",
  },
  eraserBtn: {
    gridColumn: "3/4",
    placeSelf: "center",
    minWidth: "1.25rem",
    maxWidth: "1.25rem",
    minHeight: "1.25rem",
    maxHeight: "1.25rem",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.icon.erase,
    },
    // border: "1px solid red",
  },
  eraserIcon: {
    fontSize: "1rem",
  }
}));

export function PreviewPaneHeader(props) {
  const locClasses = useStyle();
  const id = useSelector(idSelector);
  const dispatch = useDispatch();

  return (
    <div className={locClasses.headerCont}>
      <div className={locClasses.headerBody}></div>
        <DownloadIcon className={locClasses.downloadBtn}/>
        <EraserSVG className={locClasses.eraserBtn} classes={{root: locClasses.eraserIcon}}/>
    </div>
  );
}
