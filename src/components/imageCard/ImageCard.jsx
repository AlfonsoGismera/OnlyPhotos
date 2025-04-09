import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import LikeButton from '../buttons/ButtonLike';
import DownloadButton from '../buttons/ButtonDownload';
import DeleteButton from '../buttons/ButtonDelete';
import EditButton from '../buttons/ButtonEdit';
import ImageModal from '../modals/ImageModal';
import fondo_error from '../../assets/fondo_error.jpg';
import { addFavourite, removeFavourite } from '../../redux/favouritesSlice';
import './ImageCard.scss';

const ImageCard = ({ img, isFavourite, onDescriptionSave }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  // Like
  const handleLike = (e) => {
    e.stopPropagation(); // Evita que se abra el modal al hacer clic en like
    dispatch(addFavourite(img));
    console.log(`Liked image with ID: ${img.id}`);
  };

  // Delete
  const handleDelete = (e) => {
    e.stopPropagation(); 
    dispatch(removeFavourite(img.id));
    console.log(`Deleted image with ID: ${img.id}`);
  };

  // Edit description
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
          {isFavourite && (
            <EditButton onClick={() => setModalOpen(true)} />
          )}
          {/* Si es favorito, muestra el botón de eliminar, si no, muestra el de like */}
          {isFavourite ? (
            <DeleteButton onClick={handleDelete} />
          ) : (
            <LikeButton onClick={handleLike} />
          )}
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
      {isFavourite && (
        <div className="description-overlay">
          <p className="image-description">{img.alt_description || 'Sin descripción'}</p>
        </div>
      )}
    </div>
  );
};

export default ImageCard;
