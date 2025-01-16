import Link from 'next/link'
import React from 'react'

import { useRouter } from 'next/navigation'

const Dashboard_button = () => {
   

    function handlechange(){
        const router=useRouter()
router.push('/Dashboard')


    
    }
  return (


    <>
    <button onClick={handlechange}>Dashboard</button>
    

    </>  
    )
}

export default Dashboard_button