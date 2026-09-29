import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom"; // Use HashRouter for hash-based routing
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <App />
  </HashRouter>
);
