import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ImageButton.css';

interface ImageButtonProps {
  src: string;
  alt: string;
  to: string;
  color?: string;
}

export default function ImageButton({ src, alt, to, color = "#da8585" }: ImageButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => navigate(to);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className="image-button"
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={alt}
      style={{ 
        backgroundColor: color,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '16px',
        padding: '16px',
        margin: '12px',
        cursor: 'pointer',
        transition: 'transform 0.2s ease'
      }}
    >
      <img src={src} alt={alt} className="image-button-img" />
      <span className="image-button-text">{alt}</span>
    </div>
  );
}