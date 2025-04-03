import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/Global.css';
import AppRoutes from './router/Routes'; // Importa las rutas
// import App from './App'; // Ya no necesitamos importar App aquí directamente

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppRoutes /> {/* Renderiza el componente que contiene la configuración de las rutas */}
  </BrowserRouter>
);