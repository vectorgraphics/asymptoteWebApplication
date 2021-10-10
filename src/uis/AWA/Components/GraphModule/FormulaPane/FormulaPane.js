import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fsmActionCreator, feActionCreator, flActionCreator } from "../../../../../store/funcSubModule";
import {
  idSelector, fIdSelector, geometriesSelector,
  horizontalAxesSelector, verticalAxesSelector,
  funcEntitiesSelector, funcListSelector,
} from "../../../../../store/selectors";
import { makeStyles } from "@material-ui/core";
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@material-ui/icons/RemoveCircleOutlined';
import IconButton from "@material-ui/core/IconButton";
import SelectAllIcon from "@material-ui/icons/SelectAll";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { Btn } from "../../../Atoms/Btn";
import { FunctionItem } from "./FunctionItem";
import { createUID } from "../../../../../utils/generalTools";
import { generateAsyCode } from "../../../../../utils/asyTools";

const useStyle = makeStyles((theme) => ({
  formulaCont: {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "space-between",
    minWidth: "700px",
    maxWidth: "900px",
    height: "100%",
    margin: "0 auto",
    padding: "0.5rem",
    overflow: "hidden",
  },
  rowCont: {
    flex: "1 0 0",
    display: "flex",
    flexFlow: "column nowrap",
    minHeight: "15rem",
    padding: "0.5rem",
    marginBottom: "1rem",
    border: "2px groove black",
    borderRadius: "4px",
    overflowX: "hidden",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "0.25rem",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 0.25rem rgba(0,0,0,0.25)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#606060",
      outline: "1px solid slategrey",
    },
  },
  controlPane: {
    flex: "1 0 3rem",
    display: "grid",
    gridTemplateRows: "0.5rem 2rem 0.5rem",
    gridTemplateColumns: "0.5rem 2rem 0.5rem 2rem 0.5rem 2rem 3rem 2rem 0.5rem 2rem 1fr 6rem 0.5rem",
    minHeight: "calc(3rem + 2px)",
    maxHeight: "calc(3rem + 2px)",
    borderRadius: "0.25rem",
    border: "2px groove black",
  },
  labelTextField: {
    gridRow: "2/3",
    gridColumn: "2/3",
  },
  nameTextField: {
    gridRow: "2/3",
    gridColumn: "4/5",
  },
  addBtn: {
    gridRow: "2/3",
    gridColumn: "2/3",
  },
  removeBtn: {
    gridRow: "2/3",
    gridColumn: "4/5",
  },
  eraseBtn: {
    gridRow: "2/3",
    gridColumn: "6/7",
  },
  checkAllBtn: {
    gridRow: "2/3",
    gridColumn: "8/9",
  },
  unCheckAllBtn: {
    gridRow: "2/3",
    gridColumn: "10/11",
  },
  unCheckStyle: {
    fontSize: "1.25rem"
  },
  displayBtn: {
    gridRow: "2/3",
    gridColumn: "12/13",
  },
  displayStyle: {
    border: "1px solid black",
    borderRadius: "2px",
  }
}))

