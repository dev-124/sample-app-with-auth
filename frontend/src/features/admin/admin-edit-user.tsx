import { useParams } from '@reach/router'
import { navigate } from 'gatsby'
import React, { useCallback, useEffect } from 'react'
import { Controller, NestedValue, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { SelectMulti } from '../../components/select-multi'
import { OrganisationProfile, UserProfile, UserProfileUpdate } from '../../interfaces'
import type { RootState } from '../../store'
import { useAppDispatch } from '../../store'
import { adminActions } from './admin-slice'

export const AdminEditUser = () => {
  const dispatch = useAppDispatch()
  const params = useParams()

  const user = useSelector(({ admin }: RootState) => {
    const matchId = (usr: UserProfile) => {
      return usr.id.toString() === params.id
    }
    const filteredUsers = admin.users.filter(matchId)
    return { ...filteredUsers[0] }
  })
  const allOrganisations = useSelector(({ admin }: RootState) => {
    return admin.organisations
  })
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    register,
    handleSubmit,
    errors,
    reset,
    formState,
    getValues,
    setValue,
    watch,
    control
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      fullName: '',
      setPassword: false,
      password1: '',
      password2: '',
      isActive: true,
      isSuperuser: false,
      organisations: undefined as undefined | NestedValue<OrganisationProfile[]>
    }
  })

  const watchSetPassword = watch(['setPassword', 'selectedOrganisation'])

  const setSelectedOrganisations = useCallback(
    (organisations?: IndexApi<OrganisationProfile>[]) => {
      setValue('organisations', organisations)
    },
    [setValue]
  )
  const onReset = useCallback(() => {
    reset({
      fullName: user?.full_name || '',
      email: user?.email || '',
      isActive: user?.is_active || true,
      isSuperuser: user?.is_superuser || false,
      organisations: user?.organisations
    })
  }, [
    reset,
    user?.full_name,
    user?.email,
    user?.is_active,
    user?.is_superuser,
    user?.organisations
  ])

  useEffect(() => {
    if (Array.isArray(allOrganisations) && !allOrganisations.length) {
      dispatch(adminActions.actionGetOrganisations())
    }
    onReset()
  }, [dispatch, onReset, allOrganisations])

  const onSubmit = handleSubmit(async (data) => {
    const updatedProfile: UserProfileUpdate = {}
    if (data.fullName) updatedProfile.full_name = data.fullName
    if (data.email) updatedProfile.email = data.email
    if (data.setPassword) updatedProfile.password = data.password1
    if (getValues('organisations')) {
      updatedProfile.organisations = getValues('organisations')
    }
    updatedProfile.is_active = data.isActive
    updatedProfile.is_superuser = data.isSuperuser
    await dispatch(adminActions.actionUpdateUser({ id: user.id, user: updatedProfile }))

    navigate('/app/admin/users/all')
  })

  return (
    <div className='mx-auto w-full md:w-2/3 2xl:w-1/3'>
      <h2>Edit User</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor='username'>
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
        <label htmlFor='isSuperuser' className='inline-block w-1/2 my-2'>
          <input
            type='checkbox'
            ref={register}
            name='isSuperuser'
            placeholder='isSuperuser'
            defaultChecked={false}
            className='w-1/2   bg-primary-light rounded-sm   border border-gray-200 focus:outline-none 
            focus:border-secondary-blue focus:placeholder-secondary-blue-dark px-2 py-2'
          />
          Is Superuser
        </label>
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
        <label htmlFor='setPassword' className='inline-block w-1/2 my-2'>
          <input
            type='checkbox'
            name='setPassword'
            ref={register}
            placeholder='setPassword'
            defaultChecked={false}
            className='w-1/2   bg-primary-light rounded-sm   border border-gray-200 focus:outline-none 
              focus:border-secondary-blue focus:placeholder-secondary-blue-dark px-2 py-2'
          />
          Set Password
        </label>
        {watchSetPassword && getValues('setPassword') ? (
          <>
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
                    value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,30}$/,
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
          </>
        ) : (
          ''
        )}
        <div className='block'>
          <section>
            Organisations
            <Controller
              control={control}
              name='organisations'
              defaultValue={user?.organisations || []}
              render={({ ref, value, ...rest }) => {
                return (
                  <SelectMulti<OrganisationProfile>
                    handleSelectedItemChange={setSelectedOrganisations}
                    initialSelectedItems={value || []}
                    items={
                      ((allOrganisations as unknown) as IndexApi<
                        OrganisationProfile
                      >[]) || []
                    }
                    labelKey='natural_name'
                    labelDetailsKey='trade_name'
                    {...rest}
                  />
                )
              }}
            />
          </section>
        </div>
        {errors.organisations && (
          <span role='alert' className='block text-sm text-error mb-1'>
            {errors.organisations.message}
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
          onClick={() => onReset()}
        >
          Reset
        </button>
      </form>
    </div>
  )
}
