import { Variables } from 'relay-runtime/lib/util/RelayRuntimeTypes'

const token =
  'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGYyOGI1OGViNTEwMzJhM2ZjMzkzOCIsImlhdCI6MTY2NDk3OTM4MH0.P84_wPh9dR9uzZJ0B7TX9YHZ0W7VokyQPhHysyUd2eY'

export const fetchGraphQL = async (query: string, variables: Variables) => {
  const response = await fetch('http://localhost:9000/graphql', {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
      Authorization: token
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
