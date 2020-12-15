import { ComponentClass } from 'react'

export interface IAuthRouteProps {
  path: string
  component: ComponentClass
}
export interface IAuthRouteState {
  user: Record<string, unknown> | null // userbase.UserResult
  isLoading: boolean
  page: ComponentClass
}
