/* eslint-disable @typescript-eslint/no-var-requires */
const graphql = require('babel-plugin-relay/macro')

export const TransactionCreate = graphql`
  mutation createMutation(
    $input: TransactionCreateInput!
    $connections: [ID!]!
  ) {
    TransactionCreate(input: $input) {
      success
      error
      transaction
        @prependNode(
          connections: $connections
          edgeTypeName: "TransactionEdge"
        ) {
        id
        name
        category
        price
      }
    }
  }
`
