import "../scss/main.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import NarrativePage from "./NarrativePage"; // ← archivo que ya creamos

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal, donde está tu plataforma actual */}
        <Route path="/" element={<Layout />} />

        {/* Nueva ruta para la página narrativa */}
        <Route path="/narrative" element={<NarrativePage />} />
      </Routes>
    </BrowserRouter>
  );
}
