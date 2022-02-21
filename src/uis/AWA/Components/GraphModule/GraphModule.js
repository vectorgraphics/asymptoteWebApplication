import { useState } from "react";
import { makeStyles, AppBar, Tab, Tabs } from '@material-ui/core';
import { FunctionsTab } from "./Tabs/FunctionsTab";
import { AxesTab } from "./Tabs/AxesTab";
import { PensTab } from "./Tabs/PensTab";
import { LabelsTab } from "./Tabs/LabelsTab";
import { PicturesTab } from "./Tabs/PicturesTab";
import { DrawTab } from "./Tabs/DrawTab";

const useStyle = makeStyles((theme) => ({
  base: {
    display: "flex",
    flexFlow: "column nowrap",
    minHeight: "100%",
  },
  tabsCont: {
    flex: "1 1 auto",
    minWidth: "1300px",
    minHeight: "calc(100% -2rem)",
    margin: "1rem",
    alignSelf: "stretch",
    backgroundColor: theme.palette.background.GraphModule,
    borderRadius: "3px 3px 2px 2px",
  },
  appBar: {
    maxHeight: "2rem",
    minHeight: "2rem",
    backgroundColor: theme.palette.background.GMAppBar,
    borderRadius: "2px 2px 0 0",
  },
  tabs: {
    backgroundColor: theme.palette.text.Activated,
  },
  tabsRoot: {
    minHeight: "2rem",
    maxHeight: "2rem",
  },
  tab: {
    minHeight: "2rem",
    maxHeight: "2rem",
  },
  flex: {
    minHeight: "2rem",
    maxHeight: "2rem",
  },
}))

export function GraphModule(props) {
  const locClasses = useStyle();
  const [tabId, setTabId] = useState(0);
  // const tabItems = ["Functions", "Axes", "Pens", "Labels", "Pictures", "Draw"]; // With Pictures Tab
  const tabItems = ["Functions", "Axes", "Pens", "Labels", "Draw"];

  return (
    <div className={locClasses.base}>
      <div className={locClasses.tabsCont}>
        <AppBar classes={{root: locClasses.appBar}} position="static">
          <Tabs
            classes={{
              root: locClasses.tabsRoot,
              indicator: locClasses.tabs,
              flexContainer: locClasses.flex
            }}
            value={tabId} onChange={(event, id) => setTabId(id)}
          >
            {
              tabItems.map((item, index) => <Tab key={index} classes={{root: locClasses.tab}} label={item}/>)
            }
          </Tabs>
        </AppBar>
        <TabRenderer tabId={tabId}/>
      </div>
    </div>
  );
}

function TabRenderer({tabId, ...props}) {
  switch (tabId) {
    case 0:
      return <FunctionsTab/>;
    case 1:
      return <AxesTab/>;
    case 2:
      return <PensTab/>;
    case 3:
      return <LabelsTab/>;
    // case 4:
    //   return <PicturesTab/>;
    case 4:
      return <DrawTab/>;
    default:
      return null;
  }
}