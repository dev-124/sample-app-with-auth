/* eslint-disable @typescript-eslint/no-use-before-define */
import { navigate } from '@reach/router'
import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { api } from '../../api'
import {
  AppNotification,
  CustomNotification,
  UserProfile,
  UserProfileUpdate
} from '../../interfaces'
import type { RootState } from '../../store'
import { getLocalToken, removeLocalToken, saveLocalToken } from '../../utils'

const isBrowser = typeof window !== `undefined`

export interface MainState {
  logInError: boolean
  token: string
  isLoggedIn: boolean | null
  userProfile: UserProfile | null
  notifications: AppNotification[]
}

const mockUser = {
  id: 1,
  email: 'user@provider.com',
  full_name: 'John J. johnson',
  password: 'hash12345',
  is_active: true,
  is_superuser: true,
  organisations: [
    {
      id: 1,
      natural_name: 'Envoy Corp',
      trade_name: 'Envoy Corp Ltd',
      trade_number: '1234321',
      address: 'main street 1',
      country: 'NO',
      is_active: true,
      postal_code: '1234JT',
      telephone: '12345678',
      sector: 'FINANCIAL'
    }
  ],
  active_organisation: 1
}

const initialState: MainState = {
  token: '',
  logInError: false,
  isLoggedIn: true, // note: set to true to bypass route-guards
  userProfile: mockUser,
  notifications: []
}

export interface MainLoginPayload {
  email: string
  password: string
}

