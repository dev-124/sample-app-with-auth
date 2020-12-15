import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import { LocaleContext } from '../locales/locale-context'
import { SiteSocialMetadata } from '../locales/site-metadata'

const SiteMetadataQuery = () => {
  return useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultSiteUrl: siteUrl
            en {
              author
              description
              name
              short_name
              siteUrl
              kvk
              social {
                facebook
                whatsapp
                linkedin
                pinboard
                podcast
                vimeo
                youtube
                twitter
                newsletter
              }
            }
            # nl {
            #   author
            #   description
            #   name
            #   short_name
            #   siteUrl
            #   kvk
            #   social {
            #     facebook
            #     whatsapp
            #     linkedin
            #     pinboard
            #     podcast
            #     vimeo
            #     youtube
            #     twitter
            #     newsletter
            #   }
            # }
          }
        }
      }
    `
  )
}

export const useSiteMetadata = (mock?: SiteMetadata): SiteMetadata => {
  const { locale } = React.useContext(LocaleContext) || { locale: 'en' }
  if (mock) return mock

  try {
    const {
      site: { siteMetadata }
    } = SiteMetadataQuery()

    // useContext is undefined in cms preview
    let metaData = {}
    const { defaultSiteUrl } = siteMetadata
    Object.keys(siteMetadata).forEach((key) => {
      if (key === locale) metaData = { defaultSiteUrl, ...siteMetadata[key] }
    })
    return metaData as SiteMetadata
  } catch (ex) {
    // handle cms exception from within contact-from section
    return ({ site: { social: {} } } as unknown) as SiteMetadata
  }
}

export interface SiteMetadata {
  author: string
  description: string
  name: string
  short_name: string
  defaultSiteUrl?: string
  siteUrl: string
  kvk: string
  social: SiteSocialMetadata
  locale: string
}
