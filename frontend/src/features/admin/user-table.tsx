import { navigate } from '@reach/router'
import React from 'react'
import { CellProps, TableInstance } from 'react-table'

import { ActiveBadge, SelectColumnFilter, Table } from '../../components'
import { OrganisationProfile, UserProfile } from '../../interfaces'
import { useAppDispatch } from '../../store'
import { OrganisationTableRows } from '../organisation/organisation-table-rows'
import { adminActions } from './admin-slice'

const columns = [
  {
    Header: 'User Info',
    columns: [
      {
        Header: 'Email',
        accessor: 'email',
        filter: 'fuzzyText'
      },
      {
        Header: 'Full Name',
        accessor: 'full_name',
        filter: 'fuzzyText'
      },
      {
        Header: 'Is Active',
        accessor: (u: UserProfile) => u.is_active.toString(),
        Filter: SelectColumnFilter,
        filter: 'includes',
        // eslint-disable-next-line react/display-name
        Cell: (props: CellProps<never>) => <ActiveBadge isActive={props.value} />
      },
      {
        Header: 'Is Superuser',
        accessor: (u: UserProfile) => u.is_superuser.toString(),
        Filter: SelectColumnFilter,
        // eslint-disable-next-line react/display-name
        Cell: (props: CellProps<never>) => <ActiveBadge isActive={props.value} />
      },
      {
        Header: 'Organisations',
        accessor: 'organisations',
        Filter: false,
        align: 'left',
        // eslint-disable-next-line react/display-name
        Cell: (props: CellProps<OrganisationProfile[]>) => {
          return <OrganisationTableRows organisations={props.value.organisations || []} />
        }
      }
    ]
  }
]

export const UserTable = ({ users }: UserTableProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const removeUser = ({ selectedFlatRows }: TableInstance<UserProfile>) => {
    if (selectedFlatRows.length === 1) {
      dispatch(adminActions.actionRemoveUser({ id: selectedFlatRows[0].original.id }))
    } else {
      dispatch(
        adminActions.actionRemoveUsers({
          users: selectedFlatRows
        })
      )
    }
  }
  return (
    <Table<UserProfile>
      columns={columns}
      data={users}
      onAdd={() => navigate('/app/admin/users/create')}
      onEdit={({ selectedFlatRows }: TableInstance<UserProfile>) => {
        navigate(`/app/admin/users/edit/${selectedFlatRows[0].original.id}`)
      }}
      onDelete={removeUser}
    />
  )
}

export interface UserTableProps {
  users: UserProfile[]
}
