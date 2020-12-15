const locales = require(`./src/locales/i18n`)
const {
  getSitemapForLanguage,
  generateLocalizedSiteMetaData,
  generateManifestOptions
} = require(`./ssg-utils/gatsby-config-helpers`)

if (
  process.env.NODE_ENV === 'development' ||
  process.env.npm_lifecycle_event === 'build:local'
) {
  const result = require('dotenv-safe').config({
    allowEmptyValues: false
  })
  if (result.error) {
    if (result.error.code === 'ENOENT') {
      console.info(`.env error expected and handled appropriately`)
    } else {
      throw result.error
    }
  }
}

const activeEnv = process.env.GATSBY_ACTIVE_ENV
console.log(`Using environment config: '${activeEnv}'`)

let siteUrl = ''

if (activeEnv === 'production') {
  siteUrl = `https://${process.env.GATSBY_DOMAIN_PROD}`
} else if (activeEnv === 'staging') {
  siteUrl = `https://${process.env.GATSBY_DOMAIN_STAG}`
} else {
  siteUrl = `http://${process.env.GATSBY_DOMAIN_DEV}`
}

console.info('siteUrl is ' + siteUrl)

const isDefault = (locale) => locales[locale].default

module.exports = {
  siteMetadata: generateLocalizedSiteMetaData(locales, siteUrl, isDefault),
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `translations`,
        path: `${__dirname}/src/locales/translations`
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-manifest',
      options: generateManifestOptions(locales, isDefault)
    },
    `gatsby-plugin-typescript`,
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [
          require('autoprefixer'),
          require('tailwindcss')('./tailwindcss.config.js')
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteUrl,
        sitemap: Object.keys(locales).map((locale) => {
          const postfix = isDefault(locale) ? '/sitemap.xml' : `/${locale}/sitemap.xml`
          return siteUrl + postfix
        }),
        resolveEnv: () => process.env.GATSBY_ACTIVE_ENV,
        env: {
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }]
          },
          production: {
            policy: [{ userAgent: '*' }]
          }
        }
      }
    }
  ]
}

Object.keys(locales).forEach((locale) => {
  module.exports.plugins.push(getSitemapForLanguage(locale, isDefault))
})
