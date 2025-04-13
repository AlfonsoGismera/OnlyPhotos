import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY, // Clave en variable de entorno
});

// Función de búsqueda por tag o tags
export const getRandomUnsplashImage = async (query = ['cats', 'dogs', 'nature', 'cities', 'portraits']) => {
  // Si query es un array, elegir uno de ellos al azar
  const tag = Array.isArray(query)
    ? query[Math.floor(Math.random() * query.length)]
    : query;
  
  // Genera un número de página aleatorio (por ejemplo, entre 1 y 10)
  const randomPage = Math.floor(Math.random() * 10) + 1;
  
  try {
    const result = await unsplash.search.getPhotos({
      query: tag,
      perPage: 25,
      page: randomPage, // Usamos una página aleatoria para variar los resultados
      // orientation: 'landscape', // Opcional
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
      console.error('No se encontraron imágenes para la búsqueda:', tag);
      return null;
    }
  } catch (error) {
    console.error('Error al buscar imágenes:', error);
    return null;
  }
};
