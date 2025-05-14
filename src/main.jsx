import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './styles/_global.scss';
import AppRoutes from './router/Routes';
import  store  from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter basename="/OnlyPhotos/"> {/* Añade basename aquí */}
      <AppRoutes />
    </BrowserRouter>
  </Provider>
);