import React from 'react'
import notFound from '../assets/error.jpg'

function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <img src={notFound} alt='404-Page not found' height='95%' className='w-1/2'></img>
    </div>
  )
}

export default NotFound