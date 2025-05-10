import React from 'react';
import VozButton from "../components/VozButton";
import { useNavigate } from 'react-router-dom'; 
import '../styles/Home.css';

export default function Comodidad() {
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

      <h1 className="home-title">COMODIDAD</h1>

      <div className="grid-container">
        <VozButton 
          src="/images/frio.gif" 
          alt="Tengo frío" 
          className="comodidad-button"
          color="#a6ff9b"
        />
        <VozButton 
          src="/images/calor.gif" 
          alt="Tengo calor" 
          className="comodidad-button"
          color="#a6ff9b"
        />
        <VozButton 
          src="/images/posicion.gif" 
          alt="Quiero cambiar de posición" 
          className="comodidad-button"
          color="#a6ff9b"
        />
        <VozButton 
          src="/images/dolor.gif" 
          alt="Me duele algo" 
          className="comodidad-button"
          color="#a6ff9b"
        />
        <VozButton 
          src="/images/pica.gif" 
          alt="Me pica una parte del cuerpo" 
          className="comodidad-button"
          color="#a6ff9b"
        />
        <VozButton 
          src="/images/descansar.gif" 
          alt="Quiero descansar" 
          className="comodidad-button"
          color="#a6ff9b"
        />
      </div>
    </div>
  );
}