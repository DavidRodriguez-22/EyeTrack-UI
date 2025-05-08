import React from 'react';
import '../styles/VozButton.css'; // Crearemos este archivo de estilos

interface VozButtonProps {
  src: string;
  alt: string;
  className?: string;
}

const VozButton: React.FC<VozButtonProps> = ({ src, alt, className }) => {
  const speak = () => {
    // Detener cualquier voz previa
    window.speechSynthesis.cancel();
    
    // Configurar y reproducir el nuevo mensaje
    const utterance = new SpeechSynthesisUtterance(alt);
    utterance.lang = 'es-ES';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button 
      className={`voz-button ${className || ''}`} 
      onClick={speak}
      aria-label={`Decir: ${alt}`}
    >
      <img src={src} alt={alt} className="voz-button-img" />
      <span className="voz-button-text">{alt}</span>
      <span className="voz-icon">🔊</span> {/* Icono de altavoz */}
    </button>
  );
};

export default VozButton;