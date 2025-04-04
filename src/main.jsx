import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/_global.scss';
import AppRoutes from './router/Routes'; 


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppRoutes /> 
  </BrowserRouter>
);