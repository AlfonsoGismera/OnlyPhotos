import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Favourites from '../pages/Favourites';
import App from '../App';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}> 
        <Route index element={<Home />} /> 
        <Route path="favourites" element={<Favourites />} /> 
      </Route>
    </Routes>
  );
}

export default AppRoutes;