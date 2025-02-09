import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; 
import "./App.css";   
import App from "./App.jsx";
import '../src/index.css';
import '../tailwind.css';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
