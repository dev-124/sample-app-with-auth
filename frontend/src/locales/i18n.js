// es5 node imports for gatsby compatability

// eslint-disable-next-line @typescript-eslint/no-var-requires
const enMetadata = require('./site-metadata/en.json')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const enTranslations = require('./translations/en.json')

module.exports = {
  en: {
    default: true,
    path: '',
    locale: 'en-UK',
    dateFormat: 'DD MMMM YYYY',
    siteLanguage: 'en',
    ogLanguage: 'en_UK',
    title: enTranslations.localization.title,
    description: enTranslations.localization.description,
    siteMetadata: enMetadata
  }
  // nl: {
  //   default: false,
  //   path: 'nl',
  //   locale: 'nl-NL',
  //   dateFormat: 'DD MMMM YYYY',
  //   siteLanguage: 'nl',
  //   ogLanguage: 'nl_NL',
  //   title: nlTranslations.localization.title,
  //   description: nlTranslations.localization.description,
  //   siteMetadata: nlMetadata
  // }
  //   de: {
  //   default: false,
  //     path: 'de',
  //     locale: 'de-DE',
  //     dateFormat: 'DD.MM.YYYY',
  //     siteLanguage: 'de',
  //     ogLanguage: 'de_DE',
  //     defaultTitle: 'i18n mit Gatsby nutzen',
  //     defaultDescription: 'Gatsby Beispielseite'
  //   }
}
