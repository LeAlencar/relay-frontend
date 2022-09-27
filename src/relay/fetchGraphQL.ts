import { Variables } from 'relay-runtime/lib/util/RelayRuntimeTypes'

export const fetchGraphQL = async (query: string, variables: Variables) => {
  const response = await fetch('http://localhost:9000/graphql', {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json'
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
