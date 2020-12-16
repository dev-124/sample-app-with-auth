import React from 'react'
import { SmartLink } from '../../elements'

export const SimpleJustifiedCTASection = ({
  title = 'Just do it',
  titleColor = 'brand-azul-light',
  description = 'Start Today',
  buttonText = 'Get Started',
  buttonColor = 'bg-teal-600 hover:bg-teal-700',
  buttonUrl = '#'
}: SamePropTypeOnly<string>): JSX.Element => (
  <div
    className='mx-auto w-2/3 py-3 md:py-6 lg:py-12
    sm:px-6 lg:px-8 lg:flex lg:items-center lg:justify-around'
  >
    <a href={`#${title}`}>
      <h2
        className={`leading-9 
          font-extrabold tracking-tight sm:leading-10`}
      >
        {title}
        <br />
        <span className={`text-${titleColor}`}>{description}</span>
      </h2>
    </a>
    {buttonText !== '' ? (
      <div className='mt-8 flex lg:flex-shrink-0 lg:mt-0'>
        <div className='max-w-20 p-2 overflow-visible mx-auto'>
          <SmartLink to={`${buttonUrl}`}>
            <button
              type='button'
              className={`mx-2 py-4 px-7 rounded-full border-transparent leading-6 font-bold text-white ${buttonColor} focus:outline-none`}
            >
              {buttonText}
            </button>
          </SmartLink>
        </div>
      </div>
    ) : (
      ''
    )}
  </div>
)

export default SimpleJustifiedCTASection
