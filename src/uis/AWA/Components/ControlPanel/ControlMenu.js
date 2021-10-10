import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {idSelector, splitBtnReRenderSelector} from "../../../../store/selectors";
import { enActionCreator } from "../../../../store/workspaces";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/icons";
import { SplitViewBtn } from "../../Atoms/SplitViewBtn";
import { Btn } from "../../Atoms/Btn";

const useStyle = makeStyles((theme) => ({
  splitBtn: {
    flex: "1 1 auto",
    padding: 0,
    margin: 0,
  },
  btn: {
    flex: "1 1 auto",
    padding: 0,
    margin: 0,
    minWidth: "5rem",
    maxWidth: "5rem",
    maxHeight: "2rem",
  },
  link: {
    color: theme.palette.icon.Wiki,
  }
}));

export function ControlMenu(props) {
  const locClasses = useStyle();
  const id = useSelector(idSelector);
  const entities = useSelector((store) => store.workspaces.entities);
  const splitBtnReRender = useSelector(splitBtnReRenderSelector);
  const dispatch = useDispatch();

  function clickLink() {
    const link =  document.createElement("a");
    link.href = "https://artofproblemsolving.com/wiki/index.php?title=Asymptote_(Vector_Graphics_Language)";
    link.target = "_";
    link.click();
  }

  return (
    <Fragment>
      <SplitViewBtn
        cssStyle={cssStyle} className={locClasses.splitBtn} items={['Code Module', 'Graph Module']}
        passedId={id} passedEntities={entities} dispatch={dispatch}
        passedHandler={enActionCreator.setActiveModule} SplitBtnReRender={splitBtnReRender}
      />
      <Btn className={locClasses.btn} startIcon={<Link className={locClasses.link}/>} onClick={clickLink}> Wiki </Btn>
    </Fragment>
  );
}

const cssStyle = {
  gBtn: {
    maxWidth: "7.5rem",
    minWidth: "7.5rem",
    maxHeight: "1.5rem",
    borderRadius: "1px",
  },
  sBtn: {
    maxWidth: "1.5rem",
    minWidth: "1.5rem",
    maxHeight: "1.5rem",
    borderRadius: "1px",
  },
  box: {
    minWidth: "6rem",
    maxWidth: "6rem",
    maxHeight: "1.5rem",
    fontSize: "0.875rem",
    textAlign: "center",
    lineHeight: "1.5rem",
    borderRadius: "1px 0 0 1px",
    borderRight: "1px solid lightGray",
    backgroundColor: "#e0e0e0",
  },
  list: {
    display: "flex",
    flexFlow: "column nowrap",
    minWidth: "7.5rem",
    maxWidth: "7.5rem",
    padding: 0,
    margin: 0,
    borderRadius: "1px",
  },
  item: {
    flex: "1 1 auto",
    minWidth: "100%",
    minHeight: "1.5rem",
    maxHeight: "1.5rem",
    padding: 0,
    margin: "0.125rem 0",
    justifyContent: "space-evenly",
    fontSize: "0.875rem",
    lineHeight: "1.5rem",
    "&:hover": {
      backgroundColor: "darkGrey"
    }
  },
  paper: {
    marginTop: "0.25rem",
    borderRadius: "1px",
  },
}