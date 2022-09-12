import { useSelector, useDispatch } from "react-redux";
import { idSelector, activeModuleSelector } from "../../../../store/selectors";
import { enActionCreator } from "../../../../store/workspaces";
import { makeStyles, Button } from "@material-ui/core";
import { SplitBtn } from "../../Atoms/SplitBtn.js";
import { Link } from "@material-ui/icons";

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
  },
  root: {
    minWidth: "5.5rem",
    maxWidth: "5.5rem",
    minHeight: "1.5rem",
    maxHeight: "1.5rem",
    fontSize: "0.875rem",
    borderRadius: "1px",
  },
  span: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
  },
  linkIcon: {
    marginRight: "0.5rem",
    color: theme.palette.icon.wiki,
  }
}));

export const GlobalControls = (props) => {
  const locClasses = useStyle();
  const id = useSelector(idSelector);
  const activeModule = useSelector(activeModuleSelector);
  const dispatch = useDispatch();

  const link =  document.createElement("a");
  link.href = "https://artofproblemsolving.com/wiki/index.php?title=Asymptote_(Vector_Graphics_Language)";
  link.target = "_";

  return (
    <div className={locClasses.controlMenuCont}>
      <SplitBtn
        // finalStyle={finalStyle} items={['Code Module', 'Graph Module', 'Revolution Module']} currentItem={activeModule}
        finalStyle={finalStyle} items={['Code Module', 'Solid of Revolution']} currentItem={activeModule}
        onSelect={(value) => dispatch(enActionCreator.setActiveModule(id, value))}
      />
      <Button classes={{root: locClasses.root}} variant={"contained"} onClick={() => link.click()}>
        <span className={locClasses.span}> <Link className={locClasses.linkIcon}/> Wiki </span>
      </Button>
    </div>
  );
};

const finalStyle = {
  btnSize: {
    minWidth: "10rem",
    maxWidth: "10rem",
  },
}