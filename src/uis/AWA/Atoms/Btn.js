import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";


const useStyle = makeStyles((theme) => ({
  root: {
    minHeight: "1.5rem",
    maxHeight: "1.5rem",
    fontSize: "0.875rem",
    borderRadius: "1px",
  },
}))

export function Btn({children, className, ...props}) {
const toOverride = useStyle();
  return (
    <Button className={className} classes={{root: toOverride.root}} {...props}> {children} </Button>
  );
}
