import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { registerSW } from 'virtual:pwa-register';
import { FilterProvider } from './context/FilterContext';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <FilterProvider> {/* Оборачиваем приложение в FilterProvider */}
      <App />
    </FilterProvider>
  </React.StrictMode>
);

if ('serviceWorker' in navigator) {
  registerSW();
}
