import axios from "axios";

export async function createNewFeedback(
    subject:string,
    name: string,
   
    contactEmail:string ,
    message:string 
  ) {
    try {
      const response = await axios.post(
        `http://localhost:3001/feedback/support-request`,
        {
            "subject":subject  ,
            "name":name,
            "contactEmail":contactEmail ,
          "message": message,
         
        }
      );
  
      return response.data;
    } catch (error) {
      console.error('Error creating expense:', error);
      throw error;
    }

}





export async function GetAllFeedbback(){

const response =await axios.get('http://localhost:3001/feedback/allFeedback')
return  response.data  ;


}