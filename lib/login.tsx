import Dashboard from '@/app/Dashboard/page';
import axios from 'axios'
import { useRouter } from 'next/router';


const login =async  (username:string,password:string)=> {


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

export default login