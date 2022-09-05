import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { PanelCtrlBar } from "../../../Atoms/PanelCtrlBar.js";
import { TableContainer,  Table, TableBody, TableHead, TableRow, TableCell } from "../Atoms/DefTable";
import CancelIcon from '@material-ui/icons/Cancel';
import MinimizeIcon from '@material-ui/icons/Minimize';
import { CheckBoxOutlineBlank as MaximizeIcon } from '@material-ui/icons';
import { scrollbarStyler } from "../../../../../utils/appTools";

const useStyle = makeStyles((theme) => ({
  panelCont: {
    display: "flex",
    flexFlow: "column nowrap",
    minHeight: "100%",
  },
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  List Fieldset
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  listFieldSet: {
    flex: "1 1 auto",
    display: "grid",
    padding: "0.75rem 1rem 1rem 1rem",
    borderRadius: "4px",
    border: "2px groove black",
  },
  legend: {
    fontSize: "0.85rem",
    padding: "0 0.5rem",
    margin: "0 1rem",
  },
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Table List
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  tableCont: {
    display: "grid",
    overflow: "auto",
    ...scrollbarStyler(),
    border: "1px solid black",
  },
  onSelectRow: {
    backgroundColor: "darkgray",
    "&:hover": {
      backgroundColor: "darkgray !important"
    }
  },
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     Console
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  consoleCont: {
    flex: "0 1 auto",
    display: "grid",
    maxHeight: "10rem",
    padding: "0.25rem",
    marginTop: "1rem",
    color: "whitesmoke",
    backgroundColor: "rgb(85, 85, 85)",
    border: "1px groove black",
    borderRadius: "4px",
  },
  errHeading: {
    maxHeight: "2rem",
    fontSize: "1rem",
    color: "red",
    marginLeft: "0.5rem",
    // marginBottom: "0.5rem",
  },
  consoleCtrl: {
    display: "grid",
    paddingBottom: "0.5rem",
    alignItems: "center",
    justifyContent: "end",
  },
  minimize: {
    margin: "0 0.5rem",
    gridColumn: "1/2",
  },
  maximize: {
    gridColumn: "2/3",
    color: "orange",
  },
  close: {
    margin: "0 0.5rem",
    gridColumn: "3/4",
    color: "red",
  },
  body: {
    display: "block",
    maxHeight: "8em",
    padding: "0 0.5rem",
    overflow: "auto",
    ...scrollbarStyler(),
  },
  bodyHide: {
    height: "2rem !important",
  },
  ul: {
    listStylePosition: "inside",
  },
}));

export function DefTableConsole(
  {
    totalHeight=0, tableFieldName="Unknown list", tableHeaderDisp=[], tableHeaderSelector=[],
    tableRowsDataObj={}, consoleContent=[], selectionList=[], setSelectionList=() => {}, deselectReq=0, ...props
  }) {

  const locClasses = useStyle();
  const [consoleHeight, setConsoleHeight] = useState(0);
  const [tableHeight, setTableHeight] = useState(160);
  const [showConsole, setShowConsole] = useState(true);

  const tableContRef = useRef(null);
  const rowsRef = useRef({});
  const consoleRef = useRef(null);
  const rows = makeModifiedRows(tableRowsDataObj);

  useLayoutEffect(() => setConsoleHeight(getHeightValue(consoleRef.current)));
  useEffect(() => setTableHeight(totalHeight * 16 - consoleHeight - 4 * 16));
  useEffect(() => {
    for (const ref in rowsRef.current) {
      if (rowsRef.current[ref] && rowsRef.current[ref].classList.contains(locClasses.onSelectRow)) {
        rowsRef.current[ref].classList.remove(locClasses.onSelectRow);
      }
    }
    setSelectionList([]);
  }, [deselectReq]);

  useEffect(() => {
    (consoleContent.length > 0)? setShowConsole(true): setShowConsole(false);
  }, [consoleContent]);


  return (
    <div className={locClasses.panelCont}>
      <fieldset className={locClasses.listFieldSet}>
        <legend className={locClasses.legend}> {tableFieldName} </legend>
        <TableContainer Ref={tableContRef} maxHeight={`${tableHeight}px`} className={locClasses.tableCont}>
          <Table>
            <TableHead> {tableHeaderDisp.map((element, index) => <TableCell key={index}> { element } </TableCell>)} </TableHead>
            <TableBody maxHeight={`${tableHeight - 50}px`}>
              {
                rows.map((element) => (
                  <TableRow
                    key={element.id} hover="lightgray"
                    Ref={(component) => rowsRef.current[element.id] = component}
                    onClick={(event) => {
                      if (rowsRef.current[element.id].classList.contains(locClasses.onSelectRow)) {
                        rowsRef.current[element.id].classList.remove(locClasses.onSelectRow);
                        const updatedRows = selectionList.filter((item) => item !== element.id);
                        setSelectionList(updatedRows);
                      } else {
                        rowsRef.current[element.id].classList.add(locClasses.onSelectRow);
                        setSelectionList([...selectionList, element.id]);
                      }
                    }}>
                      {
                        tableHeaderSelector.map((item, index) =>
                          <TableCell key={index}>
                            {
                              (index === 0)? element.id: element.row[item]
                            }
                          </TableCell>
                        )
                      }
                  </TableRow>)
                )
              }
            </TableBody>
          </Table>
        </TableContainer>
      </fieldset>
      {
        (showConsole)?
          <div ref={consoleRef} className={locClasses.consoleCont}>
              <PanelCtrlBar
                borderBottom = "1px solid black"
                titleBarComponent={<div className={locClasses.errHeading}> Error(s) </div>}
                onMin={(event) => {
                  consoleRef.current.classList.add(locClasses.bodyHide);
                  setConsoleHeight(getHeightValue(consoleRef.current));
                  consoleRef.current.children[0].style.borderBottom = "none";
                }}
                onMax={(event) => {
                  consoleRef.current.classList.remove(locClasses.bodyHide);
                  setConsoleHeight(getHeightValue(consoleRef.current));
                  consoleRef.current.children[0].style.borderBottom = "1px solid black";
                }}
                onClose={(event) => {
                  setShowConsole(false);
                  setConsoleHeight(getHeightValue(consoleRef.current));
                }}
              />
            <div className={locClasses.body}>
              <ul className={locClasses.ul}> {consoleContent.map((text, index) => <li key={index}> {text} </li>)} </ul>
            </div>
          </div>: null
      }
    </div>
  );
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     Internal Functions
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function getHeightValue(component) {
  if (component) {
    var computedValue = window.getComputedStyle(component);
    return Number.parseFloat(computedValue["height"]);
  } else {
    return -16;
  }
}

function makeModifiedRows(rowsObj) {
  const modifiedRow = []
  for (const id in rowsObj) {
    modifiedRow.push({id: id, row: rowsObj[id]});
  }
  return modifiedRow;
}

