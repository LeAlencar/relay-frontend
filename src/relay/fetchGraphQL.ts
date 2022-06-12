import { RequestParameters } from 'relay-runtime/lib/util/RelayConcreteNode'
import { Variables } from 'relay-runtime/lib/util/RelayRuntimeTypes'

async function fetchGraphQL(request: RequestParameters, variables: Variables) {
  const response = await fetch('http://localhost:9000/graphql', {
    method: 'POST',

    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      query: request,
      variables
    })
  })

  const data = await response.json()
  return data
}

export default fetchGraphQL
