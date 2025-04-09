import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from './gallerySlice'; 
import favouritesReducer from './favouritesSlice';

const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    favourites: favouritesReducer,
  },
});

export default store;
