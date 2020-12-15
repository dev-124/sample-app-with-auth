exports.getSitemapForLanguage = (lang, isDefault) => {
  const prefix = isDefault ? '/' : `/${lang}/`
  return {
    resolve: `gatsby-plugin-sitemap`,
    options: {
      output: `${prefix}sitemap.xml`,
      exclude: [`${prefix}404`],
      createLinkInHead: true, // populate the <head> of your site with a link to the sitemap. this is done for each locale and each link is included on every page in metadata
      query: `
      {
        site {
          siteMetadata {
            siteUrl
          }
        }
        allSitePage(filter: {context: {locale: {eq: "${lang}"}}}) {
          edges {
            node {
              path
            }
          }
        }
      }`,
      serialize: ({ site, allSitePage }) =>
        allSitePage.edges.map((edge) => ({
          url: site.siteMetadata.siteUrl + edge.node.path,
          changefreq: `daily`,
          priority: 0.7,
          sitemapSize: 2000 // limit before sitemap is split up into numbered files
        }))
    }
  }
}

exports.generateLocalizedSiteMetaData = (locales, siteUrl, isDefault) => {
  let metadata = {
    siteUrl: siteUrl
    // siteUrl is required by gatsby-plugin-sitemap, plugin-robots.txt
  }

  Object.keys(locales).forEach((locale) => {
    const urlPostfix = isDefault(locale) ? '' : `/${locale}`
    metadata[locale] = {
      name: locales[locale].siteMetadata.siteName,
      short_name: locales[locale].siteMetadata.siteShortName,
      description: locales[locale].siteMetadata.siteDescription,
      author: locales[locale].siteMetadata.siteAuthor,
      siteUrl:
        process.env.npm_lifecycle_event === 'test:e2e'
          ? 'https://localhost:9000'
          : siteUrl + urlPostfix,
      kvk: locales[locale].siteMetadata.kvk,
      social: locales[locale].siteMetadata.siteSocial
    }
  })
  return metadata
}

exports.generateManifestOptions = (locales) => {
  // output can be found at DOMAIN/manifest.webmanifest
  let options = {
    // this plugin should run before plugin offline
    start_url: '/',
    lang: 'en',
    name: 'EXAMPLE',
    short_name: 'EXAMPLE',
    description: 'EXAMPLE DESCRIPTION',
    theme_color: '#4a39a2',
    background_color: '#4a39a2',
    display: 'minimal-ui',
    icon: `src/images/logo.jpg`,
    // enable cache busting mode for gatsby-plugin-offline
    cache_busting_mode: 'none',
    localize: []
  }
  Object.keys(locales).map((locale) => {
    const isDefault = (locale) => locales[locale].default
    const startUrl = isDefault(locale) ? '' : `/${locale}`
    if (isDefault(locale)) {
      ;(options.lang = locale),
        (options.name = locales[locale].siteMetadata.siteName),
        (options.short_name = locales[locale].siteMetadata.siteShortName),
        (options.description = locales[locale].siteMetadata.siteDescription)
    } else {
      options.localize.push({
        start_url: startUrl,
        lang: locale,
        name: locales[locale].siteMetadata.siteName,
        short_name: locales[locale].siteMetadata.siteShortName,
        description: locales[locale].siteMetadata.siteDescription
      })
    }
  })
  return options
}
