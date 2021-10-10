import { makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  button: {
    position: "relative",
    minWidth: (passedProps) => passedProps.minWidth || "5.5rem",
    maxWidth: (passedProps) => passedProps.maxWidth || "5.5rem",
    minHeight: (passedProps) => passedProps.minHeight || "1.5rem",
    maxHeight: (passedProps) => passedProps.minHeight || "1.5rem",
    fontSize: "0.875rem",
    borderRadius: "1px",
    "&:active": {
      backgroundColor: "darkGrey"
    },
  },
}));

export function Btn({children, className, classes, minWidth="5.5rem", maxWidth="5.5rem", minHeight="1.5rem", maxHeight="1.5rem", ...props}) {
  const locClasses = useStyle({minWidth:minWidth, maxWidth:maxWidth, minHeight:minHeight, maxHeight: maxHeight, ...props});
  return (
    <Button
      {...props}
      className={className}
      classes={(classes)? classes: {root:  locClasses.button}}
      variant="contained"
    >
      { children }
    </Button>
  );
}
