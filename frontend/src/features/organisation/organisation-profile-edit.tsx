import { navigate } from 'gatsby'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { OrganisationProfileUpdate } from '../../interfaces'
import type { RootState } from '../../store'
import { useAppDispatch } from '../../store'
import { organisationActions } from './organisation-slice'

export const OrganisationProfileEdit = () => {
  const dispatch = useAppDispatch()
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, handleSubmit, errors, reset, formState, setValue } = useForm({
    mode: 'onTouched',
    defaultValues: {
      naturalName: '',
      address: '',
      country: '',
      postalCode: '',
      telephone: ''
    }
  })

  const readOrganisationProfile = useSelector(({ organisation }: RootState) => {
    return organisation.organisationProfile
  })

  useEffect(() => {
    if (readOrganisationProfile) {
      setValue('naturalName', readOrganisationProfile.natural_name)
      setValue('address', readOrganisationProfile.address)
      setValue('country', readOrganisationProfile.country)
      setValue('postalCode', readOrganisationProfile.postal_code)
      setValue('telephone', readOrganisationProfile.telephone)
    }
  }, [readOrganisationProfile, setValue])

  const onSubmit = handleSubmit(async (data) => {
    const updatedProfile: OrganisationProfileUpdate = {}

    if (data.naturalName) updatedProfile.natural_name = data.naturalName
    if (data.address) updatedProfile.address = data.address
    if (data.country) updatedProfile.country = data.country
    if (data.postalCode) updatedProfile.postal_code = data.postalCode
    if (data.telephone) updatedProfile.telephone = data.telephone
    await dispatch(organisationActions.actionUpdateOrganisationProfile(updatedProfile))
    navigate('/app/organisation/view')
  })
  return (
    <div className='mx-auto w-4/5 md:w-1/2 2xl:w-1/3'>
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
        <button
          className='border border-gray-600 shadow    font-bold w-1/2 my-4 rounded-sm disabled:opacity-25 disabled:bg-gray-100 focus:outline-none '
          type='submit'
          disabled={!formState.isValid}
        >
          {' '}
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
          onClick={() => reset()}
        >
          Reset
        </button>
      </form>
    </div>
  )
}
