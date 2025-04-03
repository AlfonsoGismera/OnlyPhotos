import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Página Home</h1>
      <p>Bienvenido a la aplicación de gestión de imágenes.</p>
      <Link to="/favourites">
        <button>Ir a Favourites</button>
      </Link>
    </div>
  );
}

export default Home;
