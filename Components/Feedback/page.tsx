import Link from 'next/link'
import React from 'react'

const Feedback = () => {
  return (
  <>
    <Link href='/contact'><div className="fixed left-0 top-3/4  bg-purple-300 p-3 rounded shadow-lg z-50 font-semibold">
      Feedback
    </div></Link>
    </>
  )
}

export default Feedback