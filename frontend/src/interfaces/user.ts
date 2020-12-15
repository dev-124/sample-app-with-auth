import { OrganisationProfile } from './organisation'

export interface UserBase {
  id: number
  email: string
  password?: string
  is_active: boolean
  is_superuser: boolean
  full_name: string
  organisations: OrganisationProfile[]
  active_organisation: number
}

export type UserProfile = IndexApi<UserProfile> & Readonly<UserBase>

export type UserProfileUpdate = Partial<UserBase>

export interface UserProfileCreate extends Partial<UserBase> {
  email: string
  full_name: string
  password: string
  is_active?: boolean
  is_superuser?: boolean
}
