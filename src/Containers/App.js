import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from "../Store/store";
// import cssStyle from './App.module.css';
import { workspaceInspector } from '../Util/util';

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                 COMPONENTS
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import ToggleKey from '../Components/ToggleKey/ToggleKey';
import RunStopButton from '../Components/RunStopButton/RunStopButton';
import UploadButton from '../Components/UploadButton/UploadButton';
import DownloadStopButton from '../Components/DownloadStopButton/DownloadStopButton';
import Options from '../Components/Options/Options';
import Outformats from '../Components/Outformats/Outformats';
import ClearButton from '../Components/ClearButton/ClearButton';
import WorkspacePane from '../Components/WorkspacePane/WorkspacePane';
import CodePaneHeader from '../Components/CodePaneHeader/CodePaneHeader';
import OutputPaneHeader from '../Components/OutputPaneHeader/OutputPaneHeader';
import Editor from '../Components/Editor/Editor';
import Terminal from '../Components/Terminal/Terminal';
import Output from '../Components/Output/Output';

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     REACT-REDUX CONNECTION
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const ContainerConstructor = connect((store) => ({
  workspaces: store.workspaces,
  selectedWorkspace: store.selectedWorkspace,
  workspacePaneStatus: store.workspacePaneStatus
}), {});

const App = ContainerConstructor(class extends Component {

  render() {
    // console.log(store.getState());
    const currentWorkspace = workspaceInspector(this.props);
    let link = null;

    return (
      <div id="AppCont" className={cssStyle.app}>
        <div className={cssStyle.header}>
          <ToggleKey />
          <div className={cssStyle.menuBar}>
            <div className={cssStyle.uploadRunPanel}>
              <UploadButton cssClass={cssStyle.controls} />
              <RunStopButton cssClass={cssStyle.controls} />
            </div>
            <div className={cssStyle.downloadPanel}>
              <div className={cssStyle.subcomponentContainer}> <DownloadStopButton /> </div>
              <div className={cssStyle.subcomponentContainer}> <Options /> </div>
              <div className={cssStyle.subcomponentContainer}> <Outformats providedFormats={["html", "svg", "pdf", "eps", "png"]} /> </div>
            </div>
            <ClearButton cssClass={cssStyle.controls} />
          </div>

          <div className={cssStyle.homeLink} onClick={(event) => link.click()} >
            <a ref={(a) => link = a} href="https://asymptote.sourceforge.io/" target="_"> </a>
          </div>
        </div>

        <div className={cssStyle.mainBody}>
          <WorkspacePane asyVersion={this.props.asyVersion}/>
          <div className={cssStyle.centralPanes}>
            <div className={cssStyle.corePanes} style={(currentWorkspace.corePanesDisplay.codePane) ? { display: "flex" } : { display: "none" }}>
              <CodePaneHeader />
              <Editor />
              <Terminal />
            </div>
            <div className={cssStyle.corePanes} style={(currentWorkspace.corePanesDisplay.outputPane) ? { display: "flex" } : { display: "none" }}>
              <OutputPaneHeader />
              <Output />
            </div>
          </div>
        </div>
      </div>
    );
  }
})

export default App;
