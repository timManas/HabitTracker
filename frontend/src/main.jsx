import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import HomePage from './screens/HomePage.jsx'
import LoginPage from './screens/LoginPage.jsx'
import HabitsPage from './screens/HabitsPage.jsx'
import AccountsPage from './screens/AccountsPage.jsx'
import SettingsPage from './screens/SettingsPage.jsx'
import { Provider } from 'react-redux'
import store from './store.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<App />}>
      <Route path='/' element={<HomePage />} index='true' />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/habits' element={<HabitsPage />} />
      <Route path='/accounts' element={<AccountsPage />} />
      <Route path='/settings' element={<SettingsPage />} />
      <Route path='logout' element={<HomePage />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <Provider store={store}>
        <App />
      </Provider>
    </RouterProvider>
  </React.StrictMode>
)
