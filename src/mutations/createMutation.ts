/* eslint-disable @typescript-eslint/no-var-requires */
const graphql = require('babel-plugin-relay/macro')

export const TransactionCreate = graphql`
  mutation createMutation(
    $input: TransactionCreateInput!
    $connections: [ID!]!
  ) {
    TransactionCreate(input: $input) {
      transactionEdge @prependEdge(connections: $connections) {
        node {
          id
          ...Transaction_transaction
        }
      }
    }
  }
`
