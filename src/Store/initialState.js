const initialState = {
    workspaces: [
        {
            id: 1,
            name: {
                lastAssigned: "workspace",
                current: "workspace",
            },
            codeOption: {
                checked: false,
                disabled: false,
            },
            outputOption: {
                checked: true,
                disabled: false,
            },
            codeText: "",
            outformat: "html",
            output: {
                responseType: null,
                errorType: null,
                errorText: null,
                errorCode: null,
                errorContent: null,
                stdin: "",
                stdout: "",
                stderr: "",
                entryExists: false,
                isUpdated: false,
                path: ""
            },
            corePanesDisplay: {
                codePane: true,
                outputPane: true
            },
        },

    ],
    selectedWorkspace: {
        id: 1,
        index: 0
    },
    workspacePaneStatus: {
        view: true
    }

}

export default initialState;