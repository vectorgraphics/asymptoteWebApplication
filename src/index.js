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
let asymptoteVersion = "";
const data = {
  reqType: "usrConnect"
};
const pingData = {
  reqType: "ping"
};

window.addEventListener("load", (event) => {
  fetch('/', {...fetchOptionObj.post, body: JSON.stringify(data)}).then((resObj) => resObj.json()).then((responseContent) => {
    asymptoteVersion = responseContent.asyVersion;
    ReactDOM.render(<Provider store={store}> <App asyVersion={asymptoteVersion} /> </Provider>, document.getElementById('root'));
    if (responseContent.usrConnectStatus === "UDIC") {
      setInterval(() => {
        fetch('/',{...fetchOptionObj.post, body: JSON.stringify(pingData)}).then((resObj) => {})
      }, pingMilliseconds)
    }
  });
})

