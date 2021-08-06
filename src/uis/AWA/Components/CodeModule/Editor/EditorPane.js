import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    flex: "1 1 auto",
  },
  header: {
    display: "flex",
    flexFlow: "row nowrap",
    flex: "1 1 auto",
    minHeight: "1.5rem",
    maxHeight: "1.5rem",
    backgroundColor: "red",
  },
  editor: {
    display: "block",
    flex: "10 1 auto",
    backgroundColor: "green",
  }
}))

export function EditorPane(props) {
  const clasess = useStyle();
  return (
    <div className={clasess.container}>
      <div className={clasess.header}>

      </div>
      <div className={clasess.editor}>

      </div>
    </div>
  );
}

