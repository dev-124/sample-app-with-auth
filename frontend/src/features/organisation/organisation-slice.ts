/* eslint-disable @typescript-eslint/no-use-before-define */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { api } from '../../api'
import {
  CustomNotification,
  OrganisationProfile,
  OrganisationProfileUpdate,
  ProductProfile
} from '../../interfaces'
import type { RootState } from '../../store'
import { addNotification, mainActions, removeNotification } from '../main/main-slice'

export interface OrganisationState {
  organisationProfile: OrganisationProfile | null
  products: ProductProfile[]
}

const initialState: OrganisationState = {
  organisationProfile: null,
  products: []
}

export const organisationActions = {
  actionGetOrganisationProfile: createAsyncThunk<
    void,
    never,
    {
      state: RootState // provides getState w/ slice state
    }
  >('organisation/actionGetOrganisationProfile', async (_, { dispatch, getState }) => {
    try {
      const response = await api.getOrganisationMe(getState().main.token)
      if (response.data) {
        dispatch(setOrganisationProfile(response.data))
      }
    } catch (error) {
      await dispatch(mainActions.actionCheckApiError(error))
    }
  }),
  actionUpdateOrganisationProfile: createAsyncThunk<
    void,
    OrganisationProfileUpdate & CustomNotification,
    {
      state: RootState // provides getState w/ slice state
    }
  >(
    'organisation/actionUpdateOrganisationProfile',
    async (payload, { dispatch, getState }) => {
      try {
        const { notification, ...organisationPayload } = payload

        const loadingNotification = {
          content: 'saving',
          showProgress: true
        }

        dispatch(addNotification(loadingNotification))
        const response = (
          await Promise.all([
            api.updateOrganisationMe(getState().main.token, organisationPayload),
            await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000))
          ])
        )[0]
        dispatch(setOrganisationProfile(response.data))
        dispatch(removeNotification(loadingNotification))

        const successNotification = notification?.success || {
          content: 'Account details successfully updated',
          color: 'success'
        }
        dispatch(addNotification(successNotification))
      } catch (error) {
        await dispatch(mainActions.actionCheckApiError(error))
      }
    }
  )
}
const organisationSlice = createSlice({
  name: 'organisation',
  initialState,
  reducers: {
    setOrganisationProfile(
      state: OrganisationState,
      { payload }: PayloadAction<OrganisationProfile>
    ) {
      return { ...state, organisationProfile: payload }
    }
  }
})
// Reducers
export default organisationSlice.reducer

// Actions
export const { setOrganisationProfile } = organisationSlice.actions
