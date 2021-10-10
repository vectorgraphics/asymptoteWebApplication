import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormulaPane } from "./FormulaPane/FormulaPane";
import { GraphPane } from "./GraphPane/GraphPane";
import { ConsolePreviewPane } from "./ConsolePreview/ConsolePreviewPane";

const useStyle = makeStyles((theme) => ({
  graphPlatform: {
    display: "grid",
    minHeight: "650px",
    height: "100vh",
    gridTemplateRows: "1rem minmax(370px, 1fr) 1rem minmax(370px, 1fr) 1rem",
    gridTemplateColumns: "1rem minmax(400px, 1fr) 1rem minmax(400px, 1fr) 1rem",
  },
  formulaWin: {
    gridRow: "2/3",
    gridColumn: "2/3",
    backgroundColor: "#d1d5da",
    overflow: "auto",
    borderRadius: "2px",
  },
  consPrevWin: {
    gridRow: "4/5",
    gridColumn: "2/3",
    backgroundColor: "#d1d5da",
    borderRadius: "2px",
  },
  graphWin: {
    gridRow: "2/5",
    gridColumn: "4/5",
    backgroundColor: "#d1d5da",
    borderRadius: "2px",
  }
}))

export function GraphModule(props) {
  const locClasses = useStyle();
  const [drawResult, setDrawResult] = useState({});

  return (
    <div className={locClasses.graphPlatform}>
      <div className={locClasses.formulaWin}> <FormulaPane setDrawResult={setDrawResult}/> </div>
      <div className={locClasses.graphWin}> <GraphPane/> </div>
      <div className={locClasses.consPrevWin}> <ConsolePreviewPane drawResult={drawResult}/> </div>
    </div>
  )
}
