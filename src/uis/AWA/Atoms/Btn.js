import { makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    minHeight: "1.5rem",
    maxHeight: "1.5rem",
    minWidth: "5.5rem",
    maxWidth: "5.5rem",
    fontSize: "0.875rem",
    borderRadius: "1px",
  },
}));

export function Btn({children, className, classes, ...props}) {
const toOverride = useStyle();
  return (
    <Button
      className={className}
      classes={(classes)? classes: {root:  toOverride.root}}
      variant="contained" {...props}
    >
      {children}
    </Button>
  );
}
