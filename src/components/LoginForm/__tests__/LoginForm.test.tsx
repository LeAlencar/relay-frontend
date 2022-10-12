import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { createMockEnvironment } from 'relay-test-utils'

import userEvent from '@testing-library/user-event'
import { WithProvider } from '../../../../test/withProviders'
import { TestRouter } from '../../../../test/TestRouter'
import { FormLogin } from '..'
import { createMemoryHistory } from 'history'

describe('LoginPage', () => {
  it('should call the login mutation properly', async () => {
    const environment = createMockEnvironment()
    const history = createMemoryHistory()

    render(
      <TestRouter history={history}>
        <WithProvider relayEnvironment={environment}>
          <FormLogin />
        </WithProvider>
      </TestRouter>
    )

    const variables = {
      email: 'example@example.com',
      password: 'examplepassword'
    }

    await waitFor(() =>
      expect(screen.getAllByPlaceholderText('email')).toBeTruthy()
    )

    userEvent.type(screen.getByPlaceholderText('email'), variables.email)
    userEvent.type(screen.getByPlaceholderText('password'), variables.password)

    expect(screen.getByRole('button', { name: 'Login' })).toBeTruthy()

    userEvent.click(screen.getByRole('button', { name: 'Login' }))

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
          <FormLogin />
        </WithProvider>
      </TestRouter>
    )

    const registerButton = screen.getByRole('button', {
      name: 'Go to register'
    })

    expect(registerButton).toBeTruthy()

    userEvent.click(registerButton)

    expect(history.location.pathname).toBe('/register')
  })
})
