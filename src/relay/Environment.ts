/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
  RequestParameters,
  Variables,
  Observable
} from 'relay-runtime'

import fetchGraphQL from './fetchGraphQL'

import { createClient } from 'graphql-ws'

const wsClient = createClient({
  url: 'ws://localhost:9000/graphql'
})

const subscribe = (
  operation: RequestParameters,
  variables: Variables
): Observable<any> => {
  return Observable.create((sink) => {
    return wsClient.subscribe(
      {
        operationName: operation.name,
        query: operation.text as string,
        variables
      },
      sink
    )
  })
}

const fetchRelay: FetchFunction = async (params, variables) => {
  // eslint-disable-next-line no-console
  console.log(`fetching query ${params.name} with ${JSON.stringify(variables)}`)
  return fetchGraphQL(params.text as string, variables)
}

export default new Environment({
  network: Network.create(fetchRelay, subscribe),
  store: new Store(new RecordSource())
})
