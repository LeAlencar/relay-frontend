import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { createMockEnvironment } from 'relay-test-utils'

import userEvent from '@testing-library/user-event'
import { WithProvider } from '../../../../test/withProviders'
import { TestRouter } from '../../../../test/TestRouter'
import { FormRegister } from '..'
import { createMemoryHistory } from 'history'

describe('LoginPage', () => {
  it('should call the login mutation properly', async () => {
    const environment = createMockEnvironment()
    const history = createMemoryHistory()

    render(
      <TestRouter history={history}>
        <WithProvider relayEnvironment={environment}>
          <FormRegister />
        </WithProvider>
      </TestRouter>
    )

    const variables = {
      email: 'example@example.com',
      username: 'example',
      password: 'examplepassword'
    }

    await waitFor(() =>
      expect(screen.getAllByPlaceholderText('email')).toBeTruthy()
    )

    userEvent.type(screen.getByPlaceholderText('email'), variables.email)
    userEvent.type(screen.getByPlaceholderText('username'), variables.username)
    userEvent.type(screen.getByPlaceholderText('password'), variables.password)

    expect(screen.getByRole('button', { name: 'Register' })).toBeTruthy()

    userEvent.click(screen.getByRole('button', { name: 'Register' }))

    await waitFor(() => {
      const operation = environment.mock.getMostRecentOperation()

      expect(operation.request.variables.input).toMatchObject(variables)
    })
  })

  it('should navigate to Register route', async () => {
    const environment = createMockEnvironment()
    const history = createMemoryHistory()

    render(
      <TestRouter history={history}>
        <WithProvider relayEnvironment={environment}>
          <FormRegister />
        </WithProvider>
      </TestRouter>
    )

    const loginButton = screen.getByRole('button', {
      name: 'Go to login'
    })

    expect(loginButton).toBeTruthy()

    userEvent.click(loginButton)

    expect(history.location.pathname).toBe('/login')
  })
})
