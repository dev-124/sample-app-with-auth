import React from 'react'

import { Logo } from '../../images'
import { SmartLink } from '../elements'

export const PublicHeader = () => (
  <header className='text-gray-700 body-font'>
    <div className='container mx-auto flex flex-wrap px-1 md:px-2 lg:px-3 flex-row md:flex-row items-center'>
      <nav className='md:ml-auto md:mr-auto flex flex-wrap items-center justify-center text-center'>
        <SmartLink
          to='/'
          className='flex order-first lg:order-none title-font font-medium items-center text-green-900 lg:items-center lg:justify-center'
        >
          <Logo />
        </SmartLink>
        <SmartLink
          className='mx-auto md:mx-4 lg:mx-6 xl:mx-8 font-semibold hover:opacity-75 outline border border-green-400 text-green-900 py-3 px-8 rounded-sm w-1/2'
          to='/'
        >
          Overview
        </SmartLink>
        <SmartLink className='mx-auto py-3 block hover:opacity-75' to='/app/login'>
          login
        </SmartLink>
      </nav>
    </div>
  </header>
)
