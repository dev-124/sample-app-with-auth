import {
  Action,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
  ThunkAction
} from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import adminReducer, { adminActions } from './features/admin/admin-slice'
import mainReducer, { mainActions } from './features/main/main-slice'
import organisationReducer, {
  organisationActions
} from './features/organisation/organisation-slice'

export { adminActions, mainActions, organisationActions }

const mainPersistConfig = {
  key: 'main',
  version: 1,
  storage,
  blacklist: [`logInError`, 'isLoggedIn']
}
const rootReducer = combineReducers({
  admin: adminReducer,
  main: persistReducer(mainPersistConfig, mainReducer),
  organisation: organisationReducer
})

const persistConfig = {
  key: 'root',
  version: 1,
  blacklist: ['main', 'admin', 'organisation'],
  storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      // ignore all action types for redux-persist dispatches
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
})
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
export type AppDispatch = typeof store.dispatch

// like useDispatch for usage in components, but with full type safety
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
