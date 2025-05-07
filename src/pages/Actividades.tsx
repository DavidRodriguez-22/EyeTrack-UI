import React from 'react';
import ImageButton from "../components/ImageButton";
import '../styles/Home.css'; // Reutilizamos los estilos

export default function Actividades() {
  return (
    <div className="home-container">
      <h1 className="home-title">Actividades</h1> {/* Título específico */}

      <div className="grid-container">
        {/* Botones específicos para actividades */}
        <ImageButton 
          src="/images/television.png" 
          alt="Ver televisión" 
          to="/television" // O puedes usar "#" si no es una ruta real
        />
        <ImageButton 
          src="/images/musica.png" 
          alt="Escuchar música" 
          to="/musica" 
        />
        <ImageButton 
          src="/images/leer.png" 
          alt="Leer" 
          to="/leer" 
        />
        {/* Agrega más botones según necesites */}
      </div>
    </div>
  );
}