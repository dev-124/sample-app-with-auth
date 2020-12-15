import Popover, { positionRight } from '@reach/popover'
import React, { ReactElement, useEffect, useState } from 'react'
import { CgDetailsMore } from 'react-icons/cg'
import { MdAdd, MdEdit, MdFilterList, MdRemove, MdViewColumn } from 'react-icons/md'
import { TableInstance } from 'react-table'

import { TableMouseEventHandler } from '../../declarations'
import { ColumnFilterOptions } from './column-filter-options'
import { ColumnHideOptions } from './column-hide-options'

export function TableToolbar({
  instance,
  popoverTargetRef,
  onAdd,
  onView,
  onDelete,
  onEdit
}: TableToolbarProps): ReactElement | null {
  const { allColumns } = instance

  const [activeFilter, setActiveFilter] = useState('')

  const isActive = (name: string) => activeFilter === name
  const styleBtn = (name: string) => {
    let style =
      'focus:outline-none hover:bg-gray-200 hover:text-blue-600 rounded-sm transition  py-2 px-3 disabled:opacity-25'
    if (isActive(name)) {
      style = style.concat(' bg-gray-200 border-t-2 border-blue-600')
    }
    return style
  }

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveFilter('')
      }
    }
    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [])

  const showFilterOptions = () => {
    switch (activeFilter) {
      case 'show-hide-columns':
        return <ColumnHideOptions instance={instance} />
      case 'filter-columns':
        return <ColumnFilterOptions instance={instance} />
      default:
        return ''
    }
  }
  const handleFilterToggle = (name: string) => {
    if (activeFilter === name) return setActiveFilter('')
    return setActiveFilter(name)
  }

  const { state } = instance
  return (
    <div className='flex flex-col'>
      <div className='self-end border-t border-gray-200'>
        {activeFilter !== '' ? (
          <Popover targetRef={popoverTargetRef} position={positionRight}>
            {showFilterOptions()}
          </Popover>
        ) : (
          ''
        )}
      </div>
      <div className='inline-flex w-full space-x-4 text-blue-900'>
        {onAdd && (
          <button
            type='button'
            onClick={() => onAdd(instance)}
            title='Add'
            className={styleBtn('onadd')}
            disabled={Object.keys(state.selectedRowIds).length !== 0}
          >
            <MdAdd size={40} />
          </button>
        )}
        {onView && (
          <button
            type='button'
            className={styleBtn('view')}
            onClick={() => onView(instance)}
            title='View'
            disabled={Object.keys(state.selectedRowIds).length !== 1}
          >
            <CgDetailsMore size={32} />
          </button>
        )}
        {onEdit && (
          <button
            type='button'
            className={styleBtn('edit')}
            onClick={() => onEdit(instance)}
            title='Edit'
            disabled={Object.keys(state.selectedRowIds).length !== 1}
          >
            <MdEdit size={32} />
          </button>
        )}

        {onDelete && (
          <button
            type='button'
            className={styleBtn('delete')}
            onClick={() => onDelete(instance)}
            title='Delete'
            disabled={Object.keys(state.selectedRowIds).length === 0}
          >
            <MdRemove size={38} />
          </button>
        )}
        <div className='inline-flex justify-end w-full space-x-4 text-blue-900'>
          {allColumns.length > 1 && (
            <button
              type='button'
              className={styleBtn('show-hide-columns')}
              onClick={() => handleFilterToggle('show-hide-columns')}
              title='show or hide columns'
            >
              <MdViewColumn size={38} />
            </button>
          )}
          <button
            type='button'
            className={styleBtn('filter-columns')}
            onClick={() => handleFilterToggle('filter-columns')}
            title='filter columns'
          >
            <MdFilterList size={38} />{' '}
          </button>
        </div>
      </div>
    </div>
  )
}

interface TableToolbarProps {
  instance: TableInstance
  popoverTargetRef: React.RefObject<HTMLElement>
  onAdd?: TableMouseEventHandler
  onView?: TableMouseEventHandler
  onDelete?: TableMouseEventHandler
  onEdit?: TableMouseEventHandler
}
