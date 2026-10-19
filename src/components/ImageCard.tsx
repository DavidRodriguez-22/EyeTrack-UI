// src/components/ImageCard.tsx
import React from 'react';

interface ImageCardProps {
  src: string;
  alt: string;
  text: string;
  color?: string;
}

export default function ImageCard({ src, alt, text, color = "#f3b696" }: ImageCardProps) {
  // Función para reproducir el texto por los altavoces
  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      data-interactive="true" // <-- Convierte la tarjeta entera en un imán
      onClick={handleSpeak}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSpeak();
        }
      }}
      style={{
        backgroundColor: color,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '16px',
        padding: '2vh 1vw',
        width: '100%',
        height: '100%',
        minHeight: 0,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        boxSizing: 'border-box',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}
    >
      {/* Es vital agregar pointer-events: none para que el imán no se confunda y se adhiera a la imagen en lugar de la tarjeta */}
      <img 
        src={src} 
        alt={alt} 
        style={{
          width: '90%',
          maxHeight: '65%',
          objectFit: 'contain',
          marginBottom: '1.5vh',
          pointerEvents: 'none' // <-- Evita que el rastreo ocular detecte la imagen sola
        }}
      />
      <h3 
        style={{ 
          fontSize: 'clamp(1rem, 2.5vh, 22px)', 
          textAlign: 'center', 
          color: '#1a1a1a', 
          margin: 0,
          pointerEvents: 'none' // <-- Evita que el rastreo ocular detecte el texto solo
        }}
      >
        {text}
      </h3>
    </div>
  );
}