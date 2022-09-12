import { makeStyles, FormControl, Input, InputLabel, MenuItem, Select, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "9rem",
    maxWidth: "9rem",
  },
  InputLabel: {
    fontSize: "0.875rem",
  },
  menuItem: {
    maxHeight: "2rem",
    borderTop: "1px solid lightgray",
  },
  firstMenuItem: {
    maxHeight: "2rem",
  }
}));

const MenuProps = {
  PaperProps: {
    style: {
      minHeight: "3rem",
      maxHeight: "10rem",
      width: "8rem",
    },
  },
};

function getStyles(name, selectedName, theme) {
  return {
    fontWeight:
      selectedName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const MultipleSelect = ({
  className="", label="no label", listOfItems=[], selectedList=[], setSelectedList=() => {}, disabled=false, ...props
}) => {
  const locClasses = useStyles(props);
  const theme = useTheme();

  return (
    <div className={className}>
      <FormControl className={locClasses.formControl} disabled={disabled}>
        <InputLabel className={locClasses.InputLabel}> {label} </InputLabel>
        <Select
          multiple value={selectedList}
          input={<Input/>} MenuProps={MenuProps}
          onChange={(event) => setSelectedList(event.target.value)}
        >
          {
            listOfItems.map((item, index) => (
              <MenuItem
                key={item} classes={{root: (index === 0)? locClasses.firstMenuItem: locClasses.menuItem}}
                value={item} style={getStyles(item, selectedList , theme)}
              >
                {item}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </div>
  );
};