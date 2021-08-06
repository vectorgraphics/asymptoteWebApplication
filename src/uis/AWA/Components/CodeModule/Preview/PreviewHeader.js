import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  header: {
    display: "flex",
    flexFlow: "row nowrap",
    flex: "1 1 auto",
    minHeight: "2rem",
    maxHeight: "2rem",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.background.Header2,
  },
}));

export function PreviewHeader(props) {
  const classes = useStyle();
  return (
    <div className={classes.header}>
      {"this is the preview header"}
    </div>
  );
}
