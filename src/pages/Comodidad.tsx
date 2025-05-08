import React from 'react';
import VozButton from "../components/VozButton";
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../styles/Home.css';

export default function Comodidad() {
  const navigate = useNavigate(); // Obtiene la función de navegación

  return (
    <div className="home-container">
      {/* Botón de regreso */}
      <button 
        onClick={() => navigate('/')} // Navega a Home
        className="back-button"
        aria-label="Volver al menú principal"
      >
        <span className="back-icon">←</span> MENÚ PRINCIPAL
      </button>

      <h1 className="home-title">Comodidad</h1>

      <div className="grid-container">
        <VozButton 
          src="/images/frio.png" 
          alt="Tengo frío, quiero un abrigo" 
          className="comodidad-button"
        />
        <VozButton 
          src="/images/calor.png" 
          alt="Tengo calor, quiero refrescarme" 
          className="comodidad-button"
        />
        <VozButton 
          src="/images/posicion.png" 
          alt="Quiero cambiar de posición" 
          className="comodidad-button"
        />
        <VozButton 
          src="/images/dolor.png" 
          alt="Me duele algo" 
          className="comodidad-button"
        />
        <VozButton 
          src="/images/pica.png" 
          alt="Me pica una parte del cuerpo" 
          className="comodidad-button"
        />
        <VozButton 
          src="/images/descansar.png" 
          alt="Quiero descansar" 
          className="comodidad-button"
        />
      </div>
    </div>
  );
}