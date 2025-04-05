// src/components/ImageCard.jsx
import React, { useState } from 'react';
import LikeButton from '../buttons/ButtonLike';
import DownloadButton from '../buttons/ButtonDownload';  
import './ImageCard.scss';


const ImageCard = ({ img }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = () => {
    // Prueba la funcionalidad de Lke
    console.log(`Like a la imagen con ID: ${img.id}`);

  };

  return (
    <div
      className="image-card-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={img.urls.small}
        alt={img.alt_description || 'Imagen'}
        onError={(e) => {
          e.target.onerror = null; // Evita bucle infinito
        }}
      />
      {isHovered && (
        <div className="overlay">
          <DownloadButton imageUrl={img.urls.full} filename={`${img.id}.jpg`} />
          <LikeButton onClick={handleLike} />
        </div>
      )}
    </div>
  );
};

export default ImageCard;