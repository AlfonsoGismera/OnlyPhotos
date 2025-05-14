import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchImages } from '../../redux/gallerySlice';
import ImageCard from '../imageCard/ImageCard';
import ScrollTopButton from '../buttons/ScrollTopButton';

const Gallery = ({ isFavourite = false, onDescriptionSave }) => {
  const dispatch = useDispatch();
  const { images, loading, error, currentTag } = useSelector((state) => state.gallery);

  useEffect(() => {
    // Comprueba si hay una búsqueda activa (currentTag tiene un valor)
    if (!currentTag) {
      // Si no hay búsqueda activa, inicia la búsqueda de "MADRID"
      dispatch(fetchImages({ tag: 'MADRID', reset: true }));
    } else if (images.length === 0) {
      // Si hay un currentTag pero no hay imágenes, intenta cargar con ese tag
      dispatch(fetchImages({ tag: currentTag, reset: true }));
    }
  }, [dispatch, images.length, currentTag]);

  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
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

      {/* Botón fijo para volver al inicio */}
      <ScrollTopButton />
    </div>
  );
};

export default Gallery;