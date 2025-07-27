import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { store } from './Store/store';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <GoogleOAuthProvider clientId="539023670618-qj0qf966qebp82gobjvq00a8bbnevs11.apps.googleusercontent.com">
        
          <App />
        </GoogleOAuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
