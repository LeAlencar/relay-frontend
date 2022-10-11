/* eslint-disable @typescript-eslint/no-var-requires */
const graphql = require('babel-plugin-relay/macro')

export const updateTransactionMutation = graphql`
  mutation updateMutation(
    $input: TransactionUpdateInput!
    $connections: [ID!]!
  ) {
    TransactionUpdate(input: $input) {
      transactionEdge {
        node
          @appendNode(connections: $connections, edgeTypeName: "Transactions") {
          id
          ...Transaction_transaction
        }
      }

      success
      error
    }
  }
`
