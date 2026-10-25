import React from 'react';
import cssStyle from './Output.module.css';
import { connect } from 'react-redux';
import { workspaceInspector } from '../../Util/util';

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     REACT-REDUX CONNECTION
const ContainerConstructor = connect((store) => ({ workspaces: store.workspaces, selectedWorkspace: store.selectedWorkspace }), {})

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     EDITOR COMPONENT
const Output = ContainerConstructor((props) => {
  const currentWorkspace = workspaceInspector(props);

  if (currentWorkspace.id !== null) {
    if (currentWorkspace.output.responseType === "ERROR") {
      const output = currentWorkspace.output;
      // Build the full error message with all available diagnostic info
      let errorDetails = output.errorText || "";
      if (output.errorContent) {
        errorDetails += "\n" + output.errorContent;
      }
      if (output.stderr && output.stderr !== "") {
        errorDetails += (errorDetails ? "\n" : "") + output.stderr;
      }
      if (output.stdout && output.stdout !== "") {
        errorDetails += (errorDetails ? "\n" : "") + output.stdout;
      }
      return (
        <div className={cssStyle.outputElse}>
          <div>
            <h4> Error: </h4>
            <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0 }}> {errorDetails} </pre>
          </div>
        </div>
      )
    } else if (currentWorkspace.output.responseType === "CLEARED") {
      return (
        <div className={cssStyle.outputPreview} />
      )

    } else {
      let string = (currentWorkspace.output.isUpdated) ? " " : "";
      return (
        <iframe id="outFrame" className={cssStyle.outputPreview} src={string + currentWorkspace.output.path}
          width="100%" height="100%" title="outputFrame" frameBorder="0" />
      )
    }
  } else {
    return (
      <div className={cssStyle.outputPreview} />
    )
  }
})

export default Output;
