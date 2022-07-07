import React from 'react'
import {
  RelayEnvironmentProvider,
  Environment as RelayEnvironment
} from 'react-relay'

import Environment from '../src/relay/Environment'

interface Props {
  children: React.ReactElement
  relayEnvironment?: RelayEnvironment
}

export const WithProvider = ({
  children,
  relayEnvironment = Environment
}: Props) => (
  <RelayEnvironmentProvider environment={relayEnvironment}>
    {children}
  </RelayEnvironmentProvider>
)
