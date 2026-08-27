import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { UpdatesProvider } from "./context/UpdatesContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UpdatesProvider>
    <App />
    </UpdatesProvider>
  </React.StrictMode>
);
