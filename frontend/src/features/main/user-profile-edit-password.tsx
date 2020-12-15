/* eslint-disable @typescript-eslint/unbound-method */
import { navigate } from 'gatsby'
import React from 'react'
import { useForm } from 'react-hook-form'

import { UserProfileUpdate } from '../../interfaces'
import { useAppDispatch } from '../../store'
import { mainActions } from './main-slice'

export const UserProfileEditPassword = () => {
  const dispatch = useAppDispatch()
  const { register, handleSubmit, errors, reset, formState, watch } = useForm({
    mode: 'onTouched',
    defaultValues: {
      password1: '',
      password2: ''
    }
  })

  const onSubmit = handleSubmit(async (data) => {
    const updatedProfile: UserProfileUpdate = {}
    updatedProfile.password = data.password1
    await dispatch(mainActions.actionUpdateUserProfile(updatedProfile))
    navigate('/app/profile/view')
  })
  return (
    <div className='mx-auto w-4/5 md:w-1/2 2xl:w-1/3'>
      <h2> Set Password</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor='password1'>
          Password
          <input
            id='password1'
            name='password1'
            type='password'
            className='min-w-full   bg-primary-light rounded-sm border 
        border-gray-200 focus:outline-none focus:border-secondary-blue focus:placeholder-secondary-blue-dark px-2 py-2'
            ref={register({
              required: true,
              pattern: {
                value: /^(?=.*[0-9])(?=.*[!@#$%^&=*])[a-zA-Z0-9!@#$%^&=*]{10,30}$/,
                message:
                  'minimal 10 characters which contain at least one numeric digit and a special character'
              },
              minLength: {
                value: 10,
                message: 'min length is 10'
              },
              maxLength: {
                value: 30,
                message: 'max length is 30'
              }
            })}
          />
        </label>
        {errors.password1 && (
          <span role='alert' className='block text-sm text-error mb-1'>
            {errors.password1.message}
          </span>
        )}
        <label htmlFor='password2'>
          Confirm Password
          <input
            id='password2'
            name='password2'
            type='password'
            className='min-w-full   bg-primary-light rounded-sm border 
        border-gray-200 focus:outline-none focus:border-secondary-blue focus:placeholder-secondary-blue-dark px-2 py-2'
            ref={register({
              required: true,
              validate: (value) => {
                if (value === watch('password1')) {
                  return true
                }
                return 'The passwords do not match'
              }
            })}
          />
        </label>
        {errors.password2 && (
          <span role='alert' className='block text-sm text-error mb-1'>
            {errors.password2.message}
          </span>
        )}
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
          onClick={() => reset()}
        >
          Reset
        </button>
      </form>
    </div>
  )
}
