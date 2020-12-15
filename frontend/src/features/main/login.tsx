import { navigate } from 'gatsby'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { SmartLink } from '../../components'
import type { RootState } from '../../store'
import { useAppDispatch } from '../../store'
import { mainActions } from './main-slice'

export const Login = () => {
  const dispatch = useAppDispatch()

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: { email: '', password: '' }
  })
  const readIsLoggedIn = useSelector(({ main }: RootState) => main.isLoggedIn)
  const readLoginError = useSelector(({ main }: RootState) => main.logInError)

  const hasLoginError = () => {
    return readLoginError
  }

  const onSubmit = handleSubmit(async (data) => {
    await dispatch(mainActions.actionLogIn(data))
    reset()
  })

  useEffect(() => {
    if (readIsLoggedIn) {
      navigate('/app/dashboard')
    }
  }, [readIsLoggedIn])

  return (
    <div className='mx-auto w-4/5 md:w-1/2 2xl:w-1/3'>
      <h2> Log In</h2>
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
              min: 4,
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
        <label htmlFor='password'>
          password
          <input
            id='password'
            name='password'
            className='min-w-full   bg-primary-light rounded-sm border 
        border-gray-200 focus:outline-none focus:border-secondary-blue focus:placeholder-secondary-blue-dark px-2 py-2'
            ref={register({
              required: true,
              pattern: {
                value: /^(?:(?=.*?[A-Z])(?:(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=])|(?=.*?[a-z])(?:(?=.*?[0-9])|(?=.*?[-!@#$%^&*()_[\]{},.<>+=])))|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=]))[A-Za-z0-9!@#$%^&*()_[\]{},.<>+=-]{7,50}$/,
                message:
                  'A valid password has a minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
              },
              minLength: {
                value: 5,
                message: 'min length is 5'
              }
            })}
            type='password'
          />
        </label>
        {errors.password && (
          <span role='alert' className='block text-sm text-error mb-1'>
            {errors.password.message}
          </span>
        )}
        {hasLoginError() ? (
          <span role='alert' className='block text-sm text-semibold text-error my-6'>
            The provided email or password was incorrect
            {hasLoginError()}
            <SmartLink
              to='/app/recover-password'
              className='m-6   font-semibold my-4 mr-2 py-2 px-4 border border-gray-600 shadow rounded-sm focus:outline-none'
            >
              Recover Password
            </SmartLink>
          </span>
        ) : (
          ''
        )}
        <button
          className='border border-gray-600 shadow    font-bold w-1/2 my-4 rounded-sm disabled:opacity-25 disabled:bg-gray-100 focus:outline-none '
          type='submit'
        >
          Log In
        </button>
      </form>
    </div>
  )
}
