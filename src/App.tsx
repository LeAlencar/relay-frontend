import { Suspense } from 'react'
import { RelayEnvironmentProvider } from 'react-relay/hooks'
import Environment from './relay/Environment'
import { GlobalStyle } from './styles/global'
import { AuthProvider } from './context/AuthContext'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Routes } from './Routes'
import { HashRouter } from 'react-router-dom'
import { Loading } from './components/Loading'

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes />
      <GlobalStyle />
    </div>
  )
}

function AppRoot() {
  return (
    <AuthProvider>
      <RelayEnvironmentProvider environment={Environment}>
        <Suspense fallback={<Loading />}>
          <HashRouter>
            <App />
          </HashRouter>
        </Suspense>
      </RelayEnvironmentProvider>
    </AuthProvider>
  )
}

export default AppRoot
