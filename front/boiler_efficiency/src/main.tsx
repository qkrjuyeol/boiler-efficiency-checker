import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Log to verify that main.tsx is being executed
console.log("main.tsx script is loaded");

// Mounting the App component to the root element
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
