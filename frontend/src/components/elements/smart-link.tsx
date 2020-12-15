// Used to dynamically swap links with appropriate Gatsby links
import { GatsbyLinkProps, Link } from 'gatsby'
import React from 'react'

import locales from '../../locales/i18n-es6'
import { LocaleContext } from '../../locales/locale-context'

const scrollToAnchor = (to: string): void => {
  const el = document.querySelector(`a[href='${to}']`)
  if (!el || el === null) return
  el.scrollIntoView({
    behavior: 'smooth', // smooth is unsupported by safari
    block: 'start' // vertical alignment, center is unsupported by safari
  })
}

const LocalizedLink = ({ children, to, ...props }: SmartLinkProps): JSX.Element => {
  let { locale } = React.useContext(LocaleContext) || { locale: 'en' }
  if (!locale) locale = 'en'

  const isIndex = to === '/'
  // If it's the default language, don't do anything
  // If it's another language, add the "path"
  // However, if the homepage/index page is linked don't add the "to"
  // Because otherwise this would add a trailing slash
  let path = locales[locale].default
    ? to
    : `/${locales[locale].path}${isIndex ? '' : `${to}`}`

  if (!path) path = '/'

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Link to={path} {...props}>
      {children}
    </Link>
  )
}

const validKeyPress = (event: React.KeyboardEvent) => {
  return (
    ['keydown', 'keypress'].includes(event.type) && ['Enter', ' '].includes(event.key)
  )
}

export const SmartLink = ({
  children,
  to = '/',
  activeClassName = 'text-brand-azul',
  ...props
}: GatsbyLinkProps<SmartLinkProps>): JSX.Element => {
  if (to.startsWith('#')) {
    return (
      <a
        role='button'
        tabIndex={0}
        onKeyPress={(e) => {
          if (validKeyPress(e)) scrollToAnchor(to)
        }}
        onClick={() => scrollToAnchor(to)}
        {...props}
      >
        {children}
      </a>
    )
  }

  // This assumes that any internal link (intended for Gatsby)
  // will start with one slash or a hash tag
  const internal = /^\/(?!\/|#)/.test(to)

  // Use Gatsby Link for internal links, and <a> for others
  return internal ? (
    <LocalizedLink to={to} activeClassName={activeClassName} {...props}>
      {children}
    </LocalizedLink>
  ) : (
    <a href={to}>{children}</a>
  )
}

export default SmartLink

export interface SmartLinkProps {
  to?: string
  children?: React.ReactNode
  activeClassName?: string // see GatsbyLink definition for reference
  other?: SamePropTypeOnly<string | null | undefined>
}
