import { nanoid } from 'nanoid'
import React from 'react'

import { SmartLink } from '../elements'

export const Tabs = ({ tabs = [] }: TabProps) => (
  <ul className='flex w-full sm:w-3/4 md:w-1/2 px-4 pb-1 text-gray-800 text-center'>
    {tabs.map((tab) => (
      <SmartLink
        to={tab.to}
        key={nanoid()}
        className='flex-1 mx-2 block rounded-sm hover:bg-gray-300 font-bold py-3 px-6 border border-gray-400 hover:border-blue-800 focus:outline-none hover:text-gray-600'
        activeClassName='border border-blue-800 hover:bg-blue-800 rounded bg-blue-800 text-gray-100'
      >
        <li>{tab.text}</li>
      </SmartLink>
    ))}
  </ul>
)

interface TabProps {
  tabs: TabNavLink[]
}

interface TabNavLink {
  text: string
  to: string
}
