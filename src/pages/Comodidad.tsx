import React from 'react';
import ImageButton from "../components/ImageButton";
import '../styles/Home.css'; // Reutilizamos los estilos

export default function Comodidad() {
  return (
    <div className="home-container">
      <h1 className="home-title">Comodidad</h1>

      <div className="grid-container">
        <ImageButton 
          src="/images/frio.png" 
          alt="Tengo frío" 
          to="/frio" // O acción personalizada
        />
        <ImageButton 
          src="/images/calor.png" 
          alt="Tengo calor" 
          to="/calor" 
        />
        <ImageButton 
          src="/images/posicion.png" 
          alt="Cambiar de posición" 
          to="/cambiar-posicion" 
        />
        {/* Puedes agregar más botones aquí */}
      </div>
    </div>
  );
}