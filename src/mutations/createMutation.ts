/* eslint-disable @typescript-eslint/no-var-requires */
const graphql = require('babel-plugin-relay/macro')

export const TransactionCreate = graphql`
  mutation createMutation(
    $input: TransactionCreateInput!
    $connections: [ID!]!
  ) {
    TransactionCreate(input: $input) {
      transactionEdge {
        node
          @prependNode(
            connections: $connections
            edgeTypeName: "TransactionEdge"
          ) {
          id
          ...Transaction_transaction
        }
      }
    }
  }
`
