import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';  // Added .js extension
import reportWebVitals from './reportWebVitals.js';  // Added .js extension

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();