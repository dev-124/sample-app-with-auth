import React from 'react'

import { AppNotification } from '../../interfaces'

export const Notification = ({
  color = 'success',
  created_at,
  content,
  showProgress,
  handleClose
}: NotificationProps): JSX.Element => (
  <div
    className={`flex flex-col rounded border-l-8 border-${color} shadow-lg rounded-sm bg-opacity-50 animate-appear-grow`}
    role='alert'
  >
    <div className='rounded-tr rounded-br border border-l-0 border-gray-400 py-3 px-2 lg:px-4 shadow-lg bg-white'>
      <span className={`text-${color} text-start uppercase text-xs font-bold`}>
        {color}
      </span>
      <div className='inline-flex justify-center px-4 text-sm text-gray-500'>
        {created_at ? new Date(created_at).getDate() : ''}
      </div>
      <div
        className='inline-flex flex-row w-full flex-nowrap justify-between items-center 
      text-gray-800 rounded-lg'
      >
        <div className=' rounded whitespace-nowrap bg-white font-medium   py-2 px-6 w-3/4 text-start'>
          {content}
        </div>
        {showProgress ? (
          <svg
            className='animate-spin mr-3 h-7 w-7 text-gray-600'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle cx={12} cy={12} r={10} stroke='currentColor' />
            <path
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            />
          </svg>
        ) : (
          ''
        )}
        <button
          type='button'
          className='items-center justify-center align-middle text-blue-900 hover:opacity-90 py-2 px-8 bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-200'
          onClick={() => handleClose()}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)

interface NotificationProps extends AppNotification {
  handleClose: () => void
}
