import { Row } from 'react-table'

import { apiUrl } from './env'
import {
  OrganisationProfile,
  OrganisationProfileCreate,
  OrganisationProfileUpdate,
  UserProfile,
  UserProfileCreate,
  UserProfileUpdate
} from './interfaces'
import { createClient } from './utils/create-client'

function setHeaders(token?: string) {
  const config: SamePropTypeOnly<string> = {
    // put additional headers here
  }
  if (token) {
    config.Authorization = `Bearer ${token}`
  }
  return { headers: config }
}

const client = createClient({
  baseURL: apiUrl
})

export const userEndpoints = {
  async logInGetToken(username: string, password: string) {
    const params = new URLSearchParams()
    params.append('username', username)
    params.append('password', password)

    return client.post(`${apiUrl}/api/v1/login/access-token`, params)
  },
  async getMe(token: string) {
    return client.get<UserProfile>(`${apiUrl}/api/v1/users/me`, setHeaders(token))
  },
  async updateMe(token: string, data: UserProfileUpdate) {
    return client.put<UserProfile>(`${apiUrl}/api/v1/users/me`, data, setHeaders(token))
  },
  async getUsers(token: string) {
    return client.get<UserProfile[]>(`${apiUrl}/api/v1/users/`, setHeaders(token))
  },
  async updateUser(token: string, userId: number, data: UserProfileUpdate) {
    return client.put(`${apiUrl}/api/v1/users/${userId}`, data, setHeaders(token))
  },
  async createUser(token: string, data: UserProfileCreate) {
    return client.post(`${apiUrl}/api/v1/users/`, data, setHeaders(token))
  },
  async removeUser(token: string, userId: number) {
    return client.delete<UserProfile>(
      `${apiUrl}/api/v1/users/${userId}`,
      setHeaders(token)
    )
  },
  async removeUsers(token: string, users: Row<UserProfile>[]) {
    const promiseArray = users.map((user) =>
      client.delete<UserProfile>(
        `${apiUrl}/api/v1/users/${user.original.id}`,
        setHeaders(token)
      )
    )
    return Promise.all(promiseArray)
  },
  async passwordRecovery(email: string) {
    return client.post(`${apiUrl}/api/v1/password-recovery/${email}`)
  },
  async resetPassword(password: string, token: string) {
    return client.post(`${apiUrl}/api/v1/reset-password/`, {
      new_password: password,
      token
    })
  }
}
export const organisationEndpoints = {
  async getOrganisationMe(token: string) {
    return client.get<OrganisationProfile>(
      `${apiUrl}/api/v1/organisations/me`,
      setHeaders(token)
    )
  },
  async updateOrganisationMe(token: string, data: OrganisationProfileUpdate) {
    return client.put<OrganisationProfile>(
      `${apiUrl}/api/v1/organisations/me`,
      data,
      setHeaders(token)
    )
  },
  async getOrganisations(token: string) {
    return client.get<OrganisationProfile[]>(
      `${apiUrl}/api/v1/organisations/`,
      setHeaders(token)
    )
  },
  async updateOrganisation(
    token: string,
    organisationId: number,
    data: OrganisationProfileUpdate
  ) {
    return client.put(
      `${apiUrl}/api/v1/organisations/${organisationId}`,
      data,
      setHeaders(token)
    )
  },
  async createOrganisation(token: string, data: OrganisationProfileCreate) {
    return client.post(`${apiUrl}/api/v1/organisations/`, data, setHeaders(token))
  }
}

export const api = { ...userEndpoints, ...organisationEndpoints }
