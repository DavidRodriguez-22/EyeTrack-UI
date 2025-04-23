import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ImageButton.css';

export default function ImageButton({ src, alt, to }) {
  const navigate = useNavigate();

  const handleClick = () => navigate(to);
  const handleKeyDown = (e) => {
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
    >
      <img src={src} alt={alt} className="image-button-img" />
      <span className="image-button-text">{alt}</span>
    </div>
  );
}
