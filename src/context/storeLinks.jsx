import { useState, useEffect, createContext } from "react";
import axios from 'axios';

const LinksContext = createContext()

export const LinksProvider = ({ children }) => {
  const [links, setLinks] = useState([])
  const [errMsg, setErrMsg] = useState('');

  const contextValue = {
    storeLinks: links,
    errMsg
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/staticPages`)
          .then(res => {
            setLinks(res.data.data)
          })
          .catch(err => {
            setErrMsg(err.message);
          })
  }, [])

  return (
    <LinksContext.Provider value={contextValue}>
      {children}
    </LinksContext.Provider>
  )
}

export default LinksContext

