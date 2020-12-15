import { nanoid } from 'nanoid'
import React from 'react'
import { IoMdArrowDown, IoMdArrowUp } from 'react-icons/io'
import { HeaderGroup } from 'react-table'

export const TableHeader = ({ headerGroups }: TableHeaderProps): JSX.Element => (
  <thead>
    {headerGroups.map((headerGroup) => (
      <tr {...headerGroup.getHeaderGroupProps()} key={nanoid()}>
        {headerGroup.headers.map((column) => (
          <th
            className='px-6 py-2 bg-gray-50 text-left text-sm font-medium text-gray-600 uppercase tracking-wider'
            {...column.getHeaderProps()}
            scope='col'
            key={nanoid()}
          >
            <span
              {...column.getSortByToggleProps()}
              className='inline-flex flex-row h-8 flex-nowrap justify-between items-center'
            >
              {column.render('Header')}
              {/* eslint-disable-next-line no-nested-ternary */}
              {column.isSorted ? (
                column.isSortedDesc ? (
                  <IoMdArrowDown size={28} className='mx-1 -mt-1 text-blue-800' />
                ) : (
                  <IoMdArrowUp size={28} className='mx-1 -mt-1 text-blue-800' />
                )
              ) : (
                ''
              )}
            </span>
          </th>
        ))}
      </tr>
    ))}
  </thead>
)

interface TableHeaderProps {
  headerGroups: HeaderGroup<Record<string, unknown>>[]
}
