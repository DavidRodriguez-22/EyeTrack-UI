import React from 'react';
import './ImageCard.css'; 

type Props = {
  image: string;
  text: string;
  onClick?: () => void;
};

const ImageCard: React.FC<Props> = ({ image, text, onClick }) => {
  return (
    <div className="image-card" onClick={onClick}>
      <img src={image} alt={text} />
      <p>{text}</p>
    </div>
  );
};

export default ImageCard;