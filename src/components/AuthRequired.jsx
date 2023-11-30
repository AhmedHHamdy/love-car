import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"

export default function AuthRequired() {
  const { token } = useAuth()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}