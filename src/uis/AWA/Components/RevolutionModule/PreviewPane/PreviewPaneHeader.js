import { useSelector } from "react-redux";
import { UCIDSelector, idSelector, wsNameSelector, rmOutputSelector} from "../../../../../store/selectors";
import { makeStyles } from "@material-ui/core/styles";
import { EraserSVG } from "../../../../../assets/svgs/appWideSvgs.js";
import { GetApp as DownloadIcon } from "@material-ui/icons";
import { fetchOptionObj, toUrlEncoded } from '../../../../../utils/appTools.js';


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

export const PreviewPaneHeader = ({onErase=()=>{}, ...props}) => {
  const locClasses = useStyle();
  const UCID = useSelector(UCIDSelector);
  const id = useSelector(idSelector);
  const wsName = useSelector(wsNameSelector);
  const rmOutput = useSelector(rmOutputSelector);

  return (
    <div className={locClasses.headerCont}>
      <div className={locClasses.headerBody}></div>
        <DownloadIcon
          className={locClasses.downloadBtn}
          onClick={() => {
                if (rmOutput.serverRes.resStatus === "SUCCESS" && rmOutput.serverRes.resType === "ASY_OUTPUT_CREATED") {
                  const data = {
                    reqType: "download",
                    UCID: UCID,
                    workspaceId: id,
                    workspaceName: wsName,
                    parentModule: "RM",
                    currentCode: "",
                    outFormat: "html",
                  };
                  fetch("/clients", {...fetchOptionObj.postUrlEncode,  body: toUrlEncoded(data)})
                    .then((resObj) => resObj.blob()).then((fileContent) => {
                    const link = document.createElement("a");
                    link.href = window.URL.createObjectURL(fileContent);
                    link.setAttribute("download", wsName.toString());
                    link.click();
                  }).catch((err) => {});
                }
              }
          }/>
        <EraserSVG className={locClasses.eraserBtn} classes={{root: locClasses.eraserIcon}} onClick={() => onErase()}/>
    </div>
  );
};

