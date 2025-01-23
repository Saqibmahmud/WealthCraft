import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";


export async  function transactions(userid:string) {

        const res= await axios.get('http://localhost:3001/budget-tracking/totalValues',{
            params:{userid}
    
    
        })
  
  return res.data ;
}

