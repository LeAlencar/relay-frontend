import { Variables } from 'relay-runtime/lib/util/RelayRuntimeTypes'

export const fetchGraphQL = async (query: string, variables: Variables) => {
  const response = await fetch(
    'https://graphql-koa-app.herokuapp.com/graphql',
    {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables
      })
    }
  )

  const data = await response.json()
  return data
}

export default fetchGraphQL
