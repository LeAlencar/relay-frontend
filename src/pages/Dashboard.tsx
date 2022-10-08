/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Container } from '@mui/material'
import { useLazyLoadQuery } from 'react-relay'
import Heading from '../components/Heading'
import { Transaction } from '../components/Transaction'
import { DashboardQuery } from './__generated__/DashboardQuery.graphql'
const graphql = require('babel-plugin-relay/macro')

export const Dashboard = () => {
  const response = useLazyLoadQuery<DashboardQuery>(
    graphql`
      query DashboardQuery {
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

  return (
    <>
      <Heading />
      <Container sx={{ marginTop: 10 }}>
        {transactions.edges.map(({ node }: any) => {
          return <Transaction key={node.__id} transaction={node} />
        })}
      </Container>
    </>
  )
}
