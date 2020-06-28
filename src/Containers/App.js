import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from "../Store/store";
import cssStyle from './App.module.css';
import {workspaceInspector} from '../Util/util';

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                 COMPONENTS
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import ToggleKey from '../Components/ToggleKey/ToggleKey';
import RunButton from '../Components/RunButton/RunButton';
import RunStopButton from '../Components/RunStopButton/RunStopButton';
import DownloadButton from '../Components/DownloadButton/DownloadButton';
import Options from '../Components/Options/Options';
import Outformats from '../Components/Outformats/Outformats';
import ClearButton from '../Components/ClearButton/ClearButton';
import WorkspacePane from '../Components/WorkspacePane/WorkspacePane';
import CodePaneHeader from '../Components/CodePaneHeader/CodePaneHeader';
import OutputPaneHeader from '../Components/OutputPaneHeader/OutputPaneHeader';
import Editor from '../Components/Editor/Editor';
import Output from '../Components/Output/Output';

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     REACT-REDUX CONNECTION
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const ContainerConstructor = connect ((store) => ({
    workspaces: store.workspaces, 
    selectedWorkspace: store.selectedWorkspace,
    workspacePaneStatus: store.workspacePaneStatus
  }), {});

const App = ContainerConstructor(class extends Component {

  render(){
    // console.log(store.getState());
    const currentWorkspace = workspaceInspector(this.props);
    let link = null;

    return (
      <div id="AppCont" className={cssStyle.app}>
        <div className={cssStyle.header}>
          <div id="toggleKey" className={cssStyle.showWorkspace}>
            <ToggleKey/>
          </div>

          <div className={cssStyle.menuBar}>
            <RunStopButton cssClass={cssStyle.controls}/>
            <div className={cssStyle.downloadPanel}>
              <div className={cssStyle.subcomponentContainer}> <DownloadButton/> </div>
              <div className={cssStyle.subcomponentContainer}> <Options/> </div>
              <div className={cssStyle.subcomponentContainer}> <Outformats providedFormats={["html", "svg", "pdf", "eps", "png"]}/> </div> 
            </div>
            <ClearButton cssClass={cssStyle.controls}/>
          </div>

          <div className={cssStyle.homeLink} onClick={(event) => link.click()} >
            <a ref={(a)=> link = a}  href="https://asymptote.sourceforge.io/" target="_"> </a>
          </div>
        </div>
  
        <div className={cssStyle.mainBody}>
          <WorkspacePane/>
          <div className={cssStyle.centralPanes}>
            <div className={cssStyle.corePanes} style={(currentWorkspace.corePanesDisplay.codePane)? {display: "flex"}: {display: "none"}}>
              <CodePaneHeader/>
              <Editor/>
            </div>
            <div className={cssStyle.corePanes} style={(currentWorkspace.corePanesDisplay.outputPane)? {display: "flex"}: {display: "none"}}>
              <OutputPaneHeader/>
              <Output/>
            </div>
          </div>
        </div>
      </div>
    );
  } 
})

export default App;
