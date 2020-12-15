import { RouteComponentProps } from '@reach/router'
import React from 'react'

export const PublicRoute = ({
  component: Component,
  location,
  ...rest
}: PublicRouteProps): JSX.Element => {
  return <Component {...rest} />
}

export interface PublicRouteProps extends RouteComponentProps {
  component: React.ElementType | React.ComponentType | React.FC | React.ComponentClass
}
