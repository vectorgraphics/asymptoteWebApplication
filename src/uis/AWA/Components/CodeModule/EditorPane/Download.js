import { useSelector } from "react-redux";
import { idSelector, UCIDSelector, wsNameSelector, cmCurrentCodeSelector } from "../../../../../store/selectors.js";
import { makeStyles, Button } from "@material-ui/core";
import { GetApp as DownloadIcon } from "@material-ui/icons";
import { codeFormatter, fetchOptionObj, toUrlEncoded } from "../../../../../utils/appTools.js";

const useStyle = makeStyles((theme) => ({
  root: {
    minWidth: "4rem",
    maxWidth: "4rem",
    minHeight: "1.5rem",
    padding: 0,
    fontFamily: "Roboto",
    fontWeight: "450",
    fontSize: "0.875rem",
    borderRadius: "1px",
    "& span": {},
  },
  downloadIcon: {
    color: theme.palette.icon.download,
  }
}))

export const Download = ({children, className="", classes={}, ...props}) => {
  const locClasses = useStyle();
  const UCID = useSelector(UCIDSelector);
  const id = useSelector(idSelector);
  const wsName = useSelector(wsNameSelector);
  const currentCode = useSelector(cmCurrentCodeSelector);

  return (
    <Button
      classes={{root: locClasses.root}} variant={"contained"} disableElevation={true}
      onClick={() => {
        const data = {
          reqType: "download",
          UCID: UCID,
          workspaceId: id,
          workspaceName: wsName,
          parentModule: "CM",
          currentCode: codeFormatter(currentCode),
          outFormat: "asy",
        };
        fetch('/', {...fetchOptionObj.postUrlEncode, body: toUrlEncoded(data)}).then((resObj) => resObj.json()).then((response) => {
          console.log(response);
          if (response.serverRes.resStatus === "SUCCESS") {
            delete (data.codeContent);
            fetch('/clients', {...fetchOptionObj.postUrlEncode, body: toUrlEncoded(data)}).then((resObj) => resObj.blob()).then((fileContent) => {
              const link = document.createElement("a");
              link.href = window.URL.createObjectURL(fileContent);
              link.setAttribute("download", wsName + ".asy");
              link.click();
            }).catch((err) => {});
          }
        }).catch((err) => {});
      }}
    >
      <DownloadIcon className={locClasses.downloadIcon}/>
    </Button>
  );
};
