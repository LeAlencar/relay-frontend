import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction
} from 'relay-runtime'

import fetchGraphQL from './fetchGraphQL'

const fetchRelay: FetchFunction = async (params, variables) => {
  console.log(`fetching query ${params.name} with ${JSON.stringify(variables)}`)
  return fetchGraphQL(params.text as string, variables)
}

export default new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource())
})
