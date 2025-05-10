import React from 'react';
import '../styles/VozButton.css';

interface VozButtonProps {
  src: string;
  alt: string;
  className?: string;
  color?: string; // Nuevo prop para el color
}

const VozButton: React.FC<VozButtonProps> = ({ src, alt, className, color }) => {
  const speak = () => {
    window.speechSynthesis.cancel();
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
      style={{ backgroundColor: color }} // Aplica el color aquí
    >
      <img src={src} alt={alt} className="voz-button-img" />
      <span className="voz-button-text">{alt}</span>
      <span className="voz-icon">🔊</span>
    </button>
  );
};

export default VozButton;