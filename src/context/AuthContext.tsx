/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

interface IAuthContext {
  isAuth: boolean
  login: (token: string) => void
  logout: () => void
}

export const AuthContext = createContext({} as IAuthContext)

export const AuthProvider = ({ children }: any) => {
  const [isAuth, setIsAuth] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['login'])

  useEffect(() => {
    const token = cookies.login

    token ? setIsAuth(true) : removeCookie('login')
  }, [cookies.login, removeCookie])

  const login = (token: string) => {
    setCookie('login', token, {
      maxAge: 60 * 60 * 24 //24 hours
    })
    setIsAuth(true)
  }

  const logout = () => {
    removeCookie('login')
    setIsAuth(false)
  }

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
