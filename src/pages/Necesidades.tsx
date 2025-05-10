import React from 'react';
import VozButton from "../components/VozButton";
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

export default function Necesidades() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {}
      <button 
        onClick={() => navigate('/')}
        className="back-button"
        aria-label="Volver al menú principal"
      >
        <span className="back-icon">←</span> MENÚ PRINCIPAL
      </button>

      <h1 className="home-title">NECESIDADES</h1>

      <div className="grid-container">
        <VozButton 
          src="/images/hambre.gif" 
          alt="Tengo hambre, necesito comer" 
          className="necesidad-button"
          color="#ffae8c"
        />
        <VozButton 
          src="/images/sed.gif" 
          alt="Tengo sed, necesito una bebida" 
          className="necesidad-button"
          color="#ffae8c"
        />
        <VozButton 
          src="/images/inodoro.gif" 
          alt="Necesito ir al baño urgente" 
          className="necesidad-button"
          color="#ffae8c"
        />
        <VozButton 
          src="/images/medicina.gif" 
          alt="Necesito tomar mis medicinas" 
          className="necesidad-button"
          color="#ffae8c"
        />
        <VozButton 
          src="/images/descanso.gif" 
          alt="Necesito descansar un momento" 
          className="necesidad-button"
          color="#ffae8c"
        />
        
      </div>
    </div>
  );
}