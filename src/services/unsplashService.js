import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY, 
});

// Función de búsqueda por tag 
export const getRandomUnsplashImage = async (query = 'cats') => {
  try {
    const result = await unsplash.search.getPhotos({
      query,
      perPage: 15,
      // orientation: 'landscape', // Descomenta si lo necesitas
    });

    if (result.response && result.response.results.length > 0) {
      return result.response.results.map((img) => ({
        id: img.id,
        urls: {
          small: img.urls.small,
          full: img.urls.full,
        },
        alt_description: img.alt_description || 'Imagen sin descripción',
        likes: img.likes,
        created_at: img.created_at,
        width: img.width,
        height: img.height,
      }));
    } else {
      console.error('No se encontraron imágenes para la búsqueda:', query);
      return null;
    }
  } catch (error) {
    console.error('Error al buscar imágenes:', error);
    return null;
  }
};
