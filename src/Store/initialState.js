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
            outformat: "html",
            codeText: "",
            output: {
                responsType: null,
                outformat: "html",
                errorType: null,
                errorCode: null,
                errorText: null,
                response: "",
                stdoutText: "",
                isUpdated: false
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