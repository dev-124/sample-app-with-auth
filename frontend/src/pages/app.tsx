import { Router } from '@reach/router'
import React, { useEffect } from 'react'

import {
  Dashboard,
  Login,
  OrganisationProfile,
  OrganisationProfileEdit,
  RecoverPassword,
  ResetPassword,
  UserProfile,
  UserProfileEdit,
  UserProfileEditPassword
} from '../features'
import {
  AdminCreateOrganisation,
  AdminCreateUser,
  AdminEditOrganisation,
  AdminEditUser,
  AdminListOrganisations,
  AdminListUsers
} from '../features/admin'
import DefaultLayout from '../layouts/default-layout'
import { AdminRoute, PrivateRoute, PublicRoute } from '../route-guards'
import { mainActions, useAppDispatch } from '../store'

const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(mainActions.actionCheckLoggedIn())
  }, [dispatch])

  return (
    <DefaultLayout>
      <Router>
        <PublicRoute path='/app/login' component={Login} />
        <PublicRoute path='/app/recover-password' component={RecoverPassword} />
        <PublicRoute path='/app/reset-password' component={ResetPassword} />
        <PrivateRoute path='/app/dashboard' component={Dashboard} />
        <PrivateRoute path='/app/profile/view' component={UserProfile} />
        <PrivateRoute path='/app/profile/edit' component={UserProfileEdit} />
        <PrivateRoute path='/app/profile/password' component={UserProfileEditPassword} />
        <PrivateRoute path='/app/organisation/view' component={OrganisationProfile} />
        <PrivateRoute path='/app/organisation/edit' component={OrganisationProfileEdit} />
        <AdminRoute path='/app/admin/users/all' component={AdminListUsers} />
        <AdminRoute path='/app/admin/users/edit/:id' component={AdminEditUser} />
        <AdminRoute path='/app/admin/users/create' component={AdminCreateUser} />
        <AdminRoute
          path='/app/admin/organisations/all'
          component={AdminListOrganisations}
        />
        <AdminRoute
          path='/app/admin/organisations/edit/:id'
          component={AdminEditOrganisation}
        />
        <AdminRoute
          path='/app/admin/organisations/create'
          component={AdminCreateOrganisation}
        />
      </Router>
    </DefaultLayout>
  )
}

export default App
