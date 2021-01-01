import React from 'react'

export const Logo = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
): JSX.Element => (
  <svg
    width='177'
    height='100'
    viewBox='0 0 177 100'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className='animate-flip'
    {...props}
  >
    <circle cx='92' cy='50' r='30' fill='#0D9488' />
    <ellipse cx='104.647' cy='50' rx='29.7059' ry='30' fill='#FF7917' />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M88.4039 75.1221C96.5911 69.7652 102 60.5143 102 50C102 39.4858 96.5911 30.2348 88.4039 24.878C80.2971 30.2348 74.9412 39.4858 74.9412 50C74.9412 60.5143 80.2971 69.7652 88.4039 75.1221Z'
      fill='#5D2C02'
    />
  </svg>
)
