import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import AuthProvider from './context/AuthProvider.jsx';
import { LocationProvider } from './context/CitiesAndRegions.jsx';
import { LinksProvider } from './context/storeLinks.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <LocationProvider>
        <LinksProvider>
          <App />
        </LinksProvider>
      </LocationProvider>
    </AuthProvider>
  </React.StrictMode>
);
