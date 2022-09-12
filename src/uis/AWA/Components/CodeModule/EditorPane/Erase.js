import { useDispatch, useSelector } from "react-redux";
import { idSelector, editorReRenderSelector } from "../../../../../store/selectors.js";
import { enActionCreator } from "../../../../../store/workspaces.js";
import { cmActionCreator } from "../../../../../store/codeModule.js";
import { makeStyles, Button} from "@material-ui/core";
import { EraserSVG } from "../../../../../assets/svgs/appwideSvgs.js";
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';


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
  eraser: {
    minWidth: "1.25rem",
    maxWidth: "1.25rem",
    minHeight: "1.25rem",
    maxHeight: "1.25rem",
    color: theme.palette.icon.erase,
  }
}))

export function Erase({children, className="", classes={}, ...props}) {
  const locClasses = useStyle();
  const id = useSelector(idSelector);
  const editorReRender = useSelector(editorReRenderSelector);
  const dispatch = useDispatch();

  // dispatch(cmActionCreator.updateOutput(id, output));

  return (
    <Button
      classes={{root: locClasses.root}} variant={"contained"} disableElevation={true}
      onClick={() => {
        dispatch(cmActionCreator.setCode(id, ""));
        dispatch(enActionCreator.reRenderEditor(id, editorReRender + 1));
      }}
    >
      <EraserSVG className={locClasses.eraser}/>
    </Button>
  );
}