import axios from 'axios'

const getUserDetail = async() => {

const user=await axios.get('http://localhost:3001/user/Dashboard',{withCredentials:true})

  return   user.data;
    
 
}

export default getUserDetail