import { useSelector } from "react-redux";
import { cmCodeSelector, idSelector, UCIDSelector, wsNameSelector } from "../../../../../store/selectors.js";
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

export function Download({children, className="", classes={}, ...props}) {
  const locClasses = useStyle();
  const UCID = useSelector(UCIDSelector);
  const id = useSelector(idSelector);
  const wsName = useSelector(wsNameSelector);
  const code = useSelector(cmCodeSelector);

  return (
    <Button
      classes={{root: locClasses.root}} variant={"contained"} disableElevation={true}
      onClick={() => {
        const data = {
          reqType: "download",
          UCID: UCID,
          workspaceId: id,
          workspaceName: wsName,
          parentModule: "Code Module",
          code: {
            lastSuccessful: "",
            lastFailed: "",
            currentContent: codeFormatter(code.currentContent),
          },
          commands: [""],
          outFormat: "asy",
        };
        fetch('/', {...fetchOptionObj.postUrlEncode, body: toUrlEncoded(data)}).then((resObj) => resObj.json()).then((responseContent) => {
          // dispatch(cmActionCreator.updateOutput(id, {...cmOutput, ...responseContent}));
          if (responseContent.responseType === "ASY_FILE_CREATED") {
            delete (data.codeContent);
            fetch('/clients', {...fetchOptionObj.postUrlEncode, body: toUrlEncoded(data)}).then((resObj) => resObj.blob()).then((responseContent) => {
              const link = document.createElement("a");
              link.href = window.URL.createObjectURL(responseContent);
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
}
