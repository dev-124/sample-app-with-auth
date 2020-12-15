import { navigate } from '@reach/router'
import React from 'react'
import { CellProps, TableInstance } from 'react-table'

import { ActiveBadge, SelectColumnFilter, Table } from '../../components'
import { OrganisationProfile, UserProfile } from '../../interfaces'
import { Subscription } from '../../interfaces/subscription'

const columns = [
  {
    Header: 'Organisation Info',
    columns: [
      {
        Header: 'Natural Name',
        accessor: 'natural_name',
        filter: 'fuzzyText'
      },
      {
        Header: 'Trade Name',
        accessor: 'trade_name',
        filter: 'fuzzyText'
      },
      {
        Header: 'Trade Number',
        accessor: 'trade_number',
        filter: 'fuzzyText'
      },
      {
        Header: 'Address',
        accessor: 'address',
        filter: 'fuzzyText'
      },
      {
        Header: 'Postal Code',
        accessor: 'postal_code',
        filter: 'fuzzyText'
      },
      {
        Header: 'Country',
        accessor: 'country',
        Filter: SelectColumnFilter,
        filter: 'includes'
      },
      {
        Header: 'Telephone',
        accessor: 'telephone',
        filter: 'fuzzyText'
      },
      {
        Header: 'Subscriptions',
        accessor: 'subscriptions',
        Filter: false,
        Cell: (props: CellProps<never>) =>
          props.value?.map((subscription: Subscription) => subscription.title) || ''
      },
      {
        Header: 'Invoices',
        accessor: 'invoices',
        Filter: false
      },
      {
        Header: 'Is Active',
        accessor: (o: OrganisationProfile) => o.is_active.toString(),
        Filter: SelectColumnFilter,
        filter: 'includes',
        // eslint-disable-next-line react/display-name
        Cell: (props: CellProps<never>) => <ActiveBadge isActive={props.value} />
      },
      {
        Header: 'Members',
        accessor: 'members',
        Filter: false,
        Cell: (props: CellProps<never>) =>
          props.value?.map((member: UserProfile) => `${member.full_name} `) || ''
      }
    ]
  }
]

export const OrganisationTable = ({
  organisations
}: OrganisationTableProps): JSX.Element => {
  return (
    <Table<OrganisationProfile>
      columns={columns}
      data={organisations}
      onAdd={() => navigate('/app/admin/organisations/create')}
      onEdit={({ selectedFlatRows }: TableInstance<OrganisationProfile>) => {
        navigate(`/app/admin/organisations/edit/${selectedFlatRows[0].original.id}`)
      }}
    />
  )
}

export interface OrganisationTableProps {
  organisations: OrganisationProfile[]
}
