// src/components/gallery/Gallery.jsx
import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchImages } from '../../redux/gallerySlice';
import ImageCard from '../imageCard/ImageCard';

const Gallery = ({ isFavourite = false, onDescriptionSave }) => {
  const dispatch = useDispatch();
  const { images, loading, error, currentTag } = useSelector((state) => state.gallery);

  // Al montar, si no hay imágenes, inicia la búsqueda con el tag guardado (array)
  useEffect(() => {
    if (images.length === 0) {
      dispatch(fetchImages({ tag: currentTag, reset: true }));
    }
  }, [dispatch, images.length, currentTag]);

  // Lógica para el scroll infinito
  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
      // Despacha la acción sin reset para concatenar imágenes
      dispatch(fetchImages({ tag: currentTag, reset: false }));
    }
  }, [dispatch, loading, currentTag]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="gallery">
      {error && <p>Error: {error}</p>}
      {images && images.length > 0 ? (
        images.map((img) => (
          <ImageCard
            key={img.id}
            img={img}
            isFavourite={isFavourite}
            onDescriptionSave={(newDesc) => onDescriptionSave(newDesc, img.id)}
          />
        ))
      ) : (
        <p>No hay imágenes para mostrar.</p>
      )}
      {loading && <p>Cargando más imágenes...</p>}
    </div>
  );
};

export default Gallery;
