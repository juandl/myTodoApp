import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { SnackbarProvider } from 'notistack';

//Styles Global
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/base.scss';

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
