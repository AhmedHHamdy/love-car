import React, { createContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

// Create a new context
const LocationContext = createContext();

// Create a provider component
export const LocationProvider = ({ children }) => {
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [errMsg, setErrMsg] = useState('');

  const { i18n } = useTranslation()

  const contextValue = useMemo(() => ({
    regions,
    cities,
    errMsg
  }), [regions, cities, errMsg]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/get-regions`, {
      headers: {
        lang: i18n.language
      }
    })
      .then(res => {
        setRegions(res.data.data.regions);
      })
      .catch(err => {
        setErrMsg(err.message);
      });
  }, [i18n.language]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/get-cities`, {
      headers: {
          lang: i18n.language
        }
    })
      .then(res => {
        setCities(res.data.data.cities);
      })
      .catch(err => {
        setErrMsg(err.message);
      });
  }, [i18n.language]);

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
