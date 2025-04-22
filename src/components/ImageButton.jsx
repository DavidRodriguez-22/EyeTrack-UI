import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ImageButton({ src, alt, to }) {
  const navigate = useNavigate();

  return (
    <img
      src={src}
      alt={alt}
      className="cursor-pointer w-32 h-32 object-cover m-4"
      onClick={() => navigate(to)}
    />
  );
}
