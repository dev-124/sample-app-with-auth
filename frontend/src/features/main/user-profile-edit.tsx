/* eslint-disable @typescript-eslint/unbound-method */
import { navigate } from 'gatsby'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { UserProfileUpdate } from '../../interfaces'
import type { RootState } from '../../store'
import { useAppDispatch } from '../../store'
import { mainActions } from './main-slice'

export const UserProfileEdit = () => {
  const dispatch = useAppDispatch()
  const { register, handleSubmit, errors, reset, formState, setValue } = useForm({
    mode: 'onTouched',
    defaultValues: { email: '', fullName: '' }
  })

  const readUserProfile = useSelector(({ main }: RootState) => {
    return main.userProfile
  })

  useEffect(() => {
    if (readUserProfile) {
      setValue('fullName', readUserProfile.full_name)
      setValue('email', readUserProfile.email)
    }
  }, [readUserProfile, setValue])

  const onSubmit = handleSubmit(async (data) => {
    const updatedProfile: UserProfileUpdate = {}
    if (data.email) updatedProfile.email = data.email
    if (data.fullName) updatedProfile.full_name = data.fullName
    await dispatch(mainActions.actionUpdateUserProfile(updatedProfile))
    navigate('/app/profile/view')
  })
  return (
    <div className='mx-auto w-full md:w-1/2 2xl:w-1/3'>
      <h2> Edit Profile</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor='email'>
          Email
          <input
            id='email'
            name='email'
            className='min-w-full   bg-primary-light rounded-sm border 
                  border-gray-200 focus:outline-none focus:border-secondary-blue focus:placeholder-secondary-blue-dark px-2 py-2'
            ref={register({
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'not a valid email format'
              }
            })}
            type='email'
          />
        </label>
        {errors.email && (
          <span role='alert' className='block text-sm text-error mb-1'>
            {errors.email.message}
          </span>
        )}
        <label htmlFor='fullName'>
          Full Name
          <input
            id='fullName'
            name='fullName'
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
        {errors.fullName && (
          <span role='alert' className='block text-sm text-error mb-1'>
            {errors.fullName.message}
          </span>
        )}
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
