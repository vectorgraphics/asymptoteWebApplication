import { store } from "../store/store";
import { Provider } from "react-redux";
import { App } from "./App.js";

export const AppContainer = ({UCID=0, asyVersion="unknown", ...props}) => {

  return (
    <Provider store={store}>
      <App UCID={UCID} asyVersion={asyVersion}/>
    </Provider>
  );
}