// Thunks (= async action)
export const mainActions = {
  actionLogIn: createAsyncThunk<
    unknown, // return type of payload creator
    MainLoginPayload, // payload creator first arg
    {
      state: RootState // provides getState w/ slice state
    }
  >(
    'main/actionLogin',
    async (payload: { email: string; password: string }, { dispatch }) => {
      try {
        const response = await api.logInGetToken(payload.email, payload.password)
        const token = response.data.access_token
        if (token) {
          saveLocalToken(token)
          dispatch(setToken(token))
          dispatch(setLoggedIn(true))
          dispatch(setLogInError(false))
          await dispatch(mainActions.actionGetUserProfile())
          dispatch(mainActions.actionRouteLoggedIn())
          dispatch(addNotification({ content: 'Logged in', color: 'success' }))
        } else {
          await dispatch(mainActions.actionLogOut())
        }
      } catch (err) {
        dispatch(setLogInError(true))
        await dispatch(mainActions.actionLogOut())
      }
    }
  ),
  actionGetUserProfile: createAsyncThunk<
    void,
    never,
    {
      state: RootState // provides getState w/ slice state
    }
  >('main/actionGetUserProfile', async (_, { dispatch, getState }) => {
    try {
      const response = await api.getMe(getState().main.token)
      if (response.data) {
        dispatch(setUserProfile(response.data))
      }
    } catch (error) {
      await dispatch(mainActions.actionCheckApiError(error))
    }
  }),
  actionUpdateUserProfile: createAsyncThunk<
    void,
    UserProfileUpdate & CustomNotification,
    {
      state: RootState // provides getState w/ slice state
    }
  >('main/actionUpdateUserProfile', async (payload, { dispatch, getState }) => {
    try {
      const { notification, ...userPayload } = payload

      const loadingNotification = {
        content: 'saving',
        showProgress: true
      }

      dispatch(addNotification(loadingNotification))
      const response = (
        await Promise.all([
          api.updateMe(getState().main.token, userPayload),
          await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000))
        ])
      )[0]
      dispatch(setUserProfile(response.data))
      dispatch(removeNotification(loadingNotification))

      const successNotification = notification?.success || {
        content: 'Profile successfully updated',
        color: 'success'
      }
      dispatch(addNotification(successNotification))
    } catch (error) {
      await dispatch(mainActions.actionCheckApiError(error))
    }
  }),
  actionCheckLoggedIn: createAsyncThunk<
    void,
    never,
    {
      state: RootState // provides getState w/ slice state
    }
  >('main/actionCheckLoggedIn', async (_, { dispatch, getState }) => {
    if (!getState().main.isLoggedIn) {
      let { token } = getState().main
      if (!token) {
        const localToken = getLocalToken()
        if (localToken) {
          dispatch(setToken(localToken))
          token = localToken
        }
      }
      if (token) {
        try {
          const response = await api.getMe(token)
          dispatch(setLoggedIn(true))
          dispatch(setUserProfile(response.data))
        } catch (error) {
          await dispatch(mainActions.actionRemoveLogIn())
        }
      } else {
        await dispatch(mainActions.actionRemoveLogIn())
      }
    }
  }),
  actionRemoveLogIn: createAsyncThunk('main/actionRemoveLogIn', (_, { dispatch }) => {
    removeLocalToken()
    dispatch(setToken(''))
    dispatch(setLoggedIn(false))
  }),
  actionLogOut: createAsyncThunk('main/actionLogOut', async (_, { dispatch }) => {
    await dispatch(mainActions.actionRemoveLogIn())
    dispatch(mainActions.actionRouteLogOut())
  }),
  actionUserLogOut: createAsyncThunk('main/actionUserLogOut', async (_, { dispatch }) => {
    await dispatch(mainActions.actionLogOut())
    dispatch(addNotification({ content: 'Logged out', color: 'success' }))
  }),
  actionCheckApiError: createAsyncThunk(
    'main/actionCheckApiError',
    async (payload: AxiosError, { dispatch }) => {
      if (payload.response?.status === 401) {
        await dispatch(mainActions.actionLogOut())
      }
    }
  ),
  removeNotification: createAsyncThunk(
    'main/removeNotification',
    async (
      payload: { notification: AppNotification; timeout?: number },
      { dispatch }
    ) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          dispatch(removeNotification(payload.notification))
          resolve()
        }, payload.timeout)
      })
    }
  ),
  passwordRecovery: createAsyncThunk(
    'main/passwordRecovery',
    async (payload: { username: string }, { dispatch }) => {
      const loadingNotification = {
        content: 'Sending password recovery email',
        showProgress: true
      }
      try {
        dispatch(addNotification(loadingNotification))
        dispatch(removeNotification(loadingNotification))
        dispatch(
          addNotification({
            content: 'Password recovery email sent',
            color: 'success'
          })
        )
        await dispatch(mainActions.actionLogOut())
      } catch (error) {
        dispatch(removeNotification(loadingNotification))
        dispatch(
          addNotification({
            color: 'error',
            content: 'Incorrect username'
          })
        )
      }
    }
  ),
  resetPassword: createAsyncThunk(
    'main/resetPassword',
    async (payload: { password: string; token: string }, { dispatch }) => {
      const loadingNotification = {
        content: 'Resetting password',
        showProgress: true
      }
      try {
        dispatch(addNotification(loadingNotification))
        const response = (
          await Promise.all([
            api.resetPassword(payload.password, payload.token),
            await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000))
          ])
        )[0]
        dispatch(setUserProfile(response.data))
        dispatch(removeNotification(loadingNotification))
        dispatch(
          addNotification({
            content: 'Password successfully reset',
            color: 'success'
          })
        )
        await dispatch(mainActions.actionLogOut())
      } catch (error) {
        dispatch(removeNotification(loadingNotification))
        dispatch(
          addNotification({
            color: 'error',
            content: 'Error resetting password'
          })
        )
      }
    }
  ),

  // Regular Actions (sync)
  actionRouteLogOut: createAction<() => any, string>(
    'main/actionRouteLogOut',
    async () => {
      if (!isBrowser) return
      if (window && window.location.pathname !== '/app/login') {
        await navigate('/app/login', { replace: true })
      }
    }
  ),

  actionRouteLoggedIn: createAction<() => any, string>(
    'main/actionRouteLoggedIn',
    async () => {
      if (!isBrowser) return
      if (
        window.location.pathname === '/app/login' ||
        window.location.pathname === '/app'
      ) {
        await navigate('/app/dashboard', { replace: true })
      }
    }
  )
}

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setToken(state: MainState, { payload }: PayloadAction<string>) {
      return { ...state, token: payload }
    },
    setLoggedIn(state: MainState, { payload }: PayloadAction<boolean>) {
      return { ...state, isLoggedIn: payload }
    },
    setLogInError(state: MainState, { payload }: PayloadAction<boolean>) {
      return { ...state, logInError: payload }
    },
    setUserProfile(state: MainState, { payload }: PayloadAction<UserProfile>) {
      return { ...state, userProfile: payload }
    },
    addNotification(state: MainState, { payload }: PayloadAction<AppNotification>) {
      return {
        ...state,
        notifications: [...state.notifications, payload]
      }
    },
    removeNotification(state: MainState, { payload }: PayloadAction<AppNotification>) {
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.content !== payload.content
        )
      }
    }
  }
})
// Reducers
export default mainSlice.reducer

// Actions
export const {
  setToken,
  setLoggedIn,
  setLogInError,
  setUserProfile,
  addNotification,
  removeNotification
} = mainSlice.actions
