import React, { ReactNode, useLayoutEffect, useState } from 'react'
import type { History } from 'history'
import { Router } from 'react-router-dom'

interface TestRouterProps {
  history: History
  children: ReactNode
  basename?: string
}

export const TestRouter = ({
  history,
  basename,
  children
}: TestRouterProps) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  })

  useLayoutEffect(() => history.listen(setState), [history])
  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  )
}
