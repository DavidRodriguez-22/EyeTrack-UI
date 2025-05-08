import React from 'react';
import VozButton from "../components/VozButton";
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../styles/Home.css';

export default function Emociones() {
  const navigate = useNavigate(); // Obtiene la función de navegación

  return (
    <div className="home-container">
      {/* Botón de regreso */}
      <button 
        onClick={() => navigate('/')}
        className="back-button"
        aria-label="Volver al menú principal"
      >
        <span className="back-icon">←</span> MENÚ PRINCIPAL
      </button>

      <h1 className="home-title">Emociones</h1>

      <div className="grid-container">
        <VozButton 
          src="/images/estoy-bien.png" 
          alt="Estoy bien" 
        />
        <VozButton 
          src="/images/quiero-estar-solo.png" 
          alt="Quiero estar solo" 
        />
        <VozButton 
          src="/images/enojado.png" 
          alt="Estoy enojado" 
        />
        <VozButton 
          src="/images/feliz.png" 
          alt="Estoy feliz" 
        />
        <VozButton 
          src="/images/triste.png" 
          alt="Estoy triste" 
        />
      </div>
    </div>
  );
}