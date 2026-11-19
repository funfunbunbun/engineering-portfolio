import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";
import "./expanded.css";
import "./intelligent.css";
import "./workbenches.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);

import "./refresh.css";
import "./motion.css";
import "./review.css";
import "./showcase.css";
import "./polish.css";
