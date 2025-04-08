// src/features/favourites/favouritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Carga las imágenes favoritas guardadas en localStorage o usa un array vacío
const initialState = {
  favourites: JSON.parse(localStorage.getItem('favourites')) || [],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      // Evita duplicados
      const exists = state.favourites.find(item => item.id === action.payload.id);
      if (!exists) {
        state.favourites.push(action.payload);
        localStorage.setItem('favourites', JSON.stringify(state.favourites));
      }
    },
    removeFavourite: (state, action) => {
      state.favourites = state.favourites.filter(item => item.id !== action.payload);
      localStorage.setItem('favourites', JSON.stringify(state.favourites));
    },
    updateFavouriteDescription: (state, action) => {
      const { id, description } = action.payload;
      const fav = state.favourites.find(item => item.id === id);
      if (fav) {
        fav.alt_description = description;
        localStorage.setItem('favourites', JSON.stringify(state.favourites));
      }
    }
  },
});

export const { addFavourite, removeFavourite, updateFavouriteDescription } = favouritesSlice.actions;
export default favouritesSlice.reducer;
