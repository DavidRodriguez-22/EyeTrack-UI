import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Necesidades from "../pages/Necesidades";
import Actividades from "../pages/Actividades";
import Comodidad from "../pages/Comodidad";
import Emociones from "../pages/Emociones"; 
import Emergencia from "../pages/Emergencias";// Asegúrate de importar la página
import EyeControl from "../components/EyeControl"; // Si lo usas

const App: React.FC = () => {
  return (
    <Router>
      <EyeControl /> {/* Componente opcional (si es global) */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/necesidades" element={<Necesidades />} /> 
        <Route path="/actividades" element={<Actividades />} /> 
        <Route path="/comodidad" element={<Comodidad />} />
        <Route path="/emociones" element={<Emociones />} /> 
        <Route path="/emergencias" element={<Emergencia />} />
        {/* Nueva ruta */}
      </Routes>
    </Router>
  );
};

export default App;