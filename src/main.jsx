import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom"; // CHANGE THIS
import { Toaster } from "react-hot-toast"; // ADD THIS
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      {" "}
      <App />
      <Toaster />
    </HashRouter>
  </StrictMode>,
);
