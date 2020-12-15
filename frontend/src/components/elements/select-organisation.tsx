import React, { useState } from 'react'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'

import { mainActions } from '../../features/main/main-slice'
import { OrganisationProfile, UserProfileUpdate } from '../../interfaces'
import { RootState, useAppDispatch } from '../../store'

export const SelectOrganisation = ({ organisations = [] }: SelectOrganisationProps) => {
  const dispatch = useAppDispatch()

  const activeOrganisation = useSelector(
    ({ main }: RootState) => main.userProfile?.active_organisation
  )

  const [updatedProfile, setUpdatedProfile] = useState<UserProfileUpdate | false>(false)
  const onBlur = () => {
    if (!updatedProfile) return
    if (updatedProfile.active_organisation === activeOrganisation) return
    const activeOName = organisations?.find(
      (organisation) => organisation.id === updatedProfile.active_organisation
    )?.natural_name

    dispatch(
      mainActions.actionUpdateUserProfile({
        notification: {
          success: {
            content: `${activeOName} now set to active scope`,
            color: 'success'
          }
        },
        ...updatedProfile
      })
    )
  }
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // eslint-disable-next-line radix
    setUpdatedProfile({ active_organisation: parseInt(event.target.value) })
  }
  return (
    <div className='relative shadow leading-tight ml-4 sm:ml-0 hover:text-blue-800'>
      <select
        name='activeOrganisation'
        defaultValue={activeOrganisation}
        onBlur={onBlur}
        onChange={onChange}
        className='pl-2 pr-9 py-2 rounded-sm appearance-none w-40 md:w-48 lg:w-52 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 focus:shadow-outline border-b border-gray-400 hover:border-gray-500'
        data-testid='select-organisation'
      >
        <option key='all' value='0'>
          all organisations
        </option>
        {organisations?.map((org) => (
          <option key={org.id} value={org.id} data-testid='select-organisation-option'>
            {org.natural_name}
          </option>
        ))}
      </select>
      <div className='pointer-events-none  absolute inset-y-0 right-0 flex items-center text-gray-800 rounded-r-sm'>
        <RiArrowDropDownLine size={32} />
      </div>
    </div>
  )
}

interface SelectOrganisationProps {
  organisations?: OrganisationProfile[]
}
