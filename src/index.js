import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './Store/store';
import {Ajax} from './Util/util';
import App from './Containers/App';
import './index.css';

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  SETTING & CLEANING UP USER DIR
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
window.addEventListener("load", (event) => {
    const data = {
      reqType: "load"
    };
    const dataJSON = JSON.stringify(data);
    Ajax("POST", "/", {}, false).contentType("json").done(dataJSON, (response) => {})
})
window.addEventListener("unload", (event) => {
    const data = {
      reqType: "unload"
    };
    const dataJSON = JSON.stringify(data);
    Ajax("POST", "/", {}, false).contentType("json").done(dataJSON, (response) => {})
})

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  REACT-DOM RENDER
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

ReactDOM.render(<Provider store={store}> <App/> </Provider>, document.getElementById('root'));