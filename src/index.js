import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './Store/store';
import {Ajax} from './Util/util';
import App from './Containers/App';
import './index.css';
let pingMilliseconds = 600000;
// let pingMilliseconds = 6000;

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%      SETTING USER DIR & PINGING
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
window.addEventListener("load", (event) => {
    const data = {
      reqType: "usrConnect"
    };
    const dataJSON = JSON.stringify(data);
    Ajax("POST", "/", {}, false).contentType("json").done(dataJSON, (response) => {
      if (response === "UDIC"){
        setInterval(() => {
          const data = {
            reqType: "ping"
          };
          const dataJSON = JSON.stringify(data);
          Ajax("POST", "/", {}, false).contentType("json").done(dataJSON, (response) => {})
        }, pingMilliseconds)
      }
    })
})

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  REACT-DOM RENDER
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

ReactDOM.render(<Provider store={store}> <App/> </Provider>, document.getElementById('root'));
