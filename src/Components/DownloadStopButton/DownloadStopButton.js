import React, { memo, Component } from 'react';
import cssStyle from './DownloadStopButton.module.css';
import { connect } from 'react-redux';
import { actionFact } from '../../Store/store';
import { fetchOptionObj as basicfetchOption,  codeFormatter, workspaceInspector } from '../../Util/util';

const ContainerConstructor = connect((store) => ({ workspaces: store.workspaces, selectedWorkspace: store.selectedWorkspace }),
  {
    getRunResponse: actionFact.getRunResponse,
  })

const activeColor = "rgb(200, 200, 200)";
const inactiveColor = "rgb(119, 136, 153)";
let controller;

const DownloadStopButton = ContainerConstructor(class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonType: "Download"
    }
  }

  render() {
    const currentWorkspace = workspaceInspector(this.props);
    const noWorkspace = currentWorkspace.id === null;
    const emptyEditor = currentWorkspace.codeText === "";
    const onlyCodeChecked = currentWorkspace.codeOption.checked && !currentWorkspace.outputOption.checked;
    const onlyOutputChecked = !currentWorkspace.codeOption.checked && currentWorkspace.outputOption.checked;
    const bothOptionsChecked = currentWorkspace.codeOption.checked && currentWorkspace.outputOption.checked;

    let downloadBtn = "", stopBtn = "";

    if (this.state.buttonType === "Download") {
      return (
        <div className={this.props.cssClass}>
          <button className={cssStyle.Btn} ref={(button) => downloadBtn = button }
            style={(noWorkspace || emptyEditor) ? { color: inactiveColor } : { color: activeColor }}
            disabled={(noWorkspace || emptyEditor)}
            onClick={(event) => {
              downloadBtn.disabled = true;
              const link = document.createElement("a");
              const data = {
                reqType: "download",
                workspaceId: currentWorkspace.id,
                workspaceName: currentWorkspace.name.current,
                codeOption: currentWorkspace.codeOption.checked,
                outputOption: currentWorkspace.outputOption.checked,
                codeText: codeFormatter(currentWorkspace.codeText),
                requestedOutformat: currentWorkspace.outformat,
                isUpdated: currentWorkspace.output.isUpdated,
              };
              this.setState({
                buttonType: "Stop",
              })
              controller = new AbortController();
              const fetchOptionObj = {...basicfetchOption, signal: controller.signal};
              // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  ONLY CODE
              if (onlyCodeChecked) {
                fetch('/', {...fetchOptionObj.post, body: JSON.stringify(data)}).then((resObj) => resObj.json()).then((responseContent) => {
                  this.props.getRunResponse(currentWorkspace.id, {...currentWorkspace.output, ...responseContent});
                  if (responseContent.responseType === "ASY_FILE_CREATED") {
                    fetch('/clients', {...fetchOptionObj.post, body: JSON.stringify(data)}).then((resObj) => resObj.blob()).then((responseContent) => {
                      link.href = window.URL.createObjectURL(responseContent);
                      link.setAttribute("download", currentWorkspace.name.current + ".asy");
                      link.click();
                      this.setState({
                        buttonType: "Download",
                      });
                    }).catch((err) => {});
                  }
                }).catch((err) => {});
                // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  ONLY OUTPUT
              } else if (onlyOutputChecked) {
                fetch('/', {...fetchOptionObj.post, signal: controller.signal, body: JSON.stringify(data)}).then((resObj) => resObj.json()).then((responseContent) => {
                  this.props.getRunResponse(currentWorkspace.id, {...currentWorkspace.output, ...responseContent});
                  if (responseContent.responseType === "ASY_OUTPUT_CREATED") {
                    fetch('/clients', {...fetchOptionObj.post, body: JSON.stringify(data)}).then((resObj) => resObj.blob()).then((responseContent) => {
                      link.href = window.URL.createObjectURL(responseContent);
                      link.setAttribute("download", currentWorkspace.name.current + "." + currentWorkspace.outformat);
                      link.click();
                      this.setState({
                        buttonType: "Download",
                      });
                    }).catch((err) => {});
                  }
                }).catch((err) => {});
                // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  BOTH CODE & OUTPUT
              } else if (bothOptionsChecked) {
                fetch('/', {...fetchOptionObj.post, body: JSON.stringify(data)}).then((resObj) => resObj.json()).then((responseContent) => {
                  this.props.getRunResponse(currentWorkspace.id, {...currentWorkspace.output, ...responseContent});
                  if (responseContent.responseType !== "ERROR") {
                    data.codeOption = true;
                    data.outputOption = false;
                    fetch('/clients', {...fetchOptionObj.post, body: JSON.stringify(data)}).then((resObj) => resObj.blob()).then((responseContent) => {
                      link.href = window.URL.createObjectURL(responseContent);
                      link.setAttribute("download", currentWorkspace.name.current + ".asy");
                      link.click();
                      data.codeOption = false;
                      data.outputOption = true;
                      fetch('/clients', {...fetchOptionObj.post, body: JSON.stringify(data)}).then((resObj) => resObj.blob()).then((responseContent) => {
                        link.href = window.URL.createObjectURL(responseContent);
                        link.setAttribute("download", currentWorkspace.name.current + "." + currentWorkspace.outformat);
                        link.click();
                        this.setState({
                          buttonType: "Download",
                        })
                      }).catch((err) => {});
                    }).catch((err) => {});
                  } else if (responseContent.responseType === "ERROR" && responseContent.errorType !== "ASY_WRITE_FILE_ERR") {
                    this.props.getRunResponse(currentWorkspace.id, {...currentWorkspace.output, ...responseContent});
                    data.codeOption = true;
                    data.outputOption = false;
                    fetch('/clients', {...fetchOptionObj.post, body: JSON.stringify(data)}).then((resObj) => resObj.blob()).then((responseContent) => {
                      link.href = window.URL.createObjectURL(responseContent);
                      link.setAttribute("download", currentWorkspace.name.current + ".asy");
                      link.click();
                      this.setState({
                        buttonType: "Download",
                      })
                    }).catch((err) => {});
                  }
                });
              }
            }}
          >Download</button>
        </div>
      )
    } else {
      return (
        <div className={this.props.cssClass}>
          <button className={cssStyle.BtnAnimated} ref={(button) => stopBtn = button}
            onClick={(event) => {
              controller.abort();
              stopBtn.disabled = true;
              this.setState({
                buttonType: "Download",
              })
              stopBtn.onClick = null;
            }}
          >Stop</button>
        </div>
      )
    }
  }
})

export default memo(DownloadStopButton);
