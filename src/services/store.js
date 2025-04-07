import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from '../components/gallery/gallerySlice'; 

export const store = configureStore({
  reducer: {
    gallery: galleryReducer,
  },
});

export default store;
