import { makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  button: {
    minWidth: (props) => props.minWidth || "5.5rem",
    maxWidth: (props) => props.maxWidth || "5.5rem",
    minHeight: (props) => props.minHeight || "1.5rem",
    maxHeight: (props) => props.maxHeight || "1.5rem",
    fontSize: "0.875rem",
    borderRadius: "1px",
    "&:active": {
      backgroundColor: "darkGrey"
    },
  },
}));

export function Btn({children, className="", classes, onClick=() => {}, disabled=false, ...props}) {

  const locClasses = useStyle(props);

  return (
    <Button
      variant="contained" className={className} disabled={disabled}
      classes={(classes)? classes: {root: locClasses.button}}
      onClick={onClick}
    >
      { children }
    </Button>
  );
}
