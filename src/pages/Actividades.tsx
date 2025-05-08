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

      <h1 className="home-title">Actividades</h1>

      <div className="grid-container">
        <VozButton 
          src="/images/television.png" 
          alt="Quiero ver televisión" 
        />
        <VozButton 
          src="/images/musica.png" 
          alt="Quiero escuchar música" 
        />
        <VozButton 
          src="/images/leer.png" 
          alt="Quiero leer un libro" 
        />
        <VozButton 
          src="/images/audiolibro.png" 
          alt="Quiero escuchar un audio libro" 
        />
      </div>
    </div>
  );
}