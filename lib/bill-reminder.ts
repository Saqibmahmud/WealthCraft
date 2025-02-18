import axios from "axios";

export async function addNewBill(  billName: string,dueDate:Date,
    amount: number,userId:string,userEmailAddress:string
    ){

    
      
       {
        try {
          const response = await axios.post(
            `http://localhost:3001/bill-reminder/add?userId=${userId}`,
            
                {
                    "billName":billName ,
                    "dueDate":dueDate,
                    "amount":amount,
                    "userEmailAddress":userEmailAddress
                }
            
          );
      
          return response.data;
        } catch (error) {
          console.error('Error creating expense:', error);
          throw error;
        }
      }

}




