/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
// note: todo resolve linter errors

import { useCombobox, useMultipleSelection } from 'downshift'
import React, { useState } from 'react'

interface SelectMultiProps<T> {
  handleSelectedItemChange: (changes: IndexApi<T>[]) => void
  initialSelectedItems: IndexApi<T>[]
  items: IndexApi<T>[]
  labelKey: string
  labelDetailsKey: string
  filterKeys?: string[]
}

export const SelectMulti: <T>(p: SelectMultiProps<T>) => React.ReactElement = ({
  handleSelectedItemChange,
  initialSelectedItems,
  items,
  labelKey = 'label',
  labelDetailsKey = ''
}) => {
  const [inputValue, setInputValue] = useState('')

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems
  } = useMultipleSelection({
    initialSelectedItems,
    onSelectedItemsChange: ({ selectedItems: s = [] }) => handleSelectedItemChange(s)
  })
  const getFilteredItems = () =>
    items.filter(
      (item) =>
        selectedItems.indexOf(item) < 0 &&
        ((item[labelKey] as unknown) as string)
          .toLowerCase()
          .startsWith(inputValue.toLowerCase())
    )
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,

    getItemProps
  } = useCombobox({
    inputValue,
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    // selectedItem: null,
    items: getFilteredItems(),
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true // keep the menu open after selection.
          }
        // no default
      }
      return changes
    },
    // eslint-disable-next-line @typescript-eslint/no-shadow
    onStateChange: ({ inputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue || '')
          break
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (selectedItem) {
            setInputValue('')
            addSelectedItem(selectedItem)
          }
          break
        default:
          break
      }
    }
  })
  return (
    <div className='border rounded-sm'>
      <label {...getLabelProps()} />
      <div className='block p-2'>
        {selectedItems.map((selectedItem, index) => (
          <span
            key={`selected-item-${index}`}
            {...getSelectedItemProps({ selectedItem, index })}
            className='grid gap-4 grid-cols-3 border border-green-500 w-full my-2 pl-4 rounded-sm'
          >
            <div className='col-start-1 col-span-2 py-2'>{selectedItem[labelKey]}</div>
            <div
              role='button'
              className='col-start-3 flex bg-green-200'
              tabIndex={index}
              onClick={(e) => {
                e.stopPropagation()
                removeSelectedItem(selectedItem)
              }}
              onKeyPress={(e) => {
                e.stopPropagation()
                removeSelectedItem(selectedItem)
              }}
            >
              <div className='m-auto'>&#10005;</div>
            </div>
          </span>
        ))}
        <div {...getComboboxProps()}>
          <input
            {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
            className='min-w-1/2   bg-primary-light rounded-sm border 
            border-gray-200 focus:outline-none focus:border-secondary-blue focus:placeholder-secondary-blue-dark p-2'
          />
          <button
            type='button'
            {...getToggleButtonProps()}
            aria-label='toggle menu'
            className='px-2'
          >
            &#8595;
          </button>
        </div>
      </div>
      <ul
        {...getMenuProps()}
        className='border-l px-2 rounded-sm w-2/3 h-40 overflow-auto'
      >
        {isOpen &&
          getFilteredItems().map((item, index) => (
            <li
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
              className={`${
                highlightedIndex === index ? 'bg-gray-100 font-semibold' : ''
              }`}
            >
              {item[labelKey]}
              <div className='text-blue-300'>({item[labelDetailsKey]})</div>
            </li>
          ))}
      </ul>
    </div>
  )
}
