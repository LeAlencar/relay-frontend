/* eslint-disable array-callback-return */
import { Suspense } from 'react'

import { RelayEnvironmentProvider } from 'react-relay/hooks'

import Environment from './relay/Environment'

import { loadQuery, usePreloadedQuery } from 'react-relay/hooks'
import { AppTransactionQuery } from './__generated__/AppTransactionQuery.graphql';
import Transaction from './components/Transaction';
import Heading from './components/Heading';


const graphql = require('babel-plugin-relay/macro');

const appTransactionQuery = graphql`
  query AppTransactionQuery {
    transactions {
      edges {
        node {
          id
          name
          category
          price
        }
      }
    }
  }
`;


const preloadedQuery = loadQuery(Environment, appTransactionQuery, {
  /* query variables */
});



function App(props: any) {
  //const data = usePreloadedQuery<AppTransactionQuery>(appTransactionQuery, props.preloadedQuery);
  //console.log(data.transactions.edges)
  
  return (
    <div className="App">
      <Heading />
      <Transaction />
    </div>
  );
}

function AppRoot() {
  return (
    <RelayEnvironmentProvider environment={Environment}>
      <Suspense fallback={'Loading...'}>
        <App />
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;
