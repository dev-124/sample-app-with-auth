import React from 'react'

export const ActiveBadge = ({ isActive }: ActiveBadgeProps): JSX.Element => (
  <span className='relative inline-block align-middle text-center px-4 py-2 leading-5'>
    <span
      aria-hidden
      className={`absolute inset-0 ${
        isActive === 'true' ? 'bg-success text-green-800' : 'bg-error text-red-800'
      } opacity-50 rounded-sm`}
    />
    <span className='relative text-sm font-semibold '> {isActive.toString()}</span>
  </span>
)

interface ActiveBadgeProps {
  isActive: string
}
