import { useParams } from '@reach/router'
import { navigate } from 'gatsby'
import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { OrganisationProfile, OrganisationProfileUpdate } from '../../interfaces'
import type { RootState } from '../../store'
import { useAppDispatch } from '../../store'
import { adminActions } from './admin-slice'

export const AdminEditOrganisation = () => {
  const dispatch = useAppDispatch()
  const params = useParams()

  // readAdminOneOrganisation
  const organisation = useSelector(({ admin }: RootState) => {
    const matchId = (org: OrganisationProfile) => {
      return org.id.toString() === params.id
    }
    const filteredOrganisations = admin.organisations.filter(matchId)
    return { ...filteredOrganisations[0] }
  })

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, handleSubmit, errors, reset, formState } = useForm({
    mode: 'onTouched',
    defaultValues: {
      naturalName: '',
      tradeName: '',
      tradeNumber: '',
      address: '',
      country: '',
      postalCode: '',
      telephone: '',
      isActive: true
    }
  })

  const onReset = useCallback(() => {
    // if existing org, apply those vals, otherwise fallback to default
    reset({
      naturalName: organisation?.natural_name || '',
      tradeName: organisation?.trade_name || '',
      tradeNumber: organisation?.trade_number || '',
      address: organisation?.address || '',
      postalCode: organisation?.postal_code || '',
      country: organisation?.country || '',
      telephone: organisation?.telephone || '',
      isActive: organisation?.is_active || true
    })
  }, [
    organisation?.natural_name,
    organisation?.trade_name,
    organisation?.trade_number,
    organisation?.address,
    organisation?.postal_code,
    organisation?.country,
    organisation?.telephone,
    organisation?.is_active,
    reset
  ])

  useEffect(() => {
    dispatch(adminActions.actionGetOrganisations())
    onReset()
  }, [dispatch, onReset])

  const onSubmit = handleSubmit(async (data) => {
    const updatedProfile: OrganisationProfileUpdate = {}
    // for prop in data if data.prop, set to object
    if (data.naturalName) updatedProfile.natural_name = data.naturalName
    if (data.tradeName) updatedProfile.trade_name = data.tradeName
    if (data.tradeNumber) updatedProfile.trade_number = data.tradeNumber
    if (data.address) updatedProfile.address = data.address
    if (data.country) updatedProfile.country = data.country
    if (data.postalCode) updatedProfile.postal_code = data.postalCode
    if (data.telephone) updatedProfile.telephone = data.telephone

    updatedProfile.is_active = data.isActive

    await dispatch(
      adminActions.actionUpdateOrganisation({
        id: organisation.id,
        organisation: updatedProfile
      })
    )
    navigate('/app/admin/organisations/all')
  })
  return (
    <div className='mx-auto  w-full md:w-2/3 2xl:w-1/3'>
      <h2>Edit Organisation</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor='naturalName'>
          Natural Name
          <input
            id='naturalName'
            name='naturalName'
            className='min-w-full   bg-primary-light rounded-sm border 
        border-gray-200 focus:outline-none focus:border-secondary-blue focus:placeholder-secondary-blue-dark px-2 py-2'
            ref={register({
              required: true,
              minLength: {
                value: 3,
                message: 'min length is 3'
              }
            })}
            type='text'
          />
        </label>
        {errors.naturalName && (
          <span role='alert' className='block text-sm text-error mb-1'>
            {errors.naturalName.message}
          </span>
        )}
        <label htmlFor='tradeName'>
          Trade Name
          <input
            id='tradeName'
            name='tradeName'
            className='min-w-full   bg-primary-light rounded-sm border 
        border-gray-200 focus:outline-none focus:border-secondary-blue focus:placeholder-secondary-blue-dark px-2 py-2'
            ref={register({
              required: true,
              minLength: {
                value: 3,
                message: 'min length is 3'
              }
            })}
            type='text'
          />
        </label>
        {errors.tradeName && (
          <span role='alert' className='block text-sm text-error mb-1'>
            {errors.tradeName.message}
          </span>
        )}
        <label htmlFor='tradeNumber'>
          Trade Number
          <input
            id='tradeNumber'
            name='tradeNumber'
            className='min-w-full   bg-primary-light rounded-sm border 
        border-gray-200 focus:outline-none focus:border-secondary-blue focus:placeholder-secondary-blue-dark px-2 py-2'
            ref={register({
              required: true,
              minLength: {
                value: 5,
                message: 'min length is 5'
              }
            })}
            type='text'
          />
        </label>
        {errors.tradeNumber && (
          <span role='alert' className='block text-sm text-error mb-1'>
            {errors.tradeNumber.message}
          </span>
        )}
        <label htmlFor='address'>
          Address
          <input
            id='address'
            name='address'
            className='min-w-full   bg-primary-light rounded-sm border 
                  border-gray-200 focus:outline-none focus:border-secondary-blue focus:placeholder-secondary-blue-dark px-2 py-2'
            ref={register({
              required: true,
              minLength: {
                value: 5,
                message: 'min length is 5'
              }
            })}
            type='text'
          />
        </label>
        {errors.address && (
          <span role='alert' className='block text-sm text-error mb-1'>
            {errors.address.message}
          </span>
        )}
        <label htmlFor='postalCode'>
          Postal Code
          <input
            id='postalCode'
            name='postalCode'
            className='min-w-full   bg-primary-light rounded-sm border 
                  border-gray-200 focus:outline-none focus:border-secondary-blue focus:placeholder-secondary-blue-dark px-2 py-2'
            ref={register({
              required: true,
              minLength: {
                value: 4,
                message: 'min length is 4'
              }
            })}
            type='text'
          />
        </label>
        {errors.postalCode && (
          <span role='alert' className='block text-sm text-error mb-1'>
            {errors.postalCode.message}
          </span>
        )}
        <label htmlFor='country'>
          Country
          <input
            id='country'
            name='country'
            className='min-w-full   bg-primary-light rounded-sm border 
                  border-gray-200 focus:outline-none focus:border-secondary-blue focus:placeholder-secondary-blue-dark px-2 py-2'
            ref={register({
              required: true,
              maxLength: 2
            })}
            type='text'
          />
        </label>
        {errors.country && <span role='alert'>{errors.country.message}</span>}
        {errors.country && errors.country.type === 'maxLength' && (
          <span className='block text-sm text-error mb-1' role='alert'>
            country code max length is 2
          </span>
        )}
        <label htmlFor='telephone'>
          Telephone
          <input
            id='telephone'
            name='telephone'
            className='min-w-full   bg-primary-light rounded-sm border 
                  border-gray-200 focus:outline-none focus:border-secondary-blue focus:placeholder-secondary-blue-dark px-2 py-2'
            ref={register({
              required: true,
              minLength: {
                value: 8,
                message: 'min length is 8'
              }
            })}
            type='text'
          />
        </label>
        {errors.telephone && <span role='alert'>{errors.telephone.message}</span>}
        <label htmlFor='isActive' className='inline-block w-1/2 my-2'>
          <input
            type='checkbox'
            name='isActive'
            ref={register}
            placeholder='isActive'
            defaultChecked
            className='w-1/2   bg-primary-light rounded-sm   border border-gray-200 focus:outline-none 
            focus:border-secondary-blue focus:placeholder-secondary-blue-dark px-2 py-2'
          />
          Is Active
        </label>
        <button
          className='border border-gray-600 shadow    font-bold w-1/2 my-4 rounded-sm disabled:opacity-25 disabled:bg-gray-100 focus:outline-none '
          type='submit'
          disabled={!formState.isValid}
        >
          Save
        </button>
        <button
          className='flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800   py-1 px-2 rounded'
          type='button'
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <button
          className='flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800   py-1 px-2 rounded'
          type='button'
          onClick={() => onReset()}
        >
          Reset
        </button>
      </form>
    </div>
  )
}
