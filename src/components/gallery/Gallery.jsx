import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchImages } from '../../redux/gallerySlice';
import ImageCard from '../imageCard/ImageCard';

const Gallery = ({ isFavourite = false, onDescriptionSave }) => {
  const dispatch = useDispatch();
  const { images, loading, error, currentTag } = useSelector((state) => state.gallery);

  // Al montar, si no hay imágenes, se inicia con el tag guardado (o 'cats' por defecto)
  useEffect(() => {
    if (images.length === 0) {
      dispatch(fetchImages({ tag: currentTag, reset: true }));
    }
  }, [dispatch, images.length, currentTag]);

  // Función para el scroll infinito
  // const handleScroll = useCallback(() => {
  //   const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  //   if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
  //     dispatch(fetchImages());
  //   }
  // }, [dispatch, loading]);

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [handleScroll]);

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