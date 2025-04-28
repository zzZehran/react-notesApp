import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import "./index.css";
import App from "./App.jsx";
import LoginPage from "./pages/Login_Page.jsx";
import OverviewNotes from "./pages/Overview_Notes.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/notes" element={<OverviewNotes />} />
    </Routes>
  </BrowserRouter>
  // </StrictMode>
);
