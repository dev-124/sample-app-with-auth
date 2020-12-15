import React, { useEffect } from 'react'
import { useSelector } from 'react-redux' // hooks alternative to connect

import type { RootState } from '../../store'
import { useAppDispatch } from '../../store'
import { adminActions } from './admin-slice'
import { OrganisationTable } from './organisation-table'

export const AdminListOrganisations = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(adminActions.actionGetOrganisations())
  }, [dispatch])

  const organisations = useSelector(({ admin }: RootState) => admin.organisations)

  return (
    <div className='mx-auto w-full md:w-7/8 3xl:w-5/6'>
      <h2>Manage Organisations </h2>
      <OrganisationTable organisations={organisations} />
    </div>
  )
}
