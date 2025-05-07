/*import React, { useEffect, useRef } from 'react';
import '../styles/Emergencia.css'; // Crearemos este archivo CSS

export default function Emergencia() {
  const audioRef = useRef<HTMLAudioElement>(null);

  // Reproduce el sonido al cargar la página
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Error al reproducir audio:", e));
    }
    
    // Opcional: Detener al salir de la página
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="emergencia-container">
      <audio ref={audioRef} loop>
        <source src="/sounds/alarma.mp3" type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio>

      <h1 className="emergencia-title">¡EMERGENCIA!</h1>
      
      <div className="emergencia-content">
        <img 
          src="/images/emergencia-icon.png" 
          alt="Icono de emergencia" 
          className="emergencia-image"
        />
        <p className="emergencia-text">Se ha alertado a los contactos de emergencia</p>
      </div>
    </div>
  );
}/*}