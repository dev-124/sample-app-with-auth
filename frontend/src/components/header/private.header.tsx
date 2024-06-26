import React from 'react'
import { useSelector } from 'react-redux'

import { mainActions } from '../../features/main/main-slice'
import { Logo } from '../../images'
import type { RootState } from '../../store'
import { useAppDispatch } from '../../store'
import { SelectOrganisation, SmartLink } from '../elements'
import { Tabs } from '../navigation/tabs'

export const PrivateHeader = () => {
  const dispatch = useAppDispatch()

  const readHasAdminAccess = useSelector(
    ({ main }: RootState) =>
      main.userProfile && main.userProfile.is_superuser && main.userProfile.is_active
  )
  const initial = useSelector(
    ({ main }: RootState) => main.userProfile?.full_name?.charAt(0).toUpperCase() || 'A'
  )
  const organisations = useSelector(
    ({ main }: RootState) => main.userProfile?.organisations
  )

  const isBrowser = typeof window !== `undefined`

  const secondaryNavLinks = () => {
    if (!isBrowser) return false
    // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
    if (window.location.pathname.match('/app/admin/')) {
      return [
        { to: '/app/admin/users/all', text: 'Users' },
        { to: '/app/admin/organisations/all', text: 'Organisations' }
      ]
    }
    return false
  }

  return (
    <header className='text-gray-700 body-font'>
      <div className='mx-auto flex flex-wrap px-1 md:px-2 lg:px-3 flex-row md:flex-row items-center'>
        <nav className='md:ml-auto md:mr-auto flex flex-wrap items-center  justify-center'>
          <SmartLink
            to='/'
            className='flex order-first lg:order-none title-font font-medium items-center text-teal-900 lg:items-center lg:justify-center'
          >
            <Logo />
          </SmartLink>
          <SmartLink to='/app/dashboard'>
            <li className='mx-2 text-center block rounded-full hover:bg-gray-200 py-4 px-4'>
              Dashboard
            </li>
          </SmartLink>
          <div className=' items-center flex flex-wrap ml-3'>
            {organisations && organisations.length > 1 ? (
              <SelectOrganisation organisations={organisations} />
            ) : (
              ''
            )}
            {readHasAdminAccess ? (
              <>
                <SmartLink to='/app/admin/users/all'>
                  <li className='mx-4 block text-center border border-white rounded-full text-blue-800 hover:bg-gray-200 py-3 px-4 my-3'>
                    Admin
                  </li>
                </SmartLink>
                <SmartLink to='/app/profile/view'>
                  <li className='mx-4 text-center block rounded-full py-3 px-5 my-3 bg-teal-700 hover:opacity-90 text-white'>
                    {initial}
                  </li>
                </SmartLink>
              </>
            ) : (
              <SmartLink to='/app/profile/view'>
                <li className='mx-4 text-center block rounded-full p-5 my-3 bg-teal-700 hover:opacity-90 text-white'>
                  {initial}
                </li>
              </SmartLink>
            )}
            {isBrowser && window.location.pathname !== '/app/profile/view' ? (
              <button
                className='mx-4 my-3 text-center rounded-full py-3 px-5 ring-2 ring-teal-700 hover:opacity-90 text-teal-700 focus:outline-none'
                type='button'
                onClick={() => dispatch(mainActions.actionUserLogOut())}
              >
                Logout
              </button>
            ) : (
              ''
            )}
          </div>
        </nav>
        {secondaryNavLinks ? <Tabs tabs={secondaryNavLinks() || []} /> : ''}
      </div>
    </header>
  )
}
