import React from 'react'

import { SmartLink } from '../../components'
import { OrganisationProfile } from '../../interfaces'

export const OrganisationTableRows = ({
  organisations
}: OrganisationTableRowProps): JSX.Element => (
  <table>
    <tbody>
      {organisations.map((organisation) => (
        <tr key={organisation.id} className='whitespace-nowrap'>
          <td colSpan={organisations.length}>
            <SmartLink
              tabIndex={organisation.id}
              to={`/app/admin/organisations/edit/${organisation.id}`}
              className='cursor-pointer px-2 py-1 my-1 rounded-sm font-semibold text-white bg-blue-800 hover:bg-blue-600'
            >
              {organisation.natural_name}
            </SmartLink>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

export interface OrganisationTableRowProps {
  organisations: OrganisationProfile[]
}
