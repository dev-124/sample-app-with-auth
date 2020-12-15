export interface SiteMetadataJSON {
  siteName: string
  siteShortName: string
  siteDescription: string
  siteAuthor: string
  siteUrl: string
  kvk: string
  siteSocial: SiteSocialMetadata
}
export interface SiteSocialMetadata {
  facebook?: string
  whatsapp?: string
  podcast?: string
  pinboard?: string
  newsletter?: string
  twitter?: string
  linkedin?: string
  youtube?: string
  vimeo?: string
}
