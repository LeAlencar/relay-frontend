import { Variables } from 'relay-runtime/lib/util/RelayRuntimeTypes'
import { GetToken } from '../components/auth/security'

export const fetchGraphQL = async (query: string, variables: Variables) => {
  const auth = GetToken()
  const response = await fetch(`${process.env.REACT_APP_HOST}`, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
      Authorization: auth as string
    },
    body: JSON.stringify({
      query,
      variables
    })
  })

  const data = await response.json()
  return data
}

export default fetchGraphQL
