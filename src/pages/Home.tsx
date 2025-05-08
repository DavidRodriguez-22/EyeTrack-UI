import React from 'react';
import ImageButton from "../components/ImageButton";
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">¿QUE QUIERES COMUNICAR?</h1>

      <div className="grid-container">
        <ImageButton src="/images/emergencias.png" alt="" to="/Emergencias"  color="#ff72dc"/>
        <ImageButton src="/images/necesidades.png" alt="" to="/Necesidades" color="#ff8450"/>
        <ImageButton src="/images/emociones.png" alt="" to="/Emociones" color="#7251f8"/>
        <ImageButton src="/images/actividades.png" alt="" to="/Actividades" color="#ffdf56"/>
        <ImageButton src="/images/comunicacion.png" alt="" to="/Comunicacion" color="#57fff5"/>
        <ImageButton src="/images/comodidad.png" alt="" to="/Comodidad" color="#69ff57"/>
      </div>
    </div>
  );
}
