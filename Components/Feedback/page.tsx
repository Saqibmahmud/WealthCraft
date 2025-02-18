import Link from 'next/link'
import React from 'react'

const Feedback = () => {
  return (
  <>
    <Link href='/contact' className='fixed left-0 top-3/4  bg-red-500 text-white text-xs px-2 py-1  rounded shadow-lg z-50 font-semibold   border-yellow-400 '>
      Feedback
    </Link>
    </>
  )
}

export default Feedback

// className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-purple-300 px-4 py-2 rounded shadow-lg z-50 font-semibold rotate-90 m-0 gap-0        scale-50 hover:scale-100 "