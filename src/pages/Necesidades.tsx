import React from 'react';
import ImageButton from "../components/ImageButton";
import '../styles/Home.css'; // Reutiliza estilos o crea uno nuevo

export default function Necesidades() {
  return (
    <div className="home-container">
      <h1 className="home-title">Necesidades</h1> {/* Título específico */}

      <div className="grid-container">
        
        <ImageButton 
          src="/images/hambre.png" 
          alt="Tengo hambre" 
          to="/hambre" 
        />
        <ImageButton 
          src="/images/sed.png" 
          alt="Tengo sed" 
          to="/sed" 
        />
        {/* Agrega más botones según necesites */}
      </div>
    </div>
  );
}