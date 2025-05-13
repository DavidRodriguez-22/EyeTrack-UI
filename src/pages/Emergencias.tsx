import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Emergencia.css';

export default function Emergencia() {
  const navigate = useNavigate();
  const [audioPlaying, setAudioPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Función para alternar el estado del audio
  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Error al reanudar audio:", e));
      }
      setAudioPlaying(!audioPlaying);
    }
  };

  // Intenta reproducir al cargar (con manejo de errores)
  useEffect(() => {
    const tryPlay = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.7;
          await audioRef.current.play();
          setAudioPlaying(true);
        }
      } catch (err) {
        console.log("Autoplay bloqueado:", err);
        setAudioPlaying(false);
        
        const handleUserInteraction = () => {
          if (audioRef.current && !audioPlaying) {
            audioRef.current.play();
            setAudioPlaying(true);
          }
          document.removeEventListener('click', handleUserInteraction);
        };
        
        document.addEventListener('click', handleUserInteraction);
      }
    };

    tryPlay();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <div className="emergencia-container">
      {}
      <button 
        onClick={() => navigate('/')}
        className="back-button"
        aria-label="Volver al menú principal"
      >
        <span className="back-icon">←</span> MENÚ PRINCIPAL
      </button>

      {}
      <audio ref={audioRef} loop preload="auto">
        <source src="/sonidos/ambulancia.mp3" type="audio/mpeg" />
        Tu navegador no soporta audio HTML5.
      </audio>

      {}
      <h1 className="emergencia-title">¡EMERGENCIA!</h1>
      
      <div className="emergencia-content">
        <img 
          src="/images/alarma.gif"
          alt="Icono de alarma" 
          className="emergencia-image"
        />
        <p className="emergencia-text">Se ha activado la alerta de emergencia</p>
        
        <button 
          onClick={toggleAudio}
          className={`audio-control ${audioPlaying ? 'active' : ''}`}
          aria-label={audioPlaying ? 'Silenciar sirena' : 'Activar sirena'}
        >
          {audioPlaying ? (
            <>
              <span className="icon">🔕</span> Silenciar sirena
            </>
          ) : (
            <>
              <span className="icon">🔔</span> Activar sirena
            </>
          )}
        </button>
      </div>
    </div>
  );
}