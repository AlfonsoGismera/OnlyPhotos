import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchImages } from './gallerySlice';
import { saveAs } from 'file-saver';
import fondo_error from '../../assets/fondo_error.jpg'; // Importa la imagen de error

const Gallery = () => {
  const dispatch = useDispatch();
  const { images, loading, error } = useSelector((state) => state.gallery);

  // Cargar imágenes al montar el componente si aún no hay imágenes
  useEffect(() => {
    if (images.length === 0) {
      dispatch(fetchImages());
    }
  }, [dispatch, images.length]);

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

  // Función para descargar la imagen
  const handleDownload = (url) => {
    saveAs(url, 'imagen.jpg');
  };

  return (
    <div>
      <h1>Galería de Imágenes</h1>
      {error && <p>Error: {error}</p>}
      <div className="gallery">
        {images && images.length > 0 ? (
          images.map((img) => (
            <div key={img.id}>
              <img
                src={img.urls.small} // Muestra la versión pequeña
                alt={img.alt_description || 'Imagen'}
                onClick={() => handleDownload(img.urls.full)}
                onError={(e) => {
                  e.target.onerror = null; // Previene bucles de error
                  e.target.src = fondo_error; // Reemplaza la imagen por defecto
                }}
              />
            </div>
          ))
        ) : (
          <p>No hay imágenes para mostrar.</p>
        )}
      </div>
      {loading && <p>Cargando más imágenes...</p>}
    </div>
  );
};

export default Gallery;
