import React from 'react'
import { SmartLink } from '../elements'

export const Footer = () => (
  <footer
    className={`max-w-screen flex flex-wrap flex-row items-center justify-around flex-shrink-0 
        bg-primary-darker text-base font-semibold text-primary-lighter mt-16 py-1`}
  >
    <SmartLink to='/privacy-policy' title='privacy policy'>
      Privacy Policy
    </SmartLink>
    <div className='flex-col md:w-auto m-2 justify-center content-center'>
      <div className='mt-8 flex lg:flex-shrink-0 lg:mt-0'>
        <div className='max-w-20 p-2 overflow-visible mx-auto'>
          <SmartLink to='/contact-us'>
            <button
              type='button'
              className='mx-2 py-2 px-7 leading-6 font-bold text-white focus:outline-none block'
            >
              Contact
            </button>
          </SmartLink>
        </div>
      </div>
    </div>
    <div className='flex-col my-2 md:mx-3 text-sm justify-center'>Lorem Ipsum</div>
  </footer>
)
