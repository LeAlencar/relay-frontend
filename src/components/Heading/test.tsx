import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { createMockEnvironment } from 'relay-test-utils'
import { WithProvider } from '../../../test/withProviders'
import Heading from '.'

describe('<Heading />', () => {
  it('should render the heading', () => {
    const environment = createMockEnvironment()
    render(
      <WithProvider relayEnvironment={environment}>
        <Heading />
      </WithProvider>
    )
    expect(screen.getByText('Transactions')).toBeTruthy()
  })
})
