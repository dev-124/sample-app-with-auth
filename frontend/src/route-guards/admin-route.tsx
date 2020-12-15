import { navigate, RouteComponentProps } from '@reach/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import type { RootState } from '../store'

export const AdminRoute = ({
  component: Component,
  location,
  ...rest
}: AdminRouteProps) => {
  const readHasAdminAccess = useSelector(
    ({ main }: RootState) =>
      main.userProfile && main.userProfile.is_superuser && main.userProfile.is_active
  )
  const isLoggedIn = useSelector(({ main }: RootState) => main.isLoggedIn)

  useEffect(() => {
    if (isLoggedIn === null) return
    if (isLoggedIn === false && location?.pathname !== 'app/login') {
      navigate('/app/login')
    }
    if (!readHasAdminAccess) {
      navigate('/app/dashboard')
    }
  }, [isLoggedIn, location?.pathname, readHasAdminAccess])

  if (isLoggedIn === null) return <></>

  return <Component {...rest} />
}

export interface AdminRouteProps extends RouteComponentProps {
  component: React.ElementType | React.ComponentType | React.FC | React.ComponentClass
}
