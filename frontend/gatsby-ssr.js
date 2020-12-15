import './src/app.css'
import React from 'react'
import { Provider } from 'react-redux'
import localeContextProvider from './src/locales/locale-context'
import store, { persistor } from './src/store'
import { PersistGate } from 'redux-persist/integration/react'

export const wrapPageElement = localeContextProvider
export const wrapRootElement = ({ element }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {element}
      </PersistGate>
    </Provider>
  )
}
