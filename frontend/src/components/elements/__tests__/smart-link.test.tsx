import React from 'react'

import { SmartLink } from '..'
import { render, screen } from '../../../../test-utils'
import locales from '../../../locales/i18n-es6'

describe('SmartLink', () => {
  it('should localize links depending on the provided locale', () => {
    // @ts-expect-error note: create partial
    locales.se = {
      default: false,
      path: 'the-path',
      locale: 'se'
    }

    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      locale: 'se'
    }))
    render(<SmartLink to='/privacy-policy'> Here I Am </SmartLink>)
    expect(screen.getByText('Here I Am').closest('a')).toHaveAttribute(
      'href',
      '/the-path/privacy-policy'
    )
  })
})
