import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'; // Импортируем провайдер
import { store } from './store'; // Импортируем созданный store
import 'bootstrap/dist/css/bootstrap.min.css';
import { registerSW } from 'virtual:pwa-register';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

if ('serviceWorker' in navigator) {
  registerSW();
}
