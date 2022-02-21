import { makeStyles } from "@material-ui/core/styles";
import { scrollbarStyler } from "../../../../../utils/appTools";

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     TableContainer
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const tableContStyle = makeStyles((theme) => ({
  tableCont: {
  },
}));

export function TableContainer({className=null, Ref="", ...props}) {
  const locClasses = tableContStyle(props)
  return (
    <div ref={Ref} className={(className)? className: locClasses.tableCont}> {props.children} </div>
  );
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%              Table
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const tableStyle = makeStyles((theme) => ({
  tableDefaultStyle: {
    display: "flex",
    flexFlow: "column nowrap",
    minWidth: "fit-content",
    overflowY: "hidden",
    // border: "1px solid red",
  },
}));

export function Table({className=null, ...props}) {
  const locClasses = tableStyle(props)
  return (
    <div className={(className)? className: locClasses.tableDefaultStyle}> {props.children} </div>
  );
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%          TableBody
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const tableBodyStyle = makeStyles((theme) => ({
  tableBody: {
    flex: "1 0 auto",
    // minWidth: "fit-content",
    maxHeight: (tbProps) => tbProps.maxHeight || "10rem",
    overflowY: "auto",
    ...scrollbarStyler(),
    backgroundColor: (tbProps) => tbProps.bgColor || "white",
  },
}));

export function TableBody(props) {
  const locClasses = tableBodyStyle(props)
  return (
    <div className={locClasses.tableBody}> {props.children} </div>
  );
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%          TableHead
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const tableHeadStyle = makeStyles((theme) => ({
  tableHead : {
    flex: "1 0 auto",
    display: "flex",
    flexFlow: "row nowrap",
    // minWidth: "fit-content",
    minHeight: "2.5rem",
    maxHeight: "2.5rem",
    fontSize: (thProps) => thProps.fontSize || "1.25rem",
    fontWeight: (thProps) => thProps.fontWeight || "500",
    color: (thProps) => thProps.color || "whitesmoke",
    backgroundColor: (thProps) => thProps.bgColor || "rgb(85, 85, 85)",
    borderBottom: "1px solid black",
  },
}));

export function TableHead(props) {
  const locClasses = tableHeadStyle(props)
  return (
    <div className={locClasses.tableHead}> {props.children} </div>
  );
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%           TableRow
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const tableRowStyle = makeStyles((theme) => ({
  tableRow : {
    display: "flex",
    flexFlow: "row nowrap",
    // minWidth: "fit-content",
    borderBottom: "1px solid lightgrey",
    "&:hover": {
      backgroundColor: (props) => (props.hover)? props.hover: "transparent",
    }
  },
}));

export function TableRow({Ref="", onClick=() => {}, ...props}) {
  const locClasses = tableRowStyle(props);
  return (
    <div ref={Ref} className={locClasses.tableRow} onClick={onClick}> {props.children} </div>
  );
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%          TableCell
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const tableCellStyle = makeStyles((theme) => ({
  tableCell : {
    flex: "1 0 auto",
    display: "grid",
    alignItems: "center",
    justifyItems: (tcProps) => {
      switch (tcProps.align) {
        case "left":
          return "start";
        case "center":
          return "center"
        case "right":
          return "end"
        default:
          return "center"
      }
    },
    padding: (tcProps) => tcProps.padding || "0.25rem",
    minWidth: (tcProps) => tcProps.minWidth || "12rem",
    maxWidth: (tcProps) => tcProps.maxWidth || "12rem",
    fontSize: (tcProps) => tcProps.fontSize || "1rem",
    // borderRight: "1px solid black",
  },
}));

export function TableCell(props) {
  const locClasses = tableCellStyle(props)
  return (
    <div className={locClasses.tableCell}> {props.children} </div>
  );
}



