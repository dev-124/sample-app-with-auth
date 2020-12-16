import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SmartLink } from '../../components'
import type { RootState } from '../../store'
import { mainActions } from './main-slice'

export const UserProfile = () => {
  const userProfile = useSelector((state: RootState) => state.main.userProfile)
  const dispatch = useDispatch()

  const hasActiveOrganisation = useCallback(() => {
    if (!userProfile?.active_organisation) return false
    return userProfile?.active_organisation > 0
  }, [userProfile?.active_organisation])

  const activeOrganisation = () => {
    return userProfile?.organisations?.find(
      (organisation) => organisation.id === userProfile.active_organisation
    )
  }

  const setActiveOrganisation = (ao_id: number) => {
    const activeOName = userProfile?.organisations?.find(
      (organisation) => organisation.id === ao_id
    )?.natural_name
    dispatch(
      mainActions.actionUpdateUserProfile({
        notification: {
          success: {
            content: `${activeOName} now set to active scope`,
            color: 'success'
          }
        },
        active_organisation: ao_id
      })
    )
  }

  useEffect(() => {
    // automatically set user organisation as the active organisation if only one exists
    if (!hasActiveOrganisation && userProfile?.organisations?.length === 1) {
      dispatch(
        mainActions.actionUpdateUserProfile({
          active_organisation: userProfile?.organisations[0].id
        })
      )
    }
  }, [dispatch, hasActiveOrganisation, userProfile?.organisations])

  const linkStyle =
    'inline-flex font-semibold my-4 mr-2 py-2 px-4 rounded focus:outline-none bg-blue-800 hover:bg-blue-900 text-gray-50'

  return (
    <div className='mx-auto md:w-2/3 2xl:w-1/3'>
      <h2>Account Settings</h2>
      <div className='flex flex-wrap p-4'>
        <p>Welcome, {userProfile?.full_name}!</p>
        <div className='w-full'>
          <h3> Profile </h3>
          <div className='w-full px-2 py-2'>
            <dl>
              <div className='px-2 py-5 sm:grid sm:grid-cols-3 sm:gap-4'>
                <dt className='  leading-5 font-medium text-gray-600'>Name</dt>
                <dd className='mt-1   leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
                  {userProfile?.full_name}
                </dd>
              </div>
            </dl>
            <dl>
              <div className='px-2 inline-flex flex-col py-5 sm:grid sm:grid-cols-3 sm:gap-4'>
                <dt className='  leading-5 font-medium text-gray-600'>Email</dt>
                <dd className='mt-1   leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
                  {userProfile?.email}
                </dd>
              </div>
            </dl>
          </div>
          <SmartLink to='/app/profile/edit' className={`${linkStyle}`}>
            Edit
          </SmartLink>
          <SmartLink to='/app/profile/password' className={linkStyle}>
            Change Password
          </SmartLink>
        </div>
        <div className='w-full py-6'>
          {hasActiveOrganisation() ? (
            <>
              <h3> Organisation</h3>
              <SmartLink
                to='/app/organisation/view'
                className='cursor-pointer px-3 py-3 rounded-sm font-semibold text-teal-800 bg-white ring-2 ring-teal-600 mr-3'
              >
                {activeOrganisation()?.natural_name}
              </SmartLink>
              <SmartLink to='/app/organisation/edit' className={linkStyle}>
                Edit
              </SmartLink>
            </>
          ) : (
            <>
              <h3>
                Organisation
                {userProfile && userProfile?.organisations?.length > 0 ? 's' : ''}
              </h3>
              <div className='flex flex-wrap'>
                {userProfile?.organisations?.map((organisation) => (
                  <button
                    key={organisation.id}
                    type='button'
                    onClick={() => setActiveOrganisation(organisation.id)}
                    className='cursor-pointer px-6 py-1 rounded-sm font-semibold text-primary-lighter bg-blue-800 hover:bg-blue-600 m-2 whitespace-nowrap'
                  >
                    {organisation.natural_name}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
