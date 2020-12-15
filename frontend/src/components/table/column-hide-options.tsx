import { nanoid } from 'nanoid'
import React from 'react'
import { TableInstance } from 'react-table'

export const ColumnHideOptions = ({ instance }: ColumnHideOptionsProps) => {
  const { allColumns, toggleHideColumn } = instance
  const hideableColumns = allColumns.filter((column) => !(column.id === 'selection'))
  const checkedCount = hideableColumns.reduce(
    (acc, val) => acc + (val.isVisible ? 0 : 1),
    0
  )

  const oneOptionLeft = checkedCount + 1 >= hideableColumns.length
  // use a nested grid for 2 col layout
  return (
    <div className='grid grid-cols-1 gap-x-5 md:gap-x-10 shadow-md bg-white  border-t-2 border-b-2 border-blue-700 px-4'>
      <div className='col-start-1 p-4 row-span-1 font-semibold'>Show / Hide Columns</div>
      <div className='col-start-1 grid sm:grid-cols-2 md:grid-cols-3 pt-1'>
        {allColumns.map((column) => {
          if (column.id === 'selection') return null
          return (
            <label
              className='whitespace-nowrap h-12 block'
              key={nanoid()}
              htmlFor={column.id}
            >
              <input
                type='checkbox'
                name={column.id}
                value={column.id}
                checked={column.isVisible}
                disabled={column.isVisible && oneOptionLeft}
                onChange={() => toggleHideColumn(column.id, column.isVisible)}
                placeholder={column.id}
                className='w-5 h-5 align-middle mx-4'
              />
              {column.Header}
            </label>
          )
        })}
      </div>
    </div>
  )
}

interface ColumnHideOptionsProps {
  instance: TableInstance
}
