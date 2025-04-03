import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './App.css';
import './styles/Global.css';

function App() {
  return (
    <div>
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
