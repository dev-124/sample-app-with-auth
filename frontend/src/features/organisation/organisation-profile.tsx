import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { SmartLink } from '../../components'
import type { RootState } from '../../store'
import { useAppDispatch } from '../../store'
import { organisationActions } from './organisation-slice'

export const OrganisationProfile = () => {
  const organisationProfile = useSelector(
    (state: RootState) => state.organisation.organisationProfile
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(organisationActions.actionGetOrganisationProfile())
  }, [dispatch])

  const linkStyle =
    '  font-semibold  my-4 mr-2 py-2 px-4 border border-gray-600 shadow rounded-sm focus:outline-none'

  return (
    <div className='mx-auto w-full md:w-2/3 2xl:w-1/3'>
      <h2>{organisationProfile?.natural_name} Product</h2>
      <div className='flex flex-wrap p-4'>
        <h3> Details </h3>
        <div className='w-full px-2 py-2'>
          <dl>
            <div className='px-2 py-5 sm:grid sm:grid-cols-3 sm:gap-4'>
              <dt className='  leading-5 font-medium text-gray-600'>Name</dt>
              <dd className='mt-1   leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
                {organisationProfile?.natural_name}
              </dd>
            </div>
          </dl>
          <dl>
            <div className='px-2 inline-flex flex-col py-5 sm:grid sm:grid-cols-3 sm:gap-4'>
              <dt className='  leading-5 font-medium text-gray-600'>Trade number</dt>
              <dd className='mt-1   leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
                {organisationProfile?.trade_number}
              </dd>
            </div>
          </dl>
          <dl>
            <div className='px-2 inline-flex flex-col py-5 sm:grid sm:grid-cols-3 sm:gap-4'>
              <dt className='  leading-5 font-medium text-gray-600'>Address</dt>
              <dd className='mt-1   leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
                {organisationProfile?.address}
              </dd>
              <dt className='  leading-5 font-medium text-gray-600'>Postal Code</dt>
              <dd className='mt-1   leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
                {organisationProfile?.postal_code}
              </dd>
              <dt className='  leading-5 font-medium text-gray-600'>Country</dt>
              <dd className='mt-1   leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
                {organisationProfile?.country}
              </dd>
            </div>
          </dl>
          <dl>
            <div className='px-2 inline-flex flex-col py-5 sm:grid sm:grid-cols-3 sm:gap-4'>
              <dt className='  leading-5 font-medium text-gray-600'>Phone</dt>
              <dd className='mt-1   leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
                {organisationProfile?.telephone}
              </dd>
            </div>
          </dl>
          <dl>
            <div className='px-2 inline-flex flex-col py-5 sm:grid sm:grid-cols-3 sm:gap-4'>
              <dt className='  leading-5 font-medium text-gray-600'>Members</dt>
              <dd className='mt-1   leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
                {organisationProfile?.members?.length.toString()}
              </dd>
            </div>
          </dl>
          <dl>
            <div className='px-2 inline-flex flex-col py-5 sm:grid sm:grid-cols-3 sm:gap-4'>
              <dt className='  leading-5 font-medium text-gray-600'>Products</dt>
              <dd className='mt-1   leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
                {organisationProfile?.products?.length.toString()}
              </dd>
            </div>
          </dl>
          <dl>
            <div className='px-2 inline-flex flex-col py-2 sm:grid sm:grid-cols-3 sm:gap-4'>
              <dt className='  leading-5 font-medium text-gray-600' />
              <dd className='mt-1   leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
                <SmartLink
                  to='/app/organisation/edit'
                  className={`${linkStyle} bg-gray-100`}
                >
                  Edit
                </SmartLink>
              </dd>
            </div>
          </dl>
          <dl>
            <div className='px-2 inline-flex flex-col py-5 sm:grid sm:grid-cols-3 sm:gap-4'>
              <dt className='  leading-5 font-medium text-gray-600'>Subscriptions</dt>
              <dd className='mt-1   leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
                {organisationProfile?.subscriptions || 'None'}
              </dd>
            </div>
          </dl>
          <dl>
            <div className='px-2 inline-flex flex-col py-2 sm:grid sm:grid-cols-3 sm:gap-4'>
              <dt className='  leading-5 font-medium text-gray-600' />
              <dd className='mt-1   leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
                <SmartLink
                  to='/app/subscription/view'
                  className={`${linkStyle} bg-gray-100`}
                >
                  Change
                </SmartLink>
              </dd>
            </div>
          </dl>
          <dl>
            <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4'>
              <dt className='  leading-5 font-medium text-gray-600'>
                Payments and Invoicing
              </dt>
              <dd className='mt-1   leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
                {organisationProfile?.invoices || 'None'}
              </dd>
            </div>
          </dl>
          <dl>
            <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4'>
              <dt className='  leading-5 font-medium text-gray-600' />
              <dd className='mt-1   leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
                <SmartLink
                  to='/app/subscription/view'
                  className={`${linkStyle} bg-gray-100`}
                >
                  View
                </SmartLink>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
