import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormLogin } from '../components/LoginForm'
import { AuthContext } from '../context/AuthContext'

export const LoginPage = () => {
  const { isAuth } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) navigate('/')
  }, [isAuth, navigate])

  return (
    <>
      <FormLogin />
    </>
  )
}
