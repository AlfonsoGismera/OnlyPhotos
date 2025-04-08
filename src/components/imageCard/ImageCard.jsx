import React, { useState } from 'react';
import LikeButton from '../buttons/ButtonLike';
import DownloadButton from '../buttons/ButtonDownload';
import ImageModal from '../modals/ImageModal';
import fondo_error from '../../assets/fondo_error.jpg';
import './ImageCard.scss';

const ImageCard = ({ img, isFavourite, onDescriptionSave }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleLike = () => {
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
        onClick={() => { 
          console.log("Clic en la imagen: abriendo modal");
          setModalOpen(true);
        }}
        onError={(e) => {
          e.target.onerror = null; 
          e.target.src = fondo_error;
        }}
      />
          {isHovered && (
              <div className="overlay">
                <DownloadButton imageUrl={img.urls.full} filename={`${img.id}.jpg`} />
                <LikeButton onClick={handleLike} />
              </div>
          )}
      {modalOpen && (
        <ImageModal
          image={img}
          isFavourite={isFavourite}
          initialDescription={img.alt_description}
          onSave={onDescriptionSave}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ImageCard;
