import React from 'react';
import ImageButton from "../components/ImageButton";
import '../styles/Home.css';

export default function Emociones() {
  return (
    <div className="home-container">
      <h1 className="home-title">Emociones</h1>

      <div className="grid-container">
        <ImageButton 
          src="/images/estoy-bien.png" 
          alt="Estoy bien" 
          to="/estoy-bien" 
        />
        <ImageButton 
          src="/images/quiero-estar-solo.png" 
          alt="Quiero estar solo" 
          to="/quiero-estar-solo" 
        />
        <ImageButton 
          src="/images/enojado.png" 
          alt="Estoy enojado" 
          to="/enojado" 
        />
        <ImageButton 
          src="/images/feliz.png" 
          alt="Estoy feliz" 
          to="/feliz" 
        />
        <ImageButton 
          src="/images/triste.png" 
          alt="Estoy triste" 
          to="/triste" 
        />
      </div>
    </div>
  );
}