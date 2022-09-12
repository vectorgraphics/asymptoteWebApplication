import { useState } from "react";
import { makeStyles, Tab, Tabs } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cont: {
    flex: "1 1 auto",
    display: 'grid',
    gridTemplateColumns: "8rem 1fr",
    marginBottom: "1rem",
    alignItems: "stretch",
    // border: "1px solid black",
    overflow: "hidden",
  },
  tabPreview: {
    minWidth: "25rem",
    minHeight: "20rem",
    // border: "1px solid red",
  },
  tabs: {
    minWidth: "8rem",
    maxWidth: "8rem",
    borderRight: `1px solid rgba(0, 0, 0, 0.75)`,
    // border: "1px solid green",
  },
  tab: {
    maxWidth: "8rem",
    color: theme.palette.text.awaPrimaryContrast,
  },
  tabRoot: {
    padding: 0,
    minWidth: "100%",
    maxWidth: "100%",
  }
}));

export const VerticalTabbing = ({tabLabels=[], tabComponents=[], ...props}) => {
  const locClasses = useStyles();
  const [value, setValue] = useState(0);

  return (
    <div className={locClasses.cont}>
      <Tabs classes={{}}
        className={locClasses.tabs} orientation="vertical" variant="standard" value={value}
        onChange={(event, newValue) => setValue(newValue)}
      >
        {tabLabels.map((element, index) => (
            <Tab
              classes={{root: locClasses.tabRoot}} className={locClasses.tab}
              key={index} label={element} disableFocusRipple={true}
            />)
        )}
      </Tabs>
      {tabComponents.map((element, index) => (
        <TabPreview key={index} value={value} index={index}> {element} </TabPreview>
        )
      )}
    </div>
  );
};

const TabPreview = ({children, value, index, ...props}) => {
  const locClasses = useStyles();

  return (
    <div className={locClasses.tabPreview} hidden={value !== index} {...props}>
      {value === index && children}
    </div>
  );
};