import { navigate } from 'gatsby'
import React from 'react'
import { useForm } from 'react-hook-form'

import { useAppDispatch } from '../../store'
import { mainActions } from './main-slice'

export const RecoverPassword = () => {
  const dispatch = useAppDispatch()
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, handleSubmit, errors, reset, formState } = useForm({
    mode: 'onTouched',
    defaultValues: {
      username: ''
    }
  })

  const onSubmit = handleSubmit(async (data) => {
    await dispatch(mainActions.passwordRecovery({ username: data.username }))
  })

  return (
    <div className='mx-auto w-4/5 md:w-1/2 2xl:w-1/3'>
      <h2> Password Recovery</h2>
      <p>A password recovery email will be sent to the registered account</p>
      <form onSubmit={onSubmit}>
        <label htmlFor='username'>
          Username
          <input
            id='username'
            name='username'
            className='min-w-full   bg-primary-light rounded-sm border 
        border-gray-200 focus:outline-none focus:border-secondary-blue focus:placeholder-secondary-blue-dark px-2 py-2'
            ref={register({
              required: true
            })}
            type='text'
          />
        </label>
        {errors.username && (
          <span role='alert' className='block text-sm text-error mb-1'>
            {errors.username.message}
          </span>
        )}
        <button
          className='border border-gray-600 shadow    font-bold w-1/2 my-4 rounded-sm disabled:opacity-25 disabled:bg-gray-100 focus:outline-none '
          type='submit'
          disabled={!formState.isValid}
        >
          Recover Password
        </button>
        <button
          className='flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800   py-1 px-2 rounded focus:outline-none'
          type='button'
          onClick={() => navigate(-1)}
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
