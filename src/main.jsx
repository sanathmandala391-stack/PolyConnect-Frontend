
window.global = window;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { UpdatesProvider } from "./context/UpdatesContext";

// Auto-reload on deployment chunk update (Vite preload error)
if (typeof window !== "undefined") {
  window.addEventListener("vite:preloadError", (event) => {
    event.preventDefault();
    window.location.reload();
  });
}

// Non-blocking background warmup ping to wake up Render backend if it is sleeping
const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
if (API_BASE && typeof window !== "undefined") {
  try {
    fetch(`${API_BASE.replace(/\/api\/?$/, "")}/api/sbtet/last-sync`, { method: "GET", keepalive: true }).catch(() => {});
  } catch {
    // ignore
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UpdatesProvider>
      <App />
    </UpdatesProvider>
  </React.StrictMode>
);
