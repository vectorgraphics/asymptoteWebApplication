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
let usrID = "";
let pingMilliseconds = 600000;
let asymptoteVersion = "";
const connectionRequest = {
  reqType: "usrConnect"
};
const pingRequest = {
  reqType: "ping"
};

window.addEventListener("load", (event) => {
  fetch('/', {...fetchOptionObj.post, body: JSON.stringify(connectionRequest)}).then((resObj) => resObj.json()).then((responseContent) => {
    asymptoteVersion = responseContent.asyVersion;
    usrID = responseContent.usrID;
    ReactDOM.render(<Provider store={store}> <App id={usrID} asyVersion={asymptoteVersion} /> </Provider>, document.getElementById('root'));
    if (responseContent.usrConnectStatus === "UDIC") {
      setInterval(() => {
        fetch('/',{...fetchOptionObj.post, body: JSON.stringify(pingRequest)}).then((resObj) => {})
      }, pingMilliseconds)
    }
  });
})