export function FormulaPane({setDrawResult = () => {}, ...props}) {
  const locClasses = useStyle();
  const [errorReset, setErrorReset] = useState({fId: null});
  const [renderObj, setRenderObj] = useState({});
  const [reRenderCount, setReRenderCount] = useState(0);

  const id = useSelector(idSelector);
  const fId = useSelector(fIdSelector);
  const geometries = useSelector(geometriesSelector);
  const horizontalAxis = useSelector(horizontalAxesSelector);
  const verticalAxis = useSelector(verticalAxesSelector);
  const funcEntities = useSelector(funcEntitiesSelector);
  const funcList = useSelector(funcListSelector);
  const functionsOrder = funcEntities[id].functionsOrder;
  const dispatch = useDispatch();

  const geometry = geometries[id];
  const hAxis = horizontalAxis[id];
  const vAxis = verticalAxis[id];
  const funcEntity = funcEntities[id];
  const fList = funcList[id];
  const funcListToRender = renderObj;
  const dataObj = funcList[id];
  const allCodeDataObject = {geometry, hAxis, vAxis, funcEntity, fList, renderObj}

  return (
    <div className={locClasses.formulaCont}>
      <div className={locClasses.rowCont}>
        {
          functionsOrder.map((item, index) =>
            <FunctionItem
              item={item} key={item} isChecked={item === fId} errorsReset={errorReset}
              renderObj={renderObj} setRenderObj={setRenderObj}
              reRenderCount={reRenderCount} setReRenderCount={setReRenderCount}
              onClick={(event) => dispatch(feActionCreator.checkOutFunction(id, item))}
            />
          )
        }
      </div>
      <div className={locClasses.controlPane}>
        <IconButton
          className={locClasses.addBtn}
          onClick={(event) => dispatch(fsmActionCreator.addFunction(id, `f${createUID(3)}`))}>
          <AddCircleOutlinedIcon/>
        </IconButton>
        <IconButton
          className={locClasses.removeBtn} disabled={functionsOrder.length === 1}
          onClick={(event) => {
            const length = functionsOrder.length;
            const index = functionsOrder.indexOf(fId);
            if (index < length - 1) {
              dispatch(feActionCreator.checkOutFunction(id, functionsOrder[index + 1]));
            } else if (index === length - 1) {
              dispatch(feActionCreator.checkOutFunction(id, functionsOrder[index - 1]));
            }
            dispatch(fsmActionCreator.removeFunction(id, fId));
          }}>
          <RemoveCircleOutlinedIcon/>
        </IconButton>
        <IconButton
          className={locClasses.eraseBtn}
          onClick={(event) => {
            setErrorReset({fId: fId});
            dispatch(flActionCreator.eraseFunction(id, fId));
            setReRenderCount(reRenderCount + 1);
          }}>
          <EraseIcon/>
        </IconButton>
        <IconButton
          className={locClasses.checkAllBtn}
          onClick={(event) => {
            for (const item of functionsOrder) {
              dispatch(flActionCreator.updateFunction(id, item, "isDrawn", true));
              setReRenderCount(reRenderCount + 1);
            }
          }}>
          <SelectAllIcon/>
        </IconButton>
        <IconButton
          className={locClasses.unCheckAllBtn}
          onClick={(event) => {
            for (const item of functionsOrder) {
              dispatch(flActionCreator.updateFunction(id, item, "isDrawn", false));
              setReRenderCount(reRenderCount + 1);
            }
          }}>
          <CheckBoxOutlineBlankIcon classes={{root: locClasses.unCheckStyle}} />
        </IconButton>
        <Btn
          className={locClasses.displayBtn} classes={{root: locClasses.displayStyle}}
          disableElevation={true} minHeight="2rem" maxHeight="2rem"
          onClick={(event) => console.log(generateAsyCode(allCodeDataObject))}
        > Draw </Btn>
       </div>
    </div>
  );
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Internal Component
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function EraseIcon({className={}, ...props}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="#606164" viewBox="0 0 512 512"
         style={{minWidth: "1.5rem", maxWidth: "1.5rem", minHeight: "1.5rem", maxHeight: "1.5rem"}}
    >
      <path d="M497.941 273.941c18.745-18.745 18.745-49.137 0-67.882l-160-160c-18.745-18.745-49.136-18.746-67.883
       0l-256 256c-18.745 18.745-18.745 49.137 0 67.882l96 96A48.004 48.004 0 0 0 144 480h356c6.627 0 12-5.373
       12-12v-40c0-6.627-5.373-12-12-12H355.883l142.058-142.059zm-302.627-62.627l137.373 137.373L265.373
       416H150.628l-80-80 124.686-124.686z"
      />
    </svg>
  );
}

