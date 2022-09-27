/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Suspense } from 'react'

import { RelayEnvironmentProvider, useLazyLoadQuery } from 'react-relay/hooks'

import Environment from './relay/Environment'

import Heading from './components/Heading'
import Container from '@mui/material/Container'
import { GlobalStyle } from './styles/global'
import { Transaction } from './components/Transaction'
import { AppQuery } from './__generated__/AppQuery.graphql'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const graphql = require('babel-plugin-relay/macro')

function App() {
  const response = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery {
        transactions(first: 10)
          @connection(key: "TransactionList_transactions") {
          __id
          edges {
            node {
              ...Transaction_transaction
            }
          }
        }
      }
    `,
    {},
    { fetchPolicy: 'network-only' }
  )

  const { transactions } = response
  const connections = response.transactions.__id
  console.log(connections)

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Heading conns={connections} />
      <Container sx={{ marginTop: 10 }}>
        {transactions.edges.map(({ node }: any) => {
          return <Transaction key={node._id} transaction={node} />
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
