import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from "./core/AppContainer.js";


let pingMilliseconds = 600000;
const data = {
  reqType: "usrConnect"
};
const pingData = {
  reqType: "ping"
};

// window.addEventListener("load", (event) => {
//   fetch('/', {...fetchOptionObj.postJson, body: JSON.stringify(data)}).then((resObj) => resObj.json()).then((responseContent) => {
//     ReactDOM.render(
//       // <React.StrictMode>
//       <App UCID={responseContent.uniqueClientID} asyVersion={responseContent.asyVersion}/>,
//       // </React.StrictMode>,
//       document.getElementById('root')
//     );
//     if (responseContent.usrConnectStatus === "UDIC") {
//       setInterval(() => {
//         fetch('/',{...fetchOptionObj.postJson, body: JSON.stringify(pingData)}).then((resObj) => {console.log("here")})}, pingMilliseconds);
//     }
//   });
// })
// window.addEventListener("unload", (event) => {
//   const UCID = useSelector(UCIDSelector);
//   navigator.sendBeacon('/delete', `deleteReq&${UCID}`);
// });


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


ReactDOM.render(<AppContainer UCID="100" asyVersion="0.00"/>, document.getElementById('root'));




















