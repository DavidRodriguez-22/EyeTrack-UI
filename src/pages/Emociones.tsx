import React from 'react';
import VozButton from "../components/VozButton";
import { useNavigate } from 'react-router-dom'; 
import '../styles/Home.css';

export default function Emociones() {
  const navigate = useNavigate(); 

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

      <h1 className="home-title">EMOCIONES</h1>

      <div className="grid-container">
        <VozButton 
          src="/images/estoybien.gif" 
          alt="Estoy bien" 
          color="#9d85ff"
        />
        <VozButton 
          src="/images/solo.gif" 
          alt="Quiero estar solo" 
          color="#9d85ff"
        />
        <VozButton 
          src="/images/enojado.gif" 
          alt="Estoy enojado" 
          color="#9d85ff"
        />
        <VozButton 
          src="/images/feliz.gif" 
          alt="Estoy feliz" 
          color="#9d85ff"
        />
        <VozButton 
          src="/images/triste.gif" 
          alt="Estoy triste" 
          color="#9d85ff"
        />
      </div>
    </div>
  );
}