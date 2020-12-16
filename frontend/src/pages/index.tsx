import React from 'react'

import { SimpleJustifiedCTASection } from '../components'
import DefaultLayout from '../layouts/default-layout'

const Index = () => (
  <DefaultLayout>
    <div className='mx-auto w-full md:w-5/6 lg:w-4/5 2xl:w-2/3 3x:1/2'>
      <h3>Open and Transparant</h3>
      <p className='text-justify'>
        d minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pari
      </p>
      <SimpleJustifiedCTASection
        title='Industry Research'
        titleColor='teal-700'
        description='Q2 2020'
        buttonText='Read report'
        buttonUrl='/login'
      />
      <h3>Multi-Market</h3>
      <p className='text-justify'>
        d minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pari
      </p>
      {/* Customers Section */}
      {/* show how others rated you... embed on your page */}
    </div>
  </DefaultLayout>
)

export default Index
