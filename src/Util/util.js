export const workspaceInspector = function(props){
    const length = props.workspaces.length;
    const selectedWorkspace = props.selectedWorkspace;
    const index = selectedWorkspace.index;

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
      "Content-Type": "text/html"
    }
  },
  post: {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  }
}

export function codeFormatter(codeText){
  if (codeText[codeText.length - 1] !== "\n"){
    codeText += "\n";
  }
  return codeText;
}


export const decode = function (r) {
  const unEsc = function (s) {
    let r=(s+"").toString().replace(/:\|/g,":");
    return r === 'null' ? null : r;
  }

  let k=0;
  let s=r.split("::");

  return {
    responseType: unEsc(s[k++]),
    errorType:  unEsc(s[k++]),
    errorText:  unEsc(s[k++]),
    errorCode:  unEsc(s[k++]),
    errorContent:  unEsc(s[k++]),
    stdin:  unEsc(s[k++]),
    stdout:  unEsc(s[k++]),
    stderr:  unEsc(s[k++]),
    entryExists:  unEsc(s[k++]) === 'true',
    isUpdated:  unEsc(s[k++]) === 'true',
    path: unEsc(s[k])
  }
}
