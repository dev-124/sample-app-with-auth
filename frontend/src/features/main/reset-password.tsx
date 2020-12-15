/* eslint-disable @typescript-eslint/unbound-method */
import { useParams } from '@reach/router'
import { navigate } from 'gatsby'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'

import { useAppDispatch } from '../../store'
import { addNotification, mainActions } from './main-slice'

export const ResetPassword = () => {
  const dispatch = useAppDispatch()
  const params = useParams()
  const { register, handleSubmit, errors, reset, formState, watch } = useForm({
    mode: 'onTouched',
    defaultValues: {
      password1: '',
      password2: ''
    }
  })

  const checkToken = useCallback((): string | void => {
    const token = params.query.token || ''
    if (!token) {
      dispatch(
        addNotification({
          content: 'No token provided in the URL, start a new password recovery',
          color: 'error'
        })
      )
      navigate('/app/recover-password')
    }
    return token
  }, [dispatch, params.query.token])

  const cancel = () => {
    navigate('/')
  }

  const onSubmit = handleSubmit(async (data) => {
    const token = checkToken()
    if (token) {
      await dispatch(mainActions.resetPassword({ token, password: data.password1 }))
      navigate('/')
    }
    navigate('/app/profile/view')
  })
  return (
    <div className='mx-auto w-4/5 md:w-1/2 2xl:w-1/3'>
      <h2> Reset Password</h2>
      <p> Enter your new password below </p>
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
            name='password_confirmation'
            type='password'
            className='min-w-full   bg-primary-light rounded-sm border 
        border-gray-200 focus:outline-none focus:border-secondary-blue focus:placeholder-secondary-blue-dark px-2 py-2'
            ref={register({
              required: true,
              validate: (value) => value === watch('password1'),
              minLength: {
                value: 8,
                message: 'min length is 8'
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
          className='flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800   py-1 px-2 rounded focus:outline-none'
          type='button'
          onClick={() => cancel()}
        >
          Cancel
        </button>
        <button
          className='flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800   py-1 px-2 rounded focus:outline-none'
          type='button'
          onClick={() => reset()}
        >
          Reset
        </button>
      </form>
    </div>
  )
}
