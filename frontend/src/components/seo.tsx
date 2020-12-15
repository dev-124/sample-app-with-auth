import React from 'react'
import { Helmet } from 'react-helmet'

import { useSiteMetadata } from '../hooks'
import locales from '../locales/i18n-es6'

const getTwitterHandle = (val: string) => {
  if (!val || val === '') return ''
  if (val.startsWith('@')) return val
  const re = /\/[^\\/]+\/([^\\.]+)/
  const explUrl = re.exec(val) || ['', '']
  if (!explUrl[1]) return ''
  const name = explUrl[1].substring(0, explUrl[1].indexOf('?'))
  return `@${name}`
}

export const SEO = ({
  title,
  description,
  metaData = [],
  lang = 'en',
  keywords = [],
  isBlogPost = false
}: SeoProps): JSX.Element => {
  const {
    defaultSiteUrl,
    name: siteTitle,
    description: siteMetadataDescription,
    author,
    siteUrl: localizedSiteUrl, // localized in gatsby-config
    social
  } = useSiteMetadata()
  const metaDescription = description || siteMetadataDescription
  return (
    <>
      <Helmet
        htmlAttributes={{
          lang
        }}
        title={title}
        titleTemplate={`%s | ${siteTitle}`}
        meta={[
          {
            name: 'author',
            content: author
          },
          // Google / Search Engine Tags
          {
            itemProp: 'name',
            content: title
          },
          {
            name: 'description',
            content: metaDescription
          },
          {
            itemProp: 'description',
            content: metaDescription
          },
          // Facebook / Linkedin / Pinterest & Other Meta Tags
          {
            property: 'og:title',
            content: title
          },
          {
            property: 'og:description',
            content: metaDescription
          },
          {
            property: 'og:type',
            content: isBlogPost ? 'article' : 'website'
          },
          // Pinterest
          {
            property: 'og:site_name',
            content: siteTitle
          },
          {
            property: 'og:url',
            content: localizedSiteUrl
          }
        ]
          .concat(
            social.twitter !== ''
              ? // -- Twitter Meta Tags --
                [
                  {
                    name: 'twitter:card',
                    content: 'summary'
                  },
                  {
                    name: 'twitter:creator',
                    content: getTwitterHandle(social.twitter || '')
                  },
                  {
                    name: 'twitter:title',
                    content: title
                  },
                  {
                    name: 'twitter:description',
                    content: metaDescription
                  }
                ]
              : []
          )
          .concat(
            keywords.length > 0
              ? {
                  name: 'keywords',
                  content: keywords.join(', ')
                }
              : []
          )
          .concat(metaData)}
      />
      {Object.keys(locales).map((langKey: string) => {
        const postFix = `/${locales[langKey].path}`
        const removeTrailingSlash = (path: string) =>
          path === `/` ? path : path.replace(/\/$/, ``)
        // check if locale is current locale
        if (removeTrailingSlash(localizedSiteUrl) === `${defaultSiteUrl}${postFix}`) {
          return <link key={langKey} hrefLang={langKey} href={localizedSiteUrl} />
        }
        // use root and postFix for alternate link
        return (
          <link
            key={langKey}
            rel='alternate'
            hrefLang={langKey}
            href={`${defaultSiteUrl}${postFix}`}
          />
        )
      })}
    </>
  )
}

export interface SeoProps {
  isBlogPost?: boolean
  description?: string
  lang?: string
  metaData?: []
  keywords?: string[]
  title: string
}
