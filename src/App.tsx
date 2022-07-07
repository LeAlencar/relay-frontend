/* eslint-disable @typescript-eslint/no-var-requires */
import { Suspense } from 'react'

import { RelayEnvironmentProvider, useLazyLoadQuery } from 'react-relay/hooks'

import Environment from './relay/Environment'

import Heading from './components/Heading'
import Container from '@mui/material/Container'
import { GlobalStyle } from './styles/global'
import { Transaction } from './components/Transaction'
import { AppQuery } from './__generated__/AppQuery.graphql'

const graphql = require('babel-plugin-relay/macro')

function App() {
  const response = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery {
        transactions {
          edges {
            node {
              id
              name
              category
              price
            }
          }
        }
      }
    `,
    {},
    { fetchPolicy: 'network-only' }
  )

  const { transactions } = response

  return (
    <div className="App">
      <Heading />
      <Container sx={{ marginTop: 10 }}>
        {transactions.edges.map(({ node }: any) => {
          return <Transaction key={node.id} node={node} />
        })}
      </Container>
      <GlobalStyle />
    </div>
  )
}

function AppRoot() {
  return (
    <RelayEnvironmentProvider environment={Environment}>
      <Suspense fallback={'Loading...'}>
        <App />
      </Suspense>
    </RelayEnvironmentProvider>
  )
}

export default AppRoot
