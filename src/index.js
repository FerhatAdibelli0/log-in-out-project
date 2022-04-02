import React from "react";
import ReactDOM from "react-dom";
import { MainContextProvider } from "./context";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <MainContextProvider>
    <App />
  </MainContextProvider>,
  document.getElementById("root")
);
