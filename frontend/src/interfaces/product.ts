import { enumHelpers } from './enum-helpers'
import { Group } from './group'

enum ProductType {
  PRODUCT,
  SERVICE,
  EXPERIENCE
}
export const productTypeValues = enumHelpers.getNames(ProductType)
export interface ProductBase {
  id: number
  title: string
  description?: string
  product_type: ProductType
  groups?: Group[]
}

export type ProductProfile = IndexApi<ProductProfile> & Readonly<ProductBase>

export type ProductProfileUpdate = Partial<ProductBase>

export interface ProductProfileCreate extends Partial<ProductBase> {
  title: string
  product_type: ProductType
}
