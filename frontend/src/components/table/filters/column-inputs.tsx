/* eslint-disable @typescript-eslint/no-explicit-any */
import { nanoid } from 'nanoid'
import React, { useEffect, useState } from 'react'
import { UseFiltersColumnProps, UseTableColumnProps } from 'react-table'

interface ColumnFilterProps {
  column: UseFiltersColumnProps<any> &
    UseTableColumnProps<any> & {
      id: number
    }
}

// Define a default UI for filtering
export const DefaultColumnFilter = ({
  column: { id, index, filterValue, setFilter, render }
}: ColumnFilterProps) => {
  const [value, setValue] = useState(filterValue || '')
  // const count = preFilteredRows.length
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  // ensure that reset loads the new value
  useEffect(() => {
    setValue(filterValue || '')
  }, [filterValue])

  return (
    <label htmlFor={id || index}>
      <input
        className='block text-left my-1 mx-2 p-1 focus:outline-none border-b border-gray-100 focus:border-blue-600'
        id={id || index}
        onChange={handleChange}
        onBlur={(e) => {
          setFilter(e.target.value || undefined)
        }}
        value={value}
        placeholder={render('Header')?.toString()}
      />
    </label>
  )
}

// This is a custom filter UI for selecting
// a unique option from a list
export const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id }
}: ColumnFilterProps) => {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const optionsSet = new Set<string | number>()
    preFilteredRows.forEach((row) => {
      optionsSet.add(row.values[id].toString())
    })
    return [...optionsSet.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      className='mx-auto w-24 p-1 ml-2 mt-1 bg-gray-100 rounded-sm text-center focus:outline-none'
      onBlur={(e) => {
        setFilter(e.target.value || undefined)
      }}
      onChange={(e) => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value=''>All</option>
      {options.map((option) => (
        <option key={nanoid()} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export const NumberRangeColumnFilter = ({
  column: { filterValue = [], preFilteredRows, setFilter, id }
}: ColumnFilterProps) => {
  const [min, max] = React.useMemo(() => {
    let minVal = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let maxVal = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach((row) => {
      minVal = Math.min(row.values[id], minVal)
      maxVal = Math.max(row.values[id], maxVal)
    })
    return [minVal, maxVal]
  }, [id, preFilteredRows])

  return (
    <div className='flex flex-row align-middle mt-1'>
      <input
        value={filterValue[0] || ''}
        type='number'
        onChange={(e) => {
          const val = e.target.value
          setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
        }}
        placeholder={`Min (${min})`}
        className='w-20 p-1 mx-1 text-left  focus:outline-none border-b border-gray-100 focus:border-blue-600'
      />
      <div className='mr-4'>to</div>
      <input
        value={filterValue[1] || ''}
        type='number'
        onChange={(e) => {
          const val = e.target.value
          setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
        }}
        placeholder={`Max (${max})`}
        className='w-20 p-1 mx-1 text-left  focus:outline-none border-b border-gray-100 focus:border-blue-600'
      />
    </div>
  )
}
