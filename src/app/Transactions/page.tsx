import React from 'react'
import { transactions } from '../../../lib/transactions'
import { currentUser } from '@clerk/nextjs/server';
import { useAuth } from '@clerk/nextjs';

const Transactions = async () => {

    try{
const trans= await transactions() ;

const auth= useAuth() ;

  return (
    <>
    { auth.isSignedIn?<div className='h-80 w-80 bg-slate-950'>{trans}</div> : null}

    </>
    
  )
}
catch(error:any){

return <div>Error:{error.message|| "Login First"}</div>

}}

export default Transactions