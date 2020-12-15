import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

import { sentry } from './catch-error'

export const createClient = (options: AxiosRequestConfig): AxiosInstance => {
  const client = axios.create(options)

  if (!process.env.GATSBY_SENTRY_DNS) return client
  // check at interceptor level that request is valid
  client.interceptors.request.use(
    (res) => res,
    async (error) => {
      sentry.captureException(error)
      // eslint-disable-next-line no-console
      console.warn(': request error :', error.config)
      await sentry.flush(2000)
      throw error
    }
  )

  // check at interceptor level that response is valid
  client.interceptors.response.use(
    (res) => res,
    async (error) => {
      sentry.captureException(error)
      // eslint-disable-next-line no-console
      console.warn(': response error :', error.config)
      await sentry.flush(2000)
      throw error
      // throw always results in 500 - internal server error in submission-created
    }
  )
  return client
}
