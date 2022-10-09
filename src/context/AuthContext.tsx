import { createContext, ReactNode, useEffect, useState } from 'react'
import { GetToken } from '../components/auth/security'

interface IAuthContext {
  isAuth: boolean
  login: (token: string) => void
  logout: () => void
}

export const AuthContext = createContext({} as IAuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const token = GetToken()
  const [isAuth, setIsAuth] = useState(token ? true : false)

  useEffect(() => {
    token ? setIsAuth(true) : setIsAuth(false)
  }, [token])

  const login = (token: string) => {
    localStorage.setItem('login', token)
    setIsAuth(true)
  }

  const logout = () => {
    localStorage.removeItem('login')
    setIsAuth(false)
  }

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
