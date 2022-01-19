import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store, { actionFact } from './Store/store';
import App from './Containers/App';
import { fetchOptionObj } from './Util/util'
import './index.css';

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%      FETCHING ASYMPTOTE VERSION
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%      SETTING USER DIR & PINGING
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
let pingMilliseconds = 600000;
let timeIntervalID = ""

window.asyWebApplication = {
  setProjection: function (asyCode) {
    const id = store.getState().selectedWorkspace.id;
    store.dispatch(actionFact.setAsyProjection(id, asyCode));
  },
  getProjection: function () {
    const id = store.getState().selectedWorkspace.id;
    const workspaces = store.getState().workspaces;
    for (const workspace of workspaces) {
      if (workspace.id === id) {
        return workspace.codeToAppend;
      }
    }
  }
}

const connectionRequest = {
  reqType: "usrConnect"
};
const pingRequest = {
  reqType: "ping"
};


window.addEventListener('load', (event) => {
  fetch('/', {...fetchOptionObj.postJson, body: JSON.stringify(connectionRequest)})
    .then((resObj) => resObj.json())
    .then((responseContent) => {
      ReactDOM.render(
        <Provider store={store}>
          <App id={responseContent.usrID} asyVersion={responseContent.asyVersion} />
        </Provider>,
        document.getElementById('root')
      );
      if (responseContent.usrConnectStatus === "UDIC") {
        timeIntervalID = setInterval(() => {
        fetch('/',{...fetchOptionObj.postJson, body: JSON.stringify(pingRequest)}).then(() => {})
      }, pingMilliseconds)
    }
  });
})

window.addEventListener("unload", (event) => {
  const id = store.getState().usrID;
  navigator.sendBeacon('/delete', `deleteReq&${id}`);
});
