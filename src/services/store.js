import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from '../components/gallery/gallerySlice'; // Asegúrate de que la ruta es correcta

export const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    // Puedes agregar otros reducers aquí si lo necesitas
  },
});

export default store;
