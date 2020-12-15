// based on testing-library doc example

import { render, RenderOptions, RenderResult } from '@testing-library/react'
import React from 'react'

import { LocaleContextWrapper } from '../src/locales/locale-context'

const AllProviders: React.ComponentType = ({
  children
}: SamePropTypeOnly<React.ReactNode>) => {
  return (
    <LocaleContextWrapper pageContext={{ locale: 'en' }}>{children}</LocaleContextWrapper>
  )
}
const customRender = (
  ui: JSX.Element,
  options?:
    | Pick<
        RenderOptions<typeof import('@testing-library/dom/types/queries')>,
        'container' | 'baseElement' | 'hydrate' | 'wrapper'
      >
    | undefined
): RenderResult => render(ui, { wrapper: AllProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
