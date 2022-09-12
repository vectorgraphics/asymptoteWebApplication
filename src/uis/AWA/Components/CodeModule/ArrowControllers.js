import { makeStyles } from "@material-ui/core/styles";
import ChevronRightOutlinedIcon from "@material-ui/icons/ChevronRightOutlined";
import ChevronLeftOutlinedIcon from "@material-ui/icons/ChevronLeftOutlined";

const useStyle = makeStyles((theme) => ({
  arrowBox: {
    display: "block",
  },
  arrows:{
    color: theme.palette.icon.headerArrow,
    fontSize: "2rem",
    verticalAlign: "middle",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.icon.headerArrowHover,
    }
  },
}));

export const ArrowControllers = ({pane="editor", status=true, onClick=() => {}, ...props}) => {
  const locClasses = useStyle();

  switch (pane) {
    case "editor":
      return(
        <div className={locClasses.arrowBox} onClick={onClick}>
          {
            (status)?
              <ChevronRightOutlinedIcon className={locClasses.arrows}/>:
              <ChevronLeftOutlinedIcon className={locClasses.arrows}/>
          }
        </div>
      );
    case "preview":
      return (
        <div className={locClasses.arrowBox} onClick={onClick}>
          {
            (status)?
              <ChevronLeftOutlinedIcon className={locClasses.arrows}/>:
              <ChevronRightOutlinedIcon className={locClasses.arrows}/>
          }
        </div>
      );
    default:
      break;
  }
};
