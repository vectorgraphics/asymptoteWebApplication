import { useSelector, useDispatch } from "react-redux";
import { idSelector, splitBtnReRenderSelector } from "../../../../store/selectors";
import { enActionCreator } from "../../../../store/workspaces";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/icons";
import { SplitViewBtn } from "../../Atoms/SplitViewBtn";
import { Btn } from "../../Atoms/Btn";

const useStyle = makeStyles((theme) => ({
  controlMenuCont: {
    gridRow: "1/2",
    display: "flex",
    flexFlow: "row nowrap",
    minWidth: "18rem",
    minHeight: "2.5rem",
    maxHeight: "2.5rem",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: theme.palette.background.ControlMenu,
  },
  span: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
  },
  linkIcon: {
    marginRight: "0.5rem",
    color: theme.palette.icon.Wiki,
  }
}));

export function ControlPanelMenu(props) {
  const locClasses = useStyle();
  const id = useSelector(idSelector);
  const activeModule = useSelector((store) => store.workspaces.entities)[id].activeModule;
  const splitBtnReRender = useSelector(splitBtnReRenderSelector);
  const dispatch = useDispatch();

  const link =  document.createElement("a");
  link.href = "https://artofproblemsolving.com/wiki/index.php?title=Asymptote_(Vector_Graphics_Language)";
  link.target = "_";

  return (
    <div className={locClasses.controlMenuCont}>
      <SplitViewBtn
        cssStyle={cssStyle} items={['Code Module', 'Graph Module']} activeModule={activeModule}
        onSelect={(value) => dispatch(enActionCreator.setActiveModule(id, value))} SplitBtnReRender={splitBtnReRender}
      />
      <Btn onClick={() => link.click()}>
        <span className={locClasses.span}> <Link className={locClasses.linkIcon}/> Wiki </span>
      </Btn>
    </div>
  );
}

const cssStyle = {
  groupBtn: {
    maxWidth: "7.5rem",
    minWidth: "7.5rem",
    maxHeight: "1.5rem",
    borderRadius: "1px",
  },
  selectBtn: {
    minWidth: "1.5rem",
    maxHeight: "1.5rem",
    borderRadius: "1px",
  },
  box: {
    minWidth: "6rem",
    maxWidth: "6rem",
    maxHeight: "1.5rem",
    fontFamily: "Roboto",
    fontWeight: "450",
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