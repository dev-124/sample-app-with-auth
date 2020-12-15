import { enumHelpers } from './enum-helpers'
import { Subscription } from './subscription'
import type { UserProfile } from './user'

export enum Sector {
  FINANCIAL,
  ENERGY_AND_UTILITIES,
  SERVICES,
  INDUSTRIAL,
  TECHNOLOGY,
  CONSUMER_GOODS
}

export const sectorValues = enumHelpers.getNames(Sector)

export interface OrganisationBase {
  id: number
  is_active: boolean
  natural_name: string
  trade_name: string
  trade_number?: string
  sector?: Sector
  address: string
  postal_code: string
  telephone: string
  country: string
  members?: UserProfile[]
  products?: string[]
  subscriptions?: Subscription[]
  invoices?: SamePropTypeOnly<string>[]
}

export type OrganisationProfile = IndexApi<OrganisationProfile> &
  Readonly<OrganisationBase>

export type OrganisationProfileUpdate = Partial<OrganisationBase>

export interface OrganisationProfileCreate extends Partial<OrganisationBase> {
  natural_name: string
  trade_name: string
  trade_number: string
  address: string
  country: string
  postal_code: string
  telephone: string
  sector: Sector
}
