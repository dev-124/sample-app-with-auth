const env = process.env.GATSBY_ACTIVE_ENV

let envApiUrl = ''

if (env === 'production') {
  envApiUrl = `https://${process.env.GATSBY_DOMAIN_PROD}`
} else if (env === 'staging') {
  envApiUrl = `https://${process.env.GATSBY_DOMAIN_STAG}`
} else {
  envApiUrl = `http://${process.env.GATSBY_DOMAIN_DEV}`
}

export const apiUrl = envApiUrl
