import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import { LocaleContext } from '../locales/locale-context'

const query = graphql`
  query {
    rawData: allFile(filter: { sourceInstanceName: { eq: "translations" } }) {
      edges {
        node {
          name
          translations: childTranslationsJson {
            terms {
              email
              emailPlural
              post
              postPlural
              tag
              tagPlural
              warning
              error
              information
              success
            }
            buttons {
              new
              show
              hide
              save
              confirm
              cancel
              goBack
              continue
              edit
              delete
              add
              create
              copy
              moreInfo
            }
            sections {
              faq
            }
            pages {
              notFoundTitle
              notFoundDescription
              blogTaggedWith
              blogViewAllTags
              contactSuccessTitle
              contactSuccessDescription
              registerSuccessTitle
              registerSuccessDescription
            }
            messages {
              emailRequiredField
              emailIsEmail
              emailSent
            }
          }
        }
      }
    }
  }
`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useTranslations = (): any => {
  // return type is inexable object the same of query fragment

  // Grab the locale (passed through context) from the Context Provider

  // Query the JSON files in <rootDir>/locales/translations
  const { rawData } = useStaticQuery(query)

  const { locale } = React.useContext(LocaleContext) || { locale: 'en' }
  // useContext is undefined in cms preview

  // Simplify the response from GraphQL
  const simplified = rawData.edges.map(
    (item: {
      node: {
        name: string
        translations: string[]
      }
    }) => ({
      name: item.node.name,
      translations: item.node.translations
    })
  )

  // return all translations for the active locale
  const { translations } = simplified.filter(
    (node: LocaleNode): boolean => node.name === locale
  )[0]

  return translations
}

interface LocaleNode {
  name: string
  translations: string[]
}
