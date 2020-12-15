/* eslint-disable @typescript-eslint/no-use-before-define */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Row } from 'react-table'

import { api } from '../../api'
import {
  OrganisationProfile,
  OrganisationProfileCreate,
  OrganisationProfileUpdate,
  Sector,
  UserProfile,
  UserProfileCreate,
  UserProfileUpdate
} from '../../interfaces'
import type { RootState } from '../../store'
import { addNotification, mainActions, removeNotification } from '../main/main-slice'

export interface AdminState {
  users: UserProfile[]
  organisations: OrganisationProfile[]
}

const initialState: AdminState = {
  users: [
    // example mock user
    {
      id: 1,
      email: 'user@provider.com',
      full_name: 'John J. johnson',
      password: 'hash12345',
      is_active: true,
      is_superuser: false,
      organisations: [],
      active_organisation: 1
    }
  ],
  organisations: [
    // example mock org
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
      sector: Sector.FINANCIAL
    }
  ]
}

// Thunks (= async action)
export const adminActions = {
  actionGetUsers: createAsyncThunk<
    unknown, // return type of payload creator
    never, // payload creator first arg
    {
      state: RootState // provides getState w/ slice state
    }
  >('admin/actionGetUsers', async (_, { dispatch, getState }) => {
    try {
      const response = await api.getUsers(getState().main.token)
      if (response) {
        dispatch(setUsers(response.data)) // TODO: this is a mutation --> define as reducer under slice
      }
    } catch (error) {
      await dispatch(mainActions.actionCheckApiError(error))
    }
  }),
  actionUpdateUser: createAsyncThunk<
    unknown,
    { id: number; user: UserProfileUpdate },
    {
      state: RootState // provides getState w/ slice state
    }
  >('admin/actionUpdateUser', async (payload, { dispatch, getState }) => {
    try {
      const loadingNotification = { content: 'saving', showProgress: true }
      dispatch(addNotification(loadingNotification))
      const response = (
        await Promise.all([
          api.updateUser(getState().main.token, payload.id, payload.user),
          await new Promise<void>((resolve) => setTimeout(() => resolve(), 500))
        ])
      )[0]
      dispatch(setUser(response.data))
      dispatch(mainActions.removeNotification({ notification: loadingNotification }))
      dispatch(
        addNotification({
          content: 'User successfully updated',
          color: 'success'
        })
      )
    } catch (error) {
      await dispatch(mainActions.actionCheckApiError(error))
    }
  }),
  actionCreateUser: createAsyncThunk<
    unknown,
    UserProfileCreate,
    {
      state: RootState
    }
  >('admin/actionCreateUser', async (payload, { dispatch, getState }) => {
    try {
      const loadingNotification = { content: 'saving', showProgress: true }
      dispatch(addNotification(loadingNotification))
      const response = (
        await Promise.all([
          api.createUser(getState().main.token, payload),
          await new Promise<void>((resolve) => setTimeout(() => resolve(), 500))
        ])
      )[0]
      dispatch(setUser(response.data))
      dispatch(removeNotification(loadingNotification))
      dispatch(
        addNotification({
          content: 'User successfully created',
          color: 'success'
        })
      )
    } catch (error) {
      await dispatch(mainActions.actionCheckApiError(error))
    }
  }),
  actionRemoveUser: createAsyncThunk<
    unknown,
    { id: number },
    {
      state: RootState
    }
  >('admin/actionRemoveUser', async ({ id }, { dispatch, getState }) => {
    try {
      const processingNotification = { content: 'removing user', showProgress: true }
      dispatch(addNotification(processingNotification))
      const response = (
        await Promise.all([
          api.removeUser(getState().main.token, id),
          await new Promise<void>((resolve) => setTimeout(() => resolve(), 500))
        ])
      )[0]
      dispatch(removeUser(response.data))
      dispatch(removeNotification(processingNotification))
      dispatch(
        addNotification({
          content: 'User successfully removed',
          color: 'success'
        })
      )
    } catch (error) {
      await dispatch(mainActions.actionCheckApiError(error))
    }
  }),
  actionRemoveUsers: createAsyncThunk<
    unknown,
    { users: Row<UserProfile>[] },
    {
      state: RootState
    }
  >('admin/actionRemoveUsers', async ({ users }, { dispatch, getState }) => {
    try {
      const processingNotification = {
        content: `removing ${users.length} users`,
        showProgress: true
      }
      dispatch(addNotification(processingNotification))
      const responseArray = await api.removeUsers(getState().main.token, users)
      responseArray.map((response) => dispatch(removeUser(response.data)))
      dispatch(removeNotification(processingNotification))
      dispatch(
        addNotification({
          content: 'Users successfully removed',
          color: 'success'
        })
      )
    } catch (error) {
      await dispatch(mainActions.actionCheckApiError(error))
    }
  }),
  actionGetOrganisations: createAsyncThunk<
    unknown,
    never,
    {
      state: RootState
    }
  >('admin/actionGetOrganisations', async (_, { dispatch, getState }) => {
    try {
      const response = await api.getOrganisations(getState().main.token)
      if (response) {
        dispatch(setOrganisations(response.data))
      }
    } catch (error) {
      await dispatch(mainActions.actionCheckApiError(error))
    }
  }),
  actionUpdateOrganisation: createAsyncThunk<
    unknown,
    { id: number; organisation: OrganisationProfileUpdate },
    {
      state: RootState
    }
  >('admin/actionUpdateOrganisation', async (payload, { dispatch, getState }) => {
    try {
      const loadingNotification = { content: 'saving', showProgress: true }
      dispatch(addNotification(loadingNotification))
      const response = (
        await Promise.all([
          api.updateOrganisation(getState().main.token, payload.id, payload.organisation),
          await new Promise<void>((resolve) => setTimeout(() => resolve(), 500))
        ])
      )[0]
      dispatch(setOrganisation(response.data))
      dispatch(mainActions.removeNotification({ notification: loadingNotification }))
      dispatch(
        addNotification({
          content: 'Organisation successfully updated',
          color: 'success'
        })
      )
    } catch (error) {
      await dispatch(mainActions.actionCheckApiError(error))
    }
  }),
  actionCreateOrganisation: createAsyncThunk<
    unknown,
    OrganisationProfileCreate,
    {
      state: RootState
    }
  >('admin/actionCreateOrganisation', async (payload, { dispatch, getState }) => {
    try {
      const loadingNotification = { content: 'saving', showProgress: true }
      dispatch(addNotification(loadingNotification))
      const response = (
        await Promise.all([
          api.createOrganisation(getState().main.token, payload),
          await new Promise<void>((resolve) => setTimeout(() => resolve(), 500))
        ])
      )[0]
      dispatch(setOrganisation(response.data))
      dispatch(removeNotification(loadingNotification))
      dispatch(
        addNotification({
          content: 'Organisation successfully created',
          color: 'success'
        })
      )
    } catch (error) {
      await dispatch(mainActions.actionCheckApiError(error))
    }
  })
}
// Slice
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    // a reducer is a function that determines changes to app state
    // reducers are equivalent to mutation in vue
    setUsers: (state: AdminState, { payload }: PayloadAction<UserProfile[]>) => {
      return { ...state, users: payload }
    },
    setUser: (state: AdminState, { payload }: PayloadAction<UserProfile>) => {
      const users = state.users.filter((user: UserProfile) => user.id !== payload.id)
      users.push(payload)
      return { ...state, users }
    },
    removeUser(state: AdminState, { payload }: PayloadAction<UserProfile>) {
      return {
        ...state,
        users: state.users.filter((user) => user.id !== payload.id)
      }
    },
    setOrganisations: (
      state: AdminState,
      { payload }: PayloadAction<OrganisationProfile[]>
    ) => {
      return { ...state, organisations: payload }
    },
    setOrganisation: (
      state: AdminState,
      { payload }: PayloadAction<OrganisationProfile>
    ) => {
      const organisations = state.organisations.filter(
        (organisation: OrganisationProfile) => organisation.id !== payload.id
      )
      organisations.push(payload)
      return { ...state, organisations }
    }
  }
})

// Reducers; specify how the application's state changes in response to actions
export default adminSlice.reducer

// Actions
export const {
  setUser,
  setUsers,
  removeUser,
  setOrganisation,
  setOrganisations
} = adminSlice.actions
