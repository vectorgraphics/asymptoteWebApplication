export const workspaceInspector = function(props){
    const length = props.workspaces.length;
    const index = props.selectedWorkspace.index;

    if(length === 0){
        return {
            id: null,
            name:{
                lastAssigned: "file",
                current: "file",
            },
            codeOption: {
                checked: false,
                disabled: false,
            },
            outputOption: {
                checked: false,
                disabled: false,
            },
            outformat: {
                value: "html",
                disabled: false
            },
            codeText: "",
            output: {
                responseType: null,
                outformat: "",
                errorType: null,
                errorCode: null,
                errorText: null,
                response:  null,
                stdoutText: "",
                isUpdated: false
            },
            corePanesDisplay: {
                codePane: true,
                outputPane: true
            },
        }

    }else{
        return props.workspaces[index];
    }
}

export const fetchOptionObj = {
  get: {
    method: "GET",
    headers: {
      'Access-Control-Allow-Origin':'*',
      "Content-type": "text/html",
      "pragma": "no-cache",
      "cache-control": "no-cache"
    }
  },
  post: {
    method: "POST",
    headers: {
      'Access-Control-Allow-Origin':'*',
      "Content-type": "application/json; charset=utf-8",
    }
  }
}

export function codeFormatter(codeText){
  if (codeText[codeText.length - 1] !== "\n"){
    codeText += "\n";
  }
  return codeText;
}
