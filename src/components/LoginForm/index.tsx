/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useContext } from 'react'
import { useMutation } from 'react-relay'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../../context/AuthContext'
import { UserLogin } from '../../mutations/userLoginMutation'
import Heading from '../Heading'
import { Form, FormContainer } from './style'

export const FormLogin = () => {
  const { login } = useContext(AuthContext)
  const [loginUser] = useMutation(UserLogin)
  const navigate = useNavigate()
  const formikValue = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values, actions) => {
      loginUser({
        variables: {
          input: {
            email: values.email,
            password: values.password
          }
        },
        onCompleted({ userLogin }: any) {
          const token = userLogin.token
          login(token)
          navigate('/')
          toast.success('Logged in!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
        }
      })
      actions.setSubmitting(false)
    }
  })

  const redirectRegister = () => {
    navigate('/register')
  }

  return (
    <>
      <Heading />
      <FormContainer>
        <Form onSubmit={formikValue.handleSubmit}>
          <TextField
            id="email"
            name="email"
            label="email"
            placeholder="email"
            value={formikValue.values.email}
            onChange={formikValue.handleChange}
          />
          <TextField
            id="password"
            name="password"
            label="password"
            type="password"
            placeholder="password"
            value={formikValue.values.password}
            onChange={formikValue.handleChange}
          />
          <Button color="primary" variant="contained" type="submit">
            Login
          </Button>
        </Form>
        <Button
          onClick={redirectRegister}
          color="primary"
          variant="contained"
          type="button"
          sx={{
            marginTop: 2
          }}
        >
          Go to register
        </Button>
      </FormContainer>
    </>
  )
}
