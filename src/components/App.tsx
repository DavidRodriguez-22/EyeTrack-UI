import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Necesidades from "../pages/Necesidades";
import Actividades from "../pages/Actividades";
import Comodidad from "../pages/Comodidad";
import Emociones from "../pages/Emociones"; 
import Emergencia from "../pages/Emergencias";
import Comunicacion from '../pages/Comunicacion';
import EyeControl from "../components/EyeControl"; 

const App: React.FC = () => {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/necesidades" element={<Necesidades />} /> 
        <Route path="/actividades" element={<Actividades />} /> 
        <Route path="/comodidad" element={<Comodidad />} />
        <Route path="/emociones" element={<Emociones />} /> 
        <Route path="/emergencias" element={<Emergencia />} />
        <Route path="/comunicacion" element={<Comunicacion />} />
      </Routes>
    </Router>
  );
};

export default App;