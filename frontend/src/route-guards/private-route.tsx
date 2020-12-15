import { navigate, RouteComponentProps } from '@reach/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import type { RootState } from '../store'

export const PrivateRoute = ({
  component: Component,
  location,
  ...rest
}: PrivateRouteProps): JSX.Element => {
  const isLoggedIn = useSelector(({ main }: RootState) => main.isLoggedIn)

  useEffect(() => {
    if (isLoggedIn === null) return
    if (isLoggedIn === false && location?.pathname !== 'app/login') {
      navigate('/app/login')
    }
  })

  if (isLoggedIn === null) return <></>

  return <Component {...rest} />
}
export interface PrivateRouteProps extends RouteComponentProps {
  component: React.ElementType | React.ComponentType | React.FC | React.ComponentClass
}
