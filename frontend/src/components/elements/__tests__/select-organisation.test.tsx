import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SelectOrganisation } from '..'
import { fireEvent, render, screen } from '../../../../test-utils'
import { OrganisationProfile } from '../../../interfaces'

const organisations = [
  {
    trade_name: 'Good Corp',
    natural_name: 'Good Corp',
    id: 50,
    postal_code: '1234AB',
    is_active: true,
    telephone: '0666666666',
    trade_number: '123452',
    address: 'see lane 3',
    country: 'NL'
  },
  {
    trade_name: 'Envoy Corp',
    natural_name: 'Envoyc',
    id: 52,
    postal_code: '1234AB',
    is_active: true,
    telephone: '0612345678',
    trade_number: '12345',
    address: 'see lane 3',
    country: 'Pacifica'
  }
]

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}))

const mockedUseSelector = useSelector as jest.Mock
const mockedUseDispatch = useDispatch as jest.Mock

describe('SelectOrganisation', () => {
  it('striggers a dispatch if the activeOrganisation is defined and different from the existing organisation', () => {
    mockedUseSelector.mockImplementation(() => organisations[0].id)

    render(<SelectOrganisation organisations={organisations as OrganisationProfile[]} />)
    mockedUseDispatch.mockRestore()
    fireEvent.change(screen.getByTestId('select-organisation'), {
      target: { value: 52 }
    })
    expect(mockedUseDispatch).toHaveBeenCalledTimes(1)
  })
  it('renders dropdown options', () => {
    render(<SelectOrganisation organisations={organisations as OrganisationProfile[]} />)

    expect(screen.getByText('all organisations')).toBeInTheDocument()
    expect(screen.getByText('Envoyc')).toBeInTheDocument()
    expect(screen.getByText('Good Corp')).toBeInTheDocument()
  })
  it('selects the active organisation', () => {
    mockedUseSelector.mockImplementation(() => organisations[1].id)

    render(<SelectOrganisation organisations={organisations as OrganisationProfile[]} />)

    const options = screen.getAllByTestId(
      'select-organisation-option'
    ) as HTMLOptionElement[]

    expect(options[0].selected).toBeFalsy()
    expect(options[1].selected).toBeTruthy()

    fireEvent.change(screen.getByTestId('select-organisation'), {
      target: { value: 50 }
    })

    expect(options[0].selected).toBeTruthy()
    expect(options[1].selected).toBeFalsy()
  })
})
