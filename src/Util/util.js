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
      "Content-Type": "text/html; charset=UTF-8",
      "cache-control": "no-cache",
      "pragma": "no-cache",
    }
  },
  post: {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  },
  postFormData: {
    method: "POST",
  }
}

export function codeFormatter(codeText){
  if (codeText[codeText.length - 1] !== "\n"){
    codeText += "\n";
  }
  return codeText;
}

export function toFormData(dataObj) {
  const formDataObj = new FormData();
  for (const member of Object.keys(dataObj)) {
    formDataObj.append(member, dataObj[member])
  }
  return formDataObj
}
