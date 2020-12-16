import React from 'react'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { useSelector } from 'react-redux'

import { SmartLink } from '../../components'
import type { RootState } from '../../store'

export const Dashboard = () => {
  const userProfile = useSelector(({ main }: RootState) => main.userProfile)
  const greetedUser = (): string => {
    if (!userProfile) return ''
    if (userProfile.full_name) {
      return userProfile.full_name
    }
    return userProfile.email
  }
  return (
    <div className='mx-auto w-full md:w-5/6 lg:w-4/5 2xl:w-2/3 3x:1/2'>
      <h2>Dashboard</h2>
      <p>Welcome, {greetedUser()}!</p>
      {userProfile?.active_organisation ? (
        <div className='grid grid-flow-col grid-cols-3 gap-3 md:gap-4 text-center'>
          <div className='py-3 md:py-6 flex'>
            <div className='border w-full border-gray-300 shadow-sm rounded-lg'>
              <IoIosNotificationsOutline style={{ margin: 10 }} size={36} fill='black' />
              <h2 className='title-font font-medium text-gray-900'>2</h2>
              <p className='leading-relaxed'>Alerts</p>
              <div className='inline-flex w-full border-b border-gray-400 rounded-b-sm text-blue-700'>
                <SmartLink
                  to='/app/alerts/view'
                  className='w-full py-3 pl-4 text-left block rounded bg-white hover:bg-gray-100'
                >
                  view
                </SmartLink>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex py-6'>
          <div className='mx-auto border-4 rounded border-red-500 shadow p-12'>
            No (active) organisation
          </div>
        </div>
      )}
      <h3>Messages</h3>
      <div className='w-full px-2 py-2'>
        <dl>
          <div className='px-2 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className=' leading-5 font-medium text-blue-700'>today</dt>
            <dd className='mt-1 leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
              example service message
            </dd>
          </div>
        </dl>
      </div>
      <h3> Actions </h3>
      <div className='flex items-start p-4'>
        <SmartLink
          to='/app/profile/view'
          className='inline-flex font-semibold my-4 mr-2 py-2 px-4 rounded focus:outline-none bg-blue-800 hover:bg-blue-900 text-gray-50'
        >
          Settings
        </SmartLink>
      </div>
    </div>
  )
}
