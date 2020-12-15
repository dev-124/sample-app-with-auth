import { navigate } from 'gatsby'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { UserProfileCreate } from '../../interfaces'
import { useAppDispatch } from '../../store'
import { adminActions } from './admin-slice'

export const AdminCreateUser = () => {
  const dispatch = useAppDispatch()
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, handleSubmit, errors, reset, formState, watch } = useForm({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      fullName: '',
      password1: '',
      password2: '',
      isActive: true,
      isSuperuser: false
    }
  })

  useEffect(() => {
    dispatch(adminActions.actionGetUsers)
    reset()
  }, [dispatch, reset]) // run only once

  const onSubmit = handleSubmit(async (data) => {
    // required data
    const profile: UserProfileCreate = {
      full_name: data.fullName,
      email: data.email,
      password: data.password1
    }
    // optional - defaults set in backend
    profile.is_active = data.isActive
    profile.is_superuser = data.isSuperuser

    await dispatch(adminActions.actionCreateUser(profile))
    navigate('/app/admin/users/all')
  })

  return (
    <div className='mx-auto w-full md:w-2/3 2xl:w-1/3'>
      <h2> Create User</h2>
      <form onSubmit={onSubmit}>
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
        <div className='flex flex-row justify-around py-1'>
          <label htmlFor='isSuperuser' className='p-4'>
            <input
              type='checkbox'
              name='isSuperuser'
              ref={register}
              defaultChecked={false}
              className='min-w-full   bg-primary-light rounded-sm   border border-gray-200 focus:outline-none 
              focus:border-secondary-blue focus:placeholder-secondary-blue-dark px-2 py-2'
            />
            <span className='ml-2 w-1/2'>Is Superuser</span>
          </label>
          <label htmlFor='isActive' className='p-4'>
            <input
              type='checkbox'
              name='isActive'
              ref={register}
              defaultChecked
              className='min-w-full   bg-primary-light rounded-sm   border border-gray-200 focus:outline-none 
              focus:border-secondary-blue focus:placeholder-secondary-blue-dark px-2 py-2'
            />
            <span className='ml-2 w-1/2'>Is Active</span>
          </label>
        </div>
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
