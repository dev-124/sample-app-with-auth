import './static/fonts/typography.css'
import './src/app.css'
import React from 'react'
import { Provider } from 'react-redux'
import localeContextProvider from './src/locales/locale-context'
import store from './src/store'

export const wrapPageElement = localeContextProvider
export const wrapRootElement = ({ element }) => {
  return <Provider store={store}>{element}</Provider>
}

export const onRouteUpdate = async ({ location }) => {
  window.onload = scrollToAnchor(location)
  window.onhashchange = () => scrollToAnchor(location)
}
const scrollToAnchor = (loc) => {
  if (loc && loc.hash) {
    const el = document.querySelector(`a[href='${location.hash}']`)
    if (!el || el === null) return true
    el.scrollIntoView({
      behavior: 'smooth', // unsupported by safari
      block: 'start' // vertical alignment, center is unsupported by safari
    })
  }
  return true
}
