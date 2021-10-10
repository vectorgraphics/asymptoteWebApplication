import { useState } from "react";
import { makeStyles, AppBar, Tab, Tabs } from '@material-ui/core';
import { FunctionTab } from "./Tabs/FunctionTab";
import { AxesTab } from "./Tabs/AxesTab";
import { LegendTab } from "./Tabs/LegendTab";

const useStyles = makeStyles((theme) => ({
  div: {
    height: "100%",
    flexGrow: 1,
    backgroundColor: "#D1D5DA",
    borderRadius: "3px 3px 2px 2px",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "0.5rem",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 0.5rem rgba(0,0,0,0.5)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#606060",
      outline: "1px solid slategrey",
    },
  },
  appBar: {
    maxHeight: "2rem",
    minHeight: "2rem",
    backgroundColor: "#5D6980",
    borderRadius: "2px 2px 0 0"
  },
  tabs: {
    backgroundColor: theme.palette.text.textActivated,
  },
  tabsRoot: {
    minHeight: "2rem",
    maxHeight: "2rem",
  },
  flex: {
    minHeight: "2rem",
    maxHeight: "2rem",
  },
  tab: {
    minHeight: "2rem",
    maxHeight: "2rem",
  }
}));

export function GraphPane(props) {
  const locClasses = useStyles();
  const [tabId, setTabId] = useState(0);
  const items = ["Function", "Axes",] // "Legend"

  const handleChange = (event, id) => {
    setTabId(id);
  };

  return (
    <div className={locClasses.div}>
      <AppBar classes={{root: locClasses.appBar}} position="static">
        <Tabs
          classes={{
            root: locClasses.tabsRoot,
            indicator: locClasses.tabs,
            flexContainer: locClasses.flex
          }}
          value={tabId} onChange={handleChange}
        >
          <Tab classes={{root: locClasses.tab}} id={`simple-tabpanel-${0}`} label={items[0]}/>
          <Tab classes={{root: locClasses.tab}} id={`simple-tabpanel-${1}`} label={items[1]}/>
          {/*<Tab classes={{root: locClasses.tab}} id={`simple-tabpanel-${2}`} label={items[2]}/>*/}
        </Tabs>
      </AppBar>
      <TabRenderer tabId={tabId}/>
    </div>
  );
}

function TabRenderer({tabId, ...props}) {
  if (tabId === 0) {
    return <FunctionTab/>;
  } else if (tabId === 1) {
    return <AxesTab/>;
  } else if (tabId === 2) {
    return <LegendTab/>;
  }
}

