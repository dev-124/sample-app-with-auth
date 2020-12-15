import React from 'react'
import { useSelector } from 'react-redux'

import { PrivateHeader, PublicHeader, SEO } from '../components'
import { NotificationsManager } from '../features'
import type { RootState } from '../store'

export const Layout = ({ children }: LayoutProps) => {
  const readIsLoggedIn = useSelector(({ main }: RootState) => main.isLoggedIn)

  const Header = readIsLoggedIn ? PrivateHeader : PublicHeader

  return (
    <div className='max-w-screen responsive-text'>
      <SEO title='Gatsby Sample App with Auth' />
      <Header />
      <NotificationsManager>
        <main className='px-2 sm:px-4 lg:px-6'>{children}</main>
      </NotificationsManager>
    </div>
  )
}

export default Layout

interface LayoutProps {
  children:
    | React.ElementType
    | React.ReactElement
    | React.ComponentType
    | React.FC
    | React.ComponentClass
    | React.Component
    | React.ReactNode
}
