/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { nanoid } from 'nanoid'
import React, { forwardRef, useEffect, useRef } from 'react'
import {
  Column,
  TableToggleAllRowsSelectedProps,
  useFilters,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable
} from 'react-table'

import { TableMouseEventHandler } from '../../declarations'
import { useOverflow } from '../../hooks'
import { DefaultColumnFilter, fuzzyTextFilter } from './filters'
import { TableHeader } from './table-header'
import { TablePagination } from './table-pagination'
import { TableToolbar } from './table-toolbar'

// eslint-disable-next-line react/display-name
const IndeterminateCheckbox = forwardRef(
  ({ indeterminate, ...rest }: TableToggleAllRowsSelectedProps, ref) => {
    const defaultRef = useRef()
    const resolvedRef = ref || defaultRef
    useEffect(() => {
      // @ts-expect-error forward ref ts issue
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])
    return (
      <input
        type='checkbox'
        // @ts-expect-error forward ref ts issue
        ref={resolvedRef}
        {...rest}
        className='block w-6 h-6 -ml-1 rounded-sm'
      />
    )
  }
)

// Be sure to pass our updateMyData and the skipReset option
export const Table: <T>(p: TableProps<T>) => React.ReactElement = ({
  columns,
  data,
  onAdd,
  onView,
  onDelete,
  onEdit
}) => {
  // , updateMyData, skipReset PROPS
  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilter
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
      minWidth: 30 // minWidth is only used as a limit for resizing
      //   Cell: EditableCell,
    }),
    []
  )

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      disableMultiSort: true
    },
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    // Here we will use a plugin to add our selection column
    (hooks) => {
      hooks.visibleColumns.push((cols) => {
        return [
          {
            id: 'selection',
            // The header can use the table's getToggleAllRowsSelectedProps method to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method to the render a checkbox
            Cell: ({ row }) => (
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            )
          },
          ...cols
        ]
      })
    }
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page // Instead of using 'rows', use page,
    // which has only the rows for the active page
  } = tableInstance

  // check if table is overflowing to apply visual hint for better ux
  const tableElementRef = useRef<HTMLDivElement>(null)
  // popover examples https://github.com/reach/reach-ui/search?q=position%3D%7B
  const popoverTargetRef = React.useRef<HTMLDivElement>(null)
  const { refXOverflowing } = useOverflow(tableElementRef)
  return (
    <div className='flex flex-col min-h-80'>
      <div className='align-middle inline-block' ref={popoverTargetRef}>
        <TableToolbar
          instance={tableInstance}
          popoverTargetRef={popoverTargetRef}
          {...{ onAdd, onView, onDelete, onEdit }}
        />
        <div className='flex flex-row'>
          <div
            className='w-4/5 shadow sm:rounded-sm overflow-x-auto min-w-full border-b border-r border-gray-300 border-opacity-80'
            ref={tableElementRef}
          >
            <table {...getTableProps()} className='w-full divide-y divide-gray-200 px-2'>
              <TableHeader headerGroups={headerGroups} />
              <tbody
                {...getTableBodyProps()}
                className='bg-white divide-y divide-gray-200 '
              >
                {page.map((row) => {
                  prepareRow(row)
                  return (
                    <tr
                      {...row.getRowProps()}
                      key={nanoid()}
                      className={`${row.isSelected ? 'bg-blue-50' : ''} `}
                    >
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            key={nanoid()}
                            className='px-6 py-4 whitespace-nowrap'
                          >
                            {cell.isPlaceholder ? null : cell.render('Cell')}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {refXOverflowing ? (
            <div className='w-3 -ml-3 bg-gradient-to-r from-transparent  via-gray-300 to-blue-800 z-10 opacity-25 '>
              <div className='w-3 block h-full ' />
            </div>
          ) : (
            ''
          )}
        </div>
        <TablePagination instance={tableInstance} />
      </div>
    </div>
  )
}

interface TableProps<T> {
  columns: Column[]
  data: T[]
  onAdd?: TableMouseEventHandler
  onView?: TableMouseEventHandler
  onDelete?: TableMouseEventHandler
  onEdit?: TableMouseEventHandler
}
