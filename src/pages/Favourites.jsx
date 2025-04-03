import React from 'react';
import { Link } from 'react-router-dom';

function Favourites() {
  return (
    <div>
      <h1>Página de Favoritos</h1>
      <p>Aquí están tus imágenes guardadas.</p>
      <Link to="/">
        <button>Ir a Home</button>
      </Link>
    </div>
  );
}

export default Favourites;
