import { makeStyles } from "@material-ui/core/styles";
import { BinarySwitch } from "../../../Atoms/BinarySwitch";
import { useSelector, useDispatch } from "react-redux";
import { themeSelector } from "../../../../../store/selectors.js";
import { tmActionCreator } from "../../../../../store/themes.js";
import { startCase } from "lodash";


const useStyle = makeStyles((theme) => ({
  tabCont: {
    minWidth: "100%",
    minHeight: "100%",
  },
}))

export const ThemeTab = (props) => {
  const locClasses = useStyle();
  const dispatch = useDispatch();
  const currentTheme = useSelector(themeSelector);
  const selectTheme = (state) => {
    const selectedTheme = (state)? "darkTheme": "lightTheme";
    dispatch(tmActionCreator.changeTheme(selectedTheme));
  }

  return (
    <div className={locClasses.tabCont}>
      <BinarySwitch
        Labels={["Light Theme", "Dark Theme"]}
        switchInitialValue={startCase(currentTheme)}
        onChange={selectTheme}
      />
    </div>
  );
};