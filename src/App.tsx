/* eslint-disable array-callback-return */
import { Suspense } from 'react'

import { RelayEnvironmentProvider } from 'react-relay/hooks'

import Environment from './relay/Environment'

import { loadQuery, usePreloadedQuery } from 'react-relay/hooks'
import { AppeventQuery } from './__generated__/AppeventQuery.graphql';


const graphql = require('babel-plugin-relay/macro');

const RepositoryNameQuery = graphql`
  query AppeventQuery {
    events {
      edges {
        node {
          id
          name
          start
          end
          allDay
        }
      }
    }
  }
`;

// Immediately load the query as our app starts. For a real app, we'd move this
// into our routing configuration, preloading data as we transition to new routes.
const preloadedQuery = loadQuery(Environment, RepositoryNameQuery, {
  /* query variables */
});



function App(props: any) {
  const data = usePreloadedQuery<AppeventQuery>(RepositoryNameQuery, props.preloadedQuery);
  console.log(data.events.edges)
  
  return (
    <div className="App">
      
      {data.events.edges.map(({node}: any) => {
        return(
          <div key={node.name}>

            <p>{node.name}</p>
          </div>
        )
      })} 
    </div>
  );
}

function AppRoot() {
  return (
    <RelayEnvironmentProvider environment={Environment}>
      <Suspense fallback={'Loading...'}>
        <App preloadedQuery={preloadedQuery} />
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;
