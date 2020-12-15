import { SiteMetadataJSON } from './site-metadata'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const locales: Locales = require('./i18n')

export interface Locales {
  [key: string]: {
    default: boolean
    path: string
    locale: string
    dateFormat: string
    siteLanguage: string
    ogLanguage: string
    title: string
    description: string
    siteMetadata: SiteMetadataJSON
  }
}

export default locales
