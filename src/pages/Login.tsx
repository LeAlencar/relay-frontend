import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useContext } from 'react'
import { useMutation } from 'react-relay'
import { toast } from 'react-toastify'
import Heading from '../components/Heading'
import { AuthContext } from '../context/AuthContext'
import { UserLogin } from '../mutations/userLoginMutation'

export const Login = () => {
  const { login } = useContext(AuthContext)
  const [loginUser] = useMutation(UserLogin)
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
        onCompleted(data) {
          console.log(data)

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

  return (
    <>
      <Heading />
      <form onSubmit={formikValue.handleSubmit}>
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
          Login
        </Button>
      </form>
    </>
  )
}
