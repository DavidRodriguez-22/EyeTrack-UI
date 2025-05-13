import React from 'react';
import '../styles/VozButton.css';

interface VozButtonProps {
  src?: string;
  alt: string;
  className?: string;
  color?: string;
  text?: string;
}

const VozButton: React.FC<VozButtonProps> = ({ src, alt, className, color, text }) => {
  const speak = () => {
    // Detener cualquier síntesis de voz en curso
    window.speechSynthesis.cancel();
    
    // Crear el utterance con el texto que debe ser pronunciado
    const utterance = new SpeechSynthesisUtterance(text || alt);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9; // Velocidad ligeramente más lenta para mejor comprensión
    
    // Configurar el manejador de errores
    utterance.onerror = (event) => {
      console.error('Error en síntesis de voz:', event);
    };
    
    // Iniciar la síntesis de voz
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button 
      className={`voz-button ${className || ''}`} 
      onClick={speak}
      aria-label={`Decir: ${text || alt}`}
      style={{ backgroundColor: color }}
    >
      {/* Mostrar imagen solo si src está proporcionado */}
      {src && <img src={src} alt={alt} className="voz-button-img" />}
      
      {/* Mostrar texto del botón (alt) */}
      <span className="voz-button-text">{alt}</span>
      
      {/* Icono de altavoz */}
      <span className="voz-icon" role="img" aria-label="Altavoz">🔊</span>
    </button>
  );
};

export default VozButton;