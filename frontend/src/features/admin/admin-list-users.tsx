import React, { useEffect } from 'react'
import { useSelector } from 'react-redux' // hooks alternative to connect

import type { RootState } from '../../store'
import { useAppDispatch } from '../../store'
import { adminActions } from './admin-slice'
import { UserTable } from './user-table'

export const AdminListUsers = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(adminActions.actionGetUsers())
  }, [dispatch])

  const users = useSelector(({ admin }: RootState) => admin.users)

  return (
    <div className='mx-auto w-full md:w-7/8 3xl:w-5/6'>
      <h2>Manage Users </h2>
      <UserTable users={users} />
    </div>
  )
}
