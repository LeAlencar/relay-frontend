/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useContext } from 'react'
import { useMutation } from 'react-relay'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../../context/AuthContext'
import { UserCreate } from '../../mutations/userCreateMutation'
import Heading from '../Heading'
import { Form, FormContainer } from './style'

export const FormRegister = () => {
  const { login } = useContext(AuthContext)
  const [loginUser] = useMutation(UserCreate)
  const navigate = useNavigate()
  const formikValue = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    onSubmit: (values, actions) => {
      loginUser({
        variables: {
          input: {
            username: values.username,
            email: values.email,
            password: values.password
          }
        },
        onCompleted({ userCreate }: any) {
          if (userCreate.error) {
            toast.error('This user already exists!', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            })

            return
          }

          const token = userCreate.token
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

  const redirectLogin = () => {
    navigate('/login')
  }

  return (
    <>
      <Heading />
      <FormContainer>
        <Form onSubmit={formikValue.handleSubmit}>
          <TextField
            id="username"
            name="username"
            label="username"
            value={formikValue.values.username}
            onChange={formikValue.handleChange}
          />
          <TextField
            id="email"
            name="email"
            label="email"
            value={formikValue.values.email}
            onChange={formikValue.handleChange}
          />
          <TextField
            id="password"
            name="password"
            label="password"
            type="password"
            value={formikValue.values.password}
            onChange={formikValue.handleChange}
          />
          <Button color="primary" variant="contained" type="submit">
            Register
          </Button>
        </Form>
        <Button
          onClick={redirectLogin}
          color="primary"
          variant="contained"
          type="button"
          sx={{
            marginTop: 2
          }}
        >
          Go to login
        </Button>
      </FormContainer>
    </>
  )
}
