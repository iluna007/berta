// src/components/App.jsx
import "../scss/main.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import NarrativePage from "./NarrativePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página principal de tu sitio */}
        <Route path="/" element={<Layout />} />

        {/* Página única de narrativas (barra lateral + mapa) */}
        <Route path="/narrative" element={<NarrativePage />} />
      </Routes>
    </BrowserRouter>
  );
}
