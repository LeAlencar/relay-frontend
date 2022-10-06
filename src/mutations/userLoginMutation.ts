/* eslint-disable @typescript-eslint/no-var-requires */
const graphql = require('babel-plugin-relay/macro')

export const UserLogin = graphql`
  mutation userLoginMutation($input: UserLoginInput!) {
    userLogin(input: $input) {
      token
      me {
        username
        email
      }
    }
  }
`
