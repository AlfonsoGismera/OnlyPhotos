import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './ImageModal.scss';

const ImageModal = ({ image, isFavourite, initialDescription, onSave, onClose }) => {
  const [description, setDescription] = useState(initialDescription || '');
  const maxLength = 60; // Limita a un máximo de 60 caracteres para evitar desbordamiento


  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        onClose();
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        {isFavourite ? (
          <>
            <img src={image.urls.full} alt={image.alt_description || 'Imagen'} />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Editar descripción..."
              maxLength={maxLength} 
            />
            <p className="character-count">
              {description.length} / {maxLength} caracteres
            </p>
            <button
              onClick={() => {
                onSave(description, image.id);
                onClose();
              }}
              className="btn-save">
              Guardar
            </button>
          </>
        ) : (
          <img src={image.urls.full} alt={image.alt_description || 'Imagen'} />
        )}
      </div>
    </div>,
    document.getElementById('modal-root') 
  );
};

export default ImageModal;
