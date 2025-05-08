import React from 'react';
import VozButton from "../components/VozButton";
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

export default function Necesidades() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Botón de regreso con estilo amarillo */}
      <button 
        onClick={() => navigate('/')}
        className="back-button"
        aria-label="Volver al menú principal"
      >
        <span className="back-icon">←</span> MENÚ PRINCIPAL
      </button>

      <h1 className="home-title">Necesidades</h1>

      <div className="grid-container">
        <VozButton 
          src="/images/hambre.png" 
          alt="Tengo hambre, necesito comer" 
          className="necesidad-button"
        />
        <VozButton 
          src="/images/sed.png" 
          alt="Tengo sed, necesito una bebida" 
          className="necesidad-button"
        />
        <VozButton 
          src="/images/banio.png" 
          alt="Necesito ir al baño urgente" 
          className="necesidad-button"
        />
        <VozButton 
          src="/images/medicina.png" 
          alt="Necesito tomar mis medicinas" 
          className="necesidad-button"
        />
        <VozButton 
          src="/images/descanso.png" 
          alt="Necesito descansar un momento" 
          className="necesidad-button"
        />
        <VozButton 
          src="/images/ayuda.png" 
          alt="Necesito ayuda por favor" 
          className="necesidad-button"
        />
      </div>
    </div>
  );
}