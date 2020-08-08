import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './Store/store';
import { Ajax } from './Util/util';
import App from './Containers/App';
import './index.css';
let pingMilliseconds = 600000;

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%      FETCHING ASYMPTOTE VERSION
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%      SETTING USER DIR & PINGING
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
var asymptoteVersion = "";
window.addEventListener("load", (event) => {
  const data = {
    reqType: "usrConnect"
  };
  const dataJSON = JSON.stringify(data);
  Ajax("POST", "/", { responseType: "json" }).contentType("json").done(dataJSON, (response) => {
    asymptoteVersion = response.asyVersion;
    ReactDOM.render(<Provider store={store}> <App asyVersion={asymptoteVersion} /> </Provider>, document.getElementById('root'));
    if (response.usrConnectStatus === "UDIC") {
      setInterval(() => {
        const data = {
          reqType: "ping"
        };
        const dataJSON = JSON.stringify(data);
        Ajax("POST", "/", { responseType: "json" }).contentType("json").done(dataJSON, (response) => { })
      }, pingMilliseconds)
    }
  })
})
