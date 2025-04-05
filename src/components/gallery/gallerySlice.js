// src/components/gallery/gallerySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRandomUnsplashImage } from '../../services/unsplashService';

// Thunk que recibe un tag (query) y busca imágenes relacionadas
export const fetchImages = createAsyncThunk('gallery/fetchImages', async (tag = 'nature') => {
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
});

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    images: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Aquí puedes agregar más reducers si los necesitas
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.images = [...state.images, ...action.payload];
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
