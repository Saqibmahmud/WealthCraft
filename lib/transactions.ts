import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";


export async  function transactions(userid:string) {

        const res= await axios.get('http://localhost:3001/budget-tracking/totalValues',{
            params:{userid}
    
    
        })
  
  return res.data ;
}



export async function getMonthly_Expense(userid:string){
  const res = await axios.get('http://localhost:3001/budget-tracking/expenseTotals',{ params:{userid}})
  return res.data;


}



export async function getMonthlyCategoriseSpending(userid:string){

  const res = await axios.get('http://localhost:3001/budget-tracking/monthlyTotalSpendingByCategory',{ params:{userid}})
  return res.data;


}


export async function createNewExpense(
  Description: string,
  ammount: number,
  userId: string,
  category: string
) {
  try {
    const response = await axios.post(
      `http://localhost:3001/budget-tracking/createExpense?userId=${userId}`,
      {
        "Description": Description,
        "ammount": ammount,  
       "category": category
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error creating expense:', error);
    throw error;
  }
}


export async function getExpenses(userId: string) {

  const response = await axios.get(
    `http://localhost:3001/budget-tracking/expenses`,
    { params: { userId } }
  );
  return response.data;
}


export async function getIncomes(userId: string) {

  const response = await axios.get(
    `http://localhost:3001/budget-tracking/incomes`,
    { params: { userId } }
  );
  return response.data;
}



export async function getMonthlyIncomeTotals(userId:string){
  const res = await axios.get('http://localhost:3001/budget-tracking/incomeTotals',{ params:{userId}})
  return res.data;
  
} 



export async function getLaastThreemonthIncome(userid:string){

  const res = await axios.get('http://localhost:3001/budget-tracking/monthlyIncomeSummary',{ params:{userid}})
  return res.data;


}


export async function createNewIncome(
  Description: string,
  ammount: number,
  userId: string,
  category: string
) {
  try {
    const response = await axios.post(
      `http://localhost:3001/budget-tracking/addIncome?userId=${userId}`,
      {
        "Description": Description,
        "ammount": ammount,  
       "category": category
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error creating expense:', error);
    throw error;
  }
}




 //month count er function 
 export  function getMonthNames(): { currentMonth: string, previousMonth: string, twoMonthsAgo: string } {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const today = new Date();
  
  const currentMonthIndex = today.getMonth();
  const previousMonthIndex = (currentMonthIndex - 1 + 12) % 12;
  const twoMonthsAgoIndex = (currentMonthIndex - 2 + 12) % 12;

  return {
    currentMonth: monthNames[currentMonthIndex],
    previousMonth: monthNames[previousMonthIndex],
    twoMonthsAgo: monthNames[twoMonthsAgoIndex]
  };
}





export async function allTransactions(userid:string){

  const res = await axios.get('http://localhost:3001/budget-tracking/all',{ params:{userid}})
  return res.data;


}


export async function lastThreetran(userid:string){

  const res = await axios.get('http://localhost:3001/budget-tracking/latest',{ params:{userid}})
  return res.data;


}


export async function everyTransactions(){

  const res = await axios.get('http://localhost:3001/budget-tracking/everyTrans')
  return res.data;


}
