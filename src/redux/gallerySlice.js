import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRandomUnsplashImage } from '../services/unsplashService';

// Extraer datos de localStorage o usar valores por defecto
const savedImages = JSON.parse(localStorage.getItem('galleryImages')) || [];
const savedTag = localStorage.getItem('currentTag') || 'cats';

// Thunk que recibe un objeto { tag, reset } y busca imágenes usando getRandomUnsplashImage.
export const fetchImages = createAsyncThunk(
  'gallery/fetchImages',
  async ({ tag = 'cats', reset = false } = {}) => {
    // Usamos la función con el tag
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
        // Revisa si se pasó reset; si es así, reemplaza la galería y actualiza el tag
        const shouldReset = action.meta?.arg?.reset;
        const newTag = action.meta?.arg?.tag || state.currentTag;
        state.currentTag = newTag;

        if (shouldReset) {
          state.images = action.payload;
        } else {
          // Concatenar nuevas imágenes sin duplicados
          const existingIds = new Set(state.images.map(img => img.id));
          const newImages = action.payload.filter(img => !existingIds.has(img.id));
          state.images = [...state.images, ...newImages];
        }
        state.loading = false;
        // Guardar en localStorage tanto las imágenes como el tag actual
        localStorage.setItem('galleryImages', JSON.stringify(state.images));
        localStorage.setItem('currentTag', state.currentTag);
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default gallerySlice.reducer;
