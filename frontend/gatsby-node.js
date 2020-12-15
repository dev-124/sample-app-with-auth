/*
 * Implement Gatsby's Node APIs in this file.
 */

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      devtool: false
    })
  }
}

const locales = require(`./src/locales/i18n`)
const { removeTrailingSlash } = require(`./ssg-utils/gatsby-node-helpers`)

exports.onCreatePage = ({ page, actions }) => {
  // re-create pages in /pages/
  const { createPage, deletePage } = actions

  // First delete the incoming/old page that was automatically created by Gatsby
  deletePage(page)

  // Grab the keys ('en' & 'nl') of locales and map over them
  Object.keys(locales).map((locale) => {
    // Use the values defined in "locales" to construct the path
    const localizedPath = locales[locale].default
      ? page.path
      : `/${locales[locale].path}${page.path}`

    // gatsbyjs.org/docs/creating-prefixed-404-pages-for-different-languages/
    // Check if the page is a localized 404
    if (localizedPath.endsWith(`${locales[locale].path}/404/`)) {
      // Get the language code from the path, and match all paths with this code (apart from other valid paths)
      page.matchPath = locales[locale].default ? '/*' : `/${locales[locale].path}/*`
    }

    // create client-side paths by assigning matchPath prop, while still creating regular 404 pages etc.
    if (page.path.match(/^\/app/)) {
      page.matchPath = `/app/*`
    }
    // Recreate the modified pages
    return createPage({
      // Pass on everything from the original page
      ...page,
      // Since page.path returns with a trailing slash (e.g. "/de/")
      // We want to remove that
      path: removeTrailingSlash(localizedPath),
      // Pass in the locale as context to every page
      // This should ensure that the locale is available on every page
      context: {
        ...page.context,
        locale: locale,
        dateFormat: locales[locale].dateFormat
      }
    })
  })
}

// define allSiteMetadata for query resolver and type checking / completion
exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
    interface SiteSocialMetadataShape {
      facebook: String
      whatsapp: String
      podcast: String
      pinboard: String
      newsletter: String
      twitter: String
      linkedin: String
      youtube: String
      vimeo: String
    }
    interface SiteMetadataShape {
      name: String!
      short_name: String!
      description: String!
      author: String!
      siteUrl: String!
      kvk: String!
      social: SiteSocialMetadata!
    }

    type SiteSocialMetadata implements SiteSocialMetadataShape {
      facebook: String
      whatsapp: String
      podcast: String
      pinboard: String
      newsletter: String
      twitter: String
      linkedin: String
      youtube: String
      vimeo: String
    }
    type SiteMetadata implements SiteMetadataShape {
      name: String!
      short_name: String!
      description: String!
      author: String!
      siteUrl: String!
      kvk: String!
      social: SiteSocialMetadata!
    }
  `)
}

// define custom resolver to return siteMetadata by locale
exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    Query: {
      localizedMetadata: {
        type: 'SiteMetadata',
        args: {
          locale: {
            type: 'String' // GraphQLOutputType
          } // no idea how to specify empty args. can sanitize it
        },
        resolve(source, args, context, info) {
          const site = context.nodeModel.getNodeById({
            id: 'Site'
          })
          return site.siteMetadata[args.locale]
        }
      }
    }
  }
  createResolvers(resolvers)
}
