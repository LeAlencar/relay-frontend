/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react'
import { Routes as Router, Route, Navigate } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import { Dashboard } from './pages/Dashboard'
import { LoginPage } from './pages/Login'
import { RegisterPage } from './pages/Register'

const RequiredAuth = ({ children }: any) => {
  const { isAuth } = useContext(AuthContext)

  return isAuth ? children : <Navigate to="/login" />
}

export const Routes = () => {
  return (
    <Router>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/"
        element={
          <RequiredAuth>
            <Dashboard />
          </RequiredAuth>
        }
      />
    </Router>
  )
}
