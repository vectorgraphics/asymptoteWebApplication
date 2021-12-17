import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "block",
    minWidth: (styleObj) => styleObj.minWidth || "2rem",
    maxWidth: (styleObj) => styleObj.maxWidth || "2rem",
    minHeight: (styleObj) => styleObj.minHeight || "2rem",
    maxHeight: (styleObj) => styleObj.maxWidth || "2rem",
    backgroundColor: (styleObj) => styleObj.backgroundColor || "white",
    border: (styleObj) => styleObj.border || "1px solid black",
  },
}))

export function ColorBox({styleObj={}, ...props}) {
  const locClasses = useStyle(styleObj);
  return <div className={locClasses.container}/>
}
