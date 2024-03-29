import React, { Component, memo } from 'react';
import cssStyle from './RunStopButton.module.css';
import { connect } from 'react-redux';
import { actionFact } from '../../Store/store';
import { fetchOptionObj, codeFormatter,  workspaceInspector, toUrlEncoded } from '../../Util/util';

const ContainerConstructor = connect((store) => ({
  workspaces: store.workspaces,
  selectedWorkspace: store.selectedWorkspace,
  usrID: store.usrID
}),{
  getRunResponse: actionFact.getRunResponse,
})

const inactiveColor = "rgb(119, 136, 153)";
const activeColor = "rgb(200, 200, 200)";
let controller;

const RunStopButton = ContainerConstructor(class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonType: "Run"
    }
  }

  render() {
    const currentWorkspace = workspaceInspector(this.props);
    const noWorkspace = currentWorkspace.id === null;
    const emptyEditor = currentWorkspace.codeText === "";
    let runBtn = "";
    let stopBtn = "";

    if (this.state.buttonType === "Run") {
      return (
        <button className={cssStyle.Btn} ref={(button) => { runBtn = button }}
          style={(noWorkspace || emptyEditor) ? { color: inactiveColor } : { color: activeColor }}
          disabled={(noWorkspace || emptyEditor)}
          onClick={(event) => {
            runBtn.disabled = true;
            const data = {
              reqType: "run",
              id: this.props.usrID,
              workspaceId: currentWorkspace.id,
              workspaceName: currentWorkspace.name.current,
              codeText: codeFormatter((currentWorkspace.codeText + "\n" + currentWorkspace.codeToAppend)),
              isUpdated: currentWorkspace.output.isUpdated,
            };
            controller = new AbortController();
            fetch('/', {...fetchOptionObj.postUrlEncode, signal: controller.signal, body: toUrlEncoded(data)}).then((resObj) => resObj.json()).then((responseContent) => {
              this.props.getRunResponse(currentWorkspace.id, {...currentWorkspace.output, ...responseContent});
              this.setState({
                buttonType: "Run",
              })
            }).catch(() => null);
            this.setState({
              buttonType: "Stop",
            })
            runBtn.onClick = null;
          }}
        >Run</button>
      )
    } else {
      return (
        <button className={cssStyle.BtnAnimated} ref={(button) => { stopBtn = button }}
          onClick={(event) => {
            controller.abort();
            stopBtn.disabled = true;
            this.setState({
              buttonType: "Run",
            })
            stopBtn.onClick = null;
          }}
        >Stop</button>
      )
    }
  }
})

export default memo(RunStopButton);
