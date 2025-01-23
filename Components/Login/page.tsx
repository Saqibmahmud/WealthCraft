import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'
import {login} from '../../lib/user';
import Link from 'next/link';

const Login = () => {
    const[inputData,setinputdata]=useState({
        username:"" ,
        password:""
    
      })
      const router=useRouter();

     async function handlechange(e:FormEvent){
        setinputdata({username:"" ,
            password:""})
     
        e.preventDefault()
        let res =await login(inputData.username,inputData.password);
        if(res){
          alert("Login Succesfull" )
          router.push('/Dashboard')
        }
        else{
          alert("Invalid user")
        }
        
       
      
      
      } 
  return (
    
        <div className="p-4 ">

       <p className="text-sm text-gray-600 text-center" ><b>Please Login</b></p>
       <input type="text" placeholder="Username" className="mt-2 w-full p-2 border border-gray-300 rounded-md"
        value={inputData.username}   onChange={(e:any)=>{setinputdata({...inputData , username:e.target.value})}}/>

       <input type="password" placeholder="Password" className="mt-2 w-full p-2 border border-gray-300 rounded-md "
       value={inputData.password} onChange={(e:any)=>{setinputdata({...inputData,password:e.target.value})   }}/>

       <button  onClick={handlechange}
         className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Login</button>
       <br/><br/>
       <p className="text-center">New Here? <Link href="/CreateNewAccount" className='text-blue-900 font-bold'>Sign Up</Link></p>


        </div>
      

    
  )
}

export default Login