// src/redux/gallerySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRandomUnsplashImage } from '../services/unsplashService';

// Extraer imágenes guardadas o usar un array vacío
const savedImages = JSON.parse(localStorage.getItem('galleryImages')) || [];

// Extraer currentTag usando try/catch para manejar errores de JSON.parse
let savedTag;
try {
  savedTag = JSON.parse(localStorage.getItem('currentTag'));
} catch (error) {
  savedTag = localStorage.getItem('currentTag') || 'cats';
}
// Si el valor es un string, lo envolvemos en un array
if (typeof savedTag === 'string') {
  savedTag = [savedTag];
}

// Thunk que recibe un objeto { tag, reset } y busca imágenes usando getRandomUnsplashImage.
export const fetchImages = createAsyncThunk(
  'gallery/fetchImages',
  async ({ tag = ['cats'], reset = false } = {}) => {
    // Llamamos a la función con el tag; puede ser un array o un string
    const images = await getRandomUnsplashImage(tag);
    if (!images || images.length === 0) {
      return [{
        id: 'error',
        urls: {
          small: '/src/assets/fondo_error.jpg',
          full: '/src/assets/fondo_error.jpg',
        },
        alt_description: 'Error al cargar imagen',
      }];
    }
    return images.map((img) => ({
      // Si img.id se repite, se concatenará un valor aleatorio
      id: `${img.id}`,
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
  }
);

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    images: savedImages,
    currentTag: savedTag,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        // Revisamos si se pasó reset; de ser así, reemplazamos las imágenes
        const shouldReset = action.meta?.arg?.reset;
        // Pasó un nuevo tag lo utilizamos, de lo contrario usamos el actual
        const newTag = action.meta?.arg?.tag || state.currentTag;
        state.currentTag = newTag;

        if (shouldReset) {
          state.images = action.payload;
        } else {
          // Concatenar nuevas imágenes sin duplicados, usando el id original
          const existingIds = new Set(state.images.map(img => img.id));
          const newImages = action.payload.filter(img => !existingIds.has(img.id));
          state.images = [...state.images, ...newImages];
        }
        state.loading = false;
        // Guardamos en localStorage las imágenes y el tag, usando JSON.stringify
        localStorage.setItem('galleryImages', JSON.stringify(state.images));
        localStorage.setItem('currentTag', JSON.stringify(state.currentTag));
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default gallerySlice.reducer;
