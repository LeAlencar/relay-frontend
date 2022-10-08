/* eslint-disable @typescript-eslint/no-var-requires */
const graphql = require('babel-plugin-relay/macro')

export const UserCreate = graphql`
  mutation userCreateMutation($input: UserRegisterInput!) {
    userCreate(input: $input) {
      token
      error
    }
  }
`
