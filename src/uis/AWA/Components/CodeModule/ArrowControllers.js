import { makeStyles } from "@material-ui/core/styles";
import ChevronRightOutlinedIcon from "@material-ui/icons/ChevronRightOutlined";
import ChevronLeftOutlinedIcon from "@material-ui/icons/ChevronLeftOutlined";

const useStyle = makeStyles((theme) => ({
  arrowBox: {
    display: "block",
  },
  arrows:{
    color: "grey",
    fontSize: "2rem",
    verticalAlign: "middle",
    cursor: "pointer",
    "&:hover": {
      color: "red",
    }
  },
}));

export function ArrowControllers({pane="editor", status=true, onClick=() => {}, ...props}) {
  const locClasses = useStyle();

  return (
    (pane === "editor")?
      <div className={locClasses.arrowBox} onClick={onClick}>
        {
          (status)?
            <ChevronRightOutlinedIcon className={locClasses.arrows}/>:
            <ChevronLeftOutlinedIcon className={locClasses.arrows}/>
        }
      </div>:
      <div className={locClasses.arrowBox} onClick={onClick}>
        {
          (status)?
            <ChevronLeftOutlinedIcon className={locClasses.arrows}/>:
            <ChevronRightOutlinedIcon className={locClasses.arrows}/>
        }
      </div>
  );
}
