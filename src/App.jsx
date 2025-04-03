import React from 'react';
import { Outlet, Link } from 'react-router-dom';




function App() {
  return (
    <div>
       <h1>Mi Layout</h1>  
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/favourites">Favourites</Link></li>
        </ul>
      </nav>
      {/* Aquí se renderizarán las páginas */}
      <Outlet />
    </div>
  );
}

export default App;
