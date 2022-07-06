/* eslint-disable array-callback-return */
import { Suspense, useState } from 'react'

import { RelayEnvironmentProvider } from 'react-relay/hooks'

import Environment from './relay/Environment'

import Transactions from './components/Transactions';
import Heading from './components/Heading';
import { NewTransactionModal } from './components/newTransactionModal';
import { GlobalStyle } from './styles/global';

function App() {
  
  const [isNewTransactionModalOpen, setIsNewModalTransactionOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewModalTransactionOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewModalTransactionOpen(false);
  }
  
  return (
    <div className="App">
      <Heading onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      <Transactions />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal} />
      <GlobalStyle />
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
