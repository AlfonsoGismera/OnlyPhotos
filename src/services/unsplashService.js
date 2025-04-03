// services/unsplashService.js

import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: 'NycOqabIg11uxpFrmAsmOExL0IL0VIo8y_9s8JIetkM',
});

export const getRandomUnsplashImage = async () => {
  try {
    const result = await unsplash.photos.getRandom({
      count: 1,
    });

    if (result.response) {
      // Verificar si la respuesta contiene una imagen
      if (result.response[0].urls && result.response[0].urls.regular) {
        return result.response[0].urls.regular;
      } else {
        console.error('La respuesta de Unsplash no contiene una URL de imagen válida.');
        return null;
      }
    } else {
      console.error('Error al obtener la imagen de Unsplash:', result.errors);
      return null;
    }
  } catch (error) {
    console.error('Error al obtener la imagen:', error);
    return null;
  }
};