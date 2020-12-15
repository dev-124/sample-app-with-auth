import React from 'react'

interface IContextProps {
  locale: string
  dispatch?: ({ type }: { type: string }) => void
}

const LocaleContext = React.createContext({} as IContextProps)

//  Use the React Context API to make the "locale" available
//  to every component in the tree

const LocaleContextWrapper = ({
  children,
  pageContext: { locale = 'en' },
  ...props
}: LocaleContextWrapperProps): JSX.Element => {
  // eslint-disable-next-line no-console
  if (!locale) console.info('locale undefined')

  return (
    <LocaleContext.Provider value={{ locale }} {...props}>
      <div className='global-wrapper'>{children}</div>
    </LocaleContext.Provider>
  )
}

export { LocaleContextWrapper, LocaleContext }

interface LocaleContextWrapperProps {
  children?: React.ReactNode
  pageContext: PageContext
}
interface PageContext {
  locale?: string
}
const wrapWithLocaleContext = ({
  element,
  props
}: WrapWithLocaleContextProps): JSX.Element => (
  <LocaleContextWrapper {...props}>{element}</LocaleContextWrapper>
)
export default wrapWithLocaleContext

interface WrapWithLocaleContextProps {
  element?: React.ReactNode
  props: LocaleContextWrapperProps
}
