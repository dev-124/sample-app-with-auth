import React from 'react'
import { MdChevronLeft, MdChevronRight, MdFirstPage, MdLastPage } from 'react-icons/md'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { TableInstance } from 'react-table'

export const TablePagination = ({ instance }: TablePaginationProps): JSX.Element => {
  const btnStyle =
    'focus:outline-none hover:bg-gray-200 rounded-sm transition disabled:opacity-25 p-2 hover:text-gray-800'
  const {
    state: { pageIndex, pageSize },
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
    pageCount,
    pageOptions
  } = instance
  return (
    <div className='flex items-center justify-around text-gray-600 pb-8'>
      <div className='inline-flex w-1/2 space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8'>
        <button type='button' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          <MdFirstPage className={btnStyle} size={52} />
        </button>{' '}
        <button type='button' onClick={() => previousPage()} disabled={!canPreviousPage}>
          <MdChevronLeft className={btnStyle} size={52} />
        </button>{' '}
        <button type='button' onClick={() => nextPage()} disabled={!canNextPage}>
          <MdChevronRight className={btnStyle} size={52} />
        </button>{' '}
        <button
          type='button'
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          <MdLastPage className={btnStyle} size={52} />
        </button>{' '}
      </div>
      <div className='w-2/4 mx-auto px-1'>
        <span className='mx-1'>
          Page <strong>{pageIndex + 1} </strong> of {pageOptions.length}
        </span>
      </div>
      <div className='w-34 inline-flex px-1 items-center whitespace-nowrap relative leading-tight'>
        <span className='mx-1'>Rows </span>
        <select
          value={pageSize}
          className='px-4 ml-1 w-20 h-10 rounded-sm  appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 shadow focus:shadow-outline border border-gray-300 hover:border-gray-500'
          onBlur={(e) => {
            setPageSize(Number(e.target.value))
          }}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((pageRowSize) => (
            <option key={pageRowSize} value={pageRowSize}>
              {pageRowSize}
            </option>
          ))}
        </select>
        <div className='pointer-events-none appearance-none absolute inset-y-0 right-1 flex items-center text-gray-800 rounded-r-sm'>
          <RiArrowDropDownLine size={32} />
        </div>
      </div>
    </div>
  )
}
interface TablePaginationProps {
  instance: TableInstance
}
