import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: 'NycOqabIg11uxpFrmAsmOExL0IL0VIo8y_9s8JIetkM',
});

//  búsqueda con un tag
export const getRandomUnsplashImage = async (query = 'cats') => {
  try {
    const result = await unsplash.search.getPhotos({
      query,
      perPage: 15,
      //  orientation: 'landscape',
    });

    if (result.response && result.response.results.length > 0) {
      return result.response.results.map((img) => ({
        id: img.id,
        urls: {
          small: img.urls.small,
          full: img.urls.full,
        },
        alt_description: img.alt_description || 'Imagen sin descripción',
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
