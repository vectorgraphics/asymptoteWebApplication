import {createStore, combineReducers} from 'redux';
import initialState from './initialState';

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%              ACTION TYPES
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const actionTypes = {
    add:    "ADD",
    remove: "REMOVE",
    select: "SELECT",
    update: "UPDATE",
    view:   "VIEW"
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%          ACTION FACTORIES
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const actionFact = {
    addWorkspace : function(id){
        return {
            type: actionTypes.add,
            id: id,
        }
    },
    removeWorkspace : function(id){
        return {
            type: actionTypes.remove,
            id: id,
        }
    },
    selectWorkspace : function(id, index){
        return {
            type: actionTypes.select,
            id : id,
            index: index
        }
    },
    renameWorkspace : function(id, lastAssigned, current){
        return {
            type: actionTypes.update,
            id: id,
            name: {
                lastAssigned: lastAssigned,
                current: current,
            }
        }        
    },
    selectOption : function(id, name, isChecked, status){
        if(name === "code") {
            return {
                type: actionTypes.update,
                id: id,
                codeOption: {
                   checked: isChecked,
                   disabled: status
                } 
            }
        } else if(name === "output"){
                return {
                    type: actionTypes.update,
                    id: id,
                    outputOption: {
                       checked: isChecked,
                       disabled: status
                    } 
                }
            }
    },
    selectFormat : function(id, value){
        return {
            type: actionTypes.update,
            id: id,
            outformat: value
        }                
    },
    saveCode : function(id, codeText){
        return {
            type: actionTypes.update,
            id: id,
            codeText: codeText
        }                
    },
    updateTextareaContent : function(id, textValue){
        return {
            type: actionTypes.update,
            id: id,
            codeText: textValue
        }        
    },
    corePanesDisplay : function(id, status){
        return {
            type: actionTypes.update,
            id: id,
            corePanesDisplay: status
        }        
    },
    getRunResponse : function(id, response){
        return {
            type: actionTypes.update,
            id: id,
            output: response
        }        
    },
    changeWorkspacePaneStatus: function(statusValue){
        return {
            type: actionTypes.view,
            view: statusValue
        }
    } 
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                  REDUCERS
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// ............... Reducer Internal Function
function updaterPro(workspace, action){
    var obj={...workspace};
    var modifiedAction = {...action};
    delete modifiedAction.type;
    for (let item in modifiedAction){
        obj[item] = modifiedAction[item];
    }
    return obj;
}
export const workspaces = (state = [], action) => {
    switch(action.type){
        case actionTypes.add:
            return [
                {
                    id: action.id,
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
                        outformat: "html",
                        responsType: null,
                        errorType: null,
                        errorCode: null,
                        errorText: null,
                        response: "",
                        isUpdated: false
                    },
                    corePanesDisplay: {
                        codePane: true,
                        outputPane: true
                    },
                },
                ...state
            ]

        case actionTypes.remove:
            return state.filter((workspace) => workspace.id !== action.id);

        case actionTypes.update:
            return [
                ...state.map(function (workspace){
                if (workspace.id !== action.id){
                    return workspace;
                }else{
                    return updaterPro(workspace, action);
                }
            })
        ]
        default:
            return state
    }
}

function getActionData(action){
    const obj = {...action};
    delete obj.type;
    return obj;
}

export const selectedWorkspace = (state = {}, action) => {
    switch(action.type){
        case actionTypes.select:
            return { ...getActionData(action)};
        default:
            return state
    }
}

export const workspacePaneStatus = (state = {}, action) => {
    switch(action.type){
        case actionTypes.view:
            return { ...getActionData(action)};
        default:
            return state
    }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                     STORE
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const store = createStore(combineReducers({workspaces, selectedWorkspace, workspacePaneStatus}), initialState);
export default store;