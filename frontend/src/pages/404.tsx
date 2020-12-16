import React from 'react'

import DefaultLayout from '../layouts/default-layout'

const NotFound = () => (
  <DefaultLayout>
    <div className='mx-auto w-full md:w-5/6 lg:w-4/5 2xl:w-2/3 3x:1/2'>
      <h2>Not Found</h2>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  </DefaultLayout>
)

export default NotFound
