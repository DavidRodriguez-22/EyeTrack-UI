import React from 'react';
import ImageButton from "../components/ImageButton";
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">¿Que quieres comunicar?</h1>

      <div className="grid-container">
        <ImageButton src="/images/emergencias.png" alt="Emergencias" to="/Emergencias" />
        <ImageButton src="/images/necesidades.png" alt="Necesidades" to="/Necesidades" />
        <ImageButton src="/images/emociones.png" alt="Emociones" to="/Emociones" />
        <ImageButton src="/images/actividades.png" alt="Actividades" to="/Actividades" />
        <ImageButton src="/images/comunicacion.png" alt="Comunicación" to="/Comunicacion" />
        <ImageButton src="/images/comodidad.png" alt="Comodidad" to="/Comodidad" />
      </div>
    </div>
  );
}
