import { nanoid } from 'nanoid'
import React from 'react'
import { HeaderGroup } from 'react-table'

export const TableFooter = ({ footerGroups }: TableFooterProps): JSX.Element => (
  <tfoot className='py-1'>
    {footerGroups.map((group) => (
      <tr {...group.getFooterGroupProps()} key={nanoid()}>
        {group.headers.map((column) => (
          <td {...column.getFooterProps()} key={nanoid()}>
            {column.render('Footer')}
          </td>
        ))}
      </tr>
    ))}
  </tfoot>
)

interface TableFooterProps {
  footerGroups: HeaderGroup<Record<string, unknown>>[]
}
