import { createContext, useState, useContext, useEffect, useMemo  } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext()

export default function AuthProvider({ children }) {

  const [token, setToken_] = useState(Cookies.get("token"))

  const setToken = (newToken) => {
    setToken_(newToken)
    if (newToken === undefined) {
      return;
    }
    Cookies.set("token", newToken)
  }

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token
    } else {
      delete axios.defaults.headers.common["Authorization"]
    }
  }, [token])

  const contextValue = useMemo(() => ({
    token, 
    setToken
  }), [token])

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}