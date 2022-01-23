import React from "react";
import { render } from "react-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import "./index.css";
import loadable from "@loadable/component";
const AppComponent = loadable(() => import("./App"));
//import App from "./App";

render(
  <Provider store={store}>
    <AppComponent />
  </Provider>,
  document.getElementById("root")
);
