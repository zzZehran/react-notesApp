import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthContext.jsx";

import "./index.css";
import App from "./App.jsx";
import LoginPage from "./pages/Login_Page.jsx";
import OverviewNotes from "./pages/Overview_Notes.jsx";
import CreateNote from "./pages/Create_Note.jsx";
import ViewNote from "./pages/View_Note.jsx";
import UpdateNote from "./pages/Update_Note.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notes" element={<OverviewNotes />} />
        <Route path="/new" element={<CreateNote />} />
        <Route path="/notes/:id" element={<ViewNote />} />
        <Route path="/update/:id" element={<UpdateNote />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
