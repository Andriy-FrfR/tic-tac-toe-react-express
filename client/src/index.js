import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ProvideModals from './contexts/modals/ProvideModals';
import ProvideTicTacToe from './contexts/ticTacToe/ProvideTicTacToe';
import 'materialize-css/dist/js/materialize.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProvideModals>
      <ProvideTicTacToe>
        <App />
      </ProvideTicTacToe>
    </ProvideModals>
  </React.StrictMode>
);

reportWebVitals();
