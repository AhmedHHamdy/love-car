import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a new context
const LocationContext = createContext();

// Create a provider component
export const LocationProvider = ({ children }) => {
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/get-regions`)
      .then(res => {
        setRegions(res.data.data.regions);
      })
      .catch(err => {
        setErrMsg(err.message);
      });
  }, []);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/get-cities`)
      .then(res => {
        setCities(res.data.data.cities);
      })
      .catch(err => {
        setErrMsg(err.message);
      });
  }, []);

  return (
    <LocationContext.Provider value={{ regions, cities, errMsg }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
