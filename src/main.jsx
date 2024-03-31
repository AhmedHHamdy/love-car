import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthProvider from './context/AuthProvider.jsx'
import { LocationProvider } from './context/CitiesAndRegions.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <LocationProvider>
      <App />
      </LocationProvider>
    </AuthProvider>
  </React.StrictMode>,
)
