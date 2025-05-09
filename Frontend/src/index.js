import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
// import { BrowserRouter } from "react-router-dom";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <App />
    {/* </BrowserRouter> */}
  </React.StrictMode>
);

// ReactDOM.createRoot(root).render(<App />);
