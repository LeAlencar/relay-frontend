import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormRegister } from '../components/RegisterForm'
import { AuthContext } from '../context/AuthContext'

export const RegisterPage = () => {
  const { isAuth } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    isAuth ? navigate('/') : ''
  }, [isAuth, navigate])

  return (
    <>
      <FormRegister />
    </>
  )
}
