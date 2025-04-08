import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from '../components/gallery/gallerySlice'; 
import favouritesReducer from '../features/favourites/favouritesSlice';

const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    favourites: favouritesReducer,
  },
});

export default store;
