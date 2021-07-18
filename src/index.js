import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './Store/store';
import App from './Containers/App';
import { fetchOptionObj } from './Util/util'
import './index.css';

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%      FETCHING ASYMPTOTE VERSION
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%      SETTING USER DIR & PINGING
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
let pingMilliseconds = 600000;
let timeIntervalID = ""
const connectionRequest = {
  reqType: "usrConnect"
};
const pingRequest = {
  reqType: "ping"
};


window.addEventListener('load', (event) => {
  fetch('/', {...fetchOptionObj.post, body: JSON.stringify(connectionRequest)})
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
        fetch('/',{...fetchOptionObj.post, body: JSON.stringify(pingRequest)}).then(() => {})
      }, pingMilliseconds)
    }
  });
})

window.addEventListener("unload", (event) => {
  const id = store.getState().usrID;
  navigator.sendBeacon('/delete', `deleteReq&${id}`);
});
