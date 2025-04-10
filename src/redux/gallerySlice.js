import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRandomUnsplashImage } from '../services/unsplashService';

// Thunk que recibe un objeto { tag, reset } y busca imágenes usando getRandomUnsplashImage.
export const fetchImages = createAsyncThunk(
  'gallery/fetchImages',
  async ({ tag = 'cats', reset = false } = {}) => { 
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
    return images;
  }
);

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    images: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Reducers adicionales si los necesitas.
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        // Usamos optional chaining para leer reset de forma segura.
        const shouldReset = action.meta?.arg?.reset;
        if (shouldReset) {
          state.images = action.payload;
        } else {
          // Concatenar sin duplicados
          const existingIds = new Set(state.images.map(img => img.id));
          const newImages = action.payload.filter(img => !existingIds.has(img.id));
          state.images = [...state.images, ...newImages];
        }
        state.loading = false;
        localStorage.setItem('galleryImages', JSON.stringify(state.images));
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default gallerySlice.reducer;