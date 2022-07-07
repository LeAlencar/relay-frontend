/* eslint-disable @typescript-eslint/no-var-requires */
const graphql = require('babel-plugin-relay/macro')

export const TransactionDelete = graphql`
  mutation deleteMutation($input: TransactionDeleteInput!) {
    TransactionDelete(input: $input) {
      transactionId
      success
      error
    }
  }
`
