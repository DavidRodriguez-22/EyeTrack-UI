import React from 'react';
import VozButton from "../components/VozButton";
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

export default function Actividades() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Botón de regreso */}
      <button onClick={() => navigate('/')} className="back-button">
       <span className="back-icon">←</span> MENÚ PRINCIPAL
      </button>

      <h1 className="home-title">ACTIVIDADES</h1>

      <div className="grid-container">
        <VozButton 
          src="/images/tv.gif" 
          alt="Quiero ver televisión" 
          color="#ffe77e"
        />
        <VozButton 
          src="/images/musica.gif" 
          alt="Quiero escuchar música"
          color="#ffe77e" 
        />
        <VozButton 
          src="/images/leer.gif" 
          alt="Quiero leer un libro" 
          color="#ffe77e"
        />
        <VozButton 
          src="/images/audiolibro.gif" 
          alt="Quiero escuchar un audio libro" 
          color="#ffe77e"
        />
        <VozButton 
          src="/images/sol.gif" 
          alt="Quiero tomar un poco de sol" 
          color="#ffe77e"
        />
        <VozButton 
          src="/images/fisica.gif" 
          alt="Quiero realizar un poco de fisioterapia" 
          color="#ffe77e"
        />
      </div>
    </div>
  );
}