import Dashboard from '@/app/Dashboard/page';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';
import axios from 'axios'
import { useRouter } from 'next/router';


export const login =async  (username:string,password:string)=> {


    try{
         
        const router=useRouter
   const response= await axios.post('http://localhost:3001/user/login',{username,password},{withCredentials:true}) ;
   

if(response){
 

    return true;
   
 }
}
 
catch(error:any){
//alert("Invalid Credentials")
    return false ;
}

}


export async  function registerUser() {
    const authDetail= auth() ;
    const user= await currentUser();
    console.log(user) ;
   const  userid=user?.id ;
   const username=user?.username;
   const firstname=user?.firstName
   const lastname=user?.lastName
   const email= user?.emailAddresses

    const res= await axios.post('localhost:3001/user/register',{
"userId":userid,
"username":username ,
"first_name":firstname ,
"last_name":lastname,
"email":email

    })
 






    return 
}

