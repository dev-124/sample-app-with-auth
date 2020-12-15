import React from 'react'

import { ActiveBadge } from '..'
import { render } from '../../../../test-utils'

describe('ActiveBadge', () => {
  it('renders a green true text badge with green background', () => {
    const { container, getByText } = render(<ActiveBadge isActive='true' />)

    const trueText = getByText('true')
    expect(trueText).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })
  it('renders a false text badge with red background', () => {
    const { container, getByText } = render(<ActiveBadge isActive='false' />)

    const falseText = getByText('false')
    expect(falseText).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })
})
