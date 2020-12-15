import { nanoid } from 'nanoid'
import React, { useCallback } from 'react'
import { TableInstance } from 'react-table'

export const ColumnFilterOptions = ({ instance }: ColumnFilterOptionsProps) => {
  const { allColumns, setAllFilters } = instance
  const filterableColumns = allColumns.filter((column) => !(column.id === 'selection'))

  const resetFilters = useCallback(() => {
    setAllFilters([])
  }, [setAllFilters])

  return (
    <div className='grid gap-x-2 md:gap-x-4 shadow-md bg-white border-t-2 border-b-2 border-blue-700 py-2'>
      <div className='col-start-2 pt-2 px-1 row-span-1 font-semibold flex'>
        Filters
        <div className='inline-flex w-full justify-end'>
          <button
            className='text-blue-600 hover:text-blue-800 rounded justify-end px-4 focus:outline-none'
            type='button'
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>
      </div>
      <div className='grid md:grid-cols-2 col-start-2  gap-x-2 md:gap-x-4 pt-1'>
        {filterableColumns.map((column) => {
          if (!column.Filter) return false
          return (
            <div className='flex flex-row whitespace-nowrap py-2' key={nanoid()}>
              <div className='my-1 py-1'>{column.Header}</div>
              <div className='flex'>{column.render('Filter')}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface ColumnFilterOptionsProps {
  instance: TableInstance
}
