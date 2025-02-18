'use client'
import { Chart as ChartJs } from 'chart.js';
ChartJs.register(...registerables);
import {registerables} from 'chart.js'
import { useAuth, useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { Bar,Doughnut, Pie } from 'react-chartjs-2';
import AsideDashboard from '../../../../../Components/Aside_Dashbar/page';
import ExpenseTable from '../../../../../Components/ExpenseTable/page';

import ExpenseSubmitionForm from '../../../../../Components/ExpenseSubmitionForm/page';
import { getMonthly_Expense, getMonthlyCategoriseSpending } from '../../../../../lib/transactions';

const Spendings = () => {
  const auth= useAuth() ;
  const page='expense'
  const user=useUser()
   const [loading, setLoading] = useState(true);

   interface SpendingResponse{
    totalMonthlyExpense: number;
    totalWeeklyExpense: number;
    totalYearlyExpense: number;
  
   }

   interface SpendingBycategoryResponse{
savingInvestment: number ,
    personalSpendings: number ,
    essentialSpendings:number ,
    debtPayments: number ,
    highest: string ,
    lowest: string ,


   }


  const [response,setResponse]=useState<SpendingResponse | null>(null)
  const [category,setCategory]=useState<SpendingBycategoryResponse|null>(null)

  const [timeFilter, setTimeFilter] = useState('monthly'); // 'daily', 'weekly', 'monthly'

  // Sample data
  const spendingCategories = {
    labels: ['Saving&Investment', 'PersonalExpense', 'Essentials', 'Debt',],
    datasets: [
      {
        data:
         [ 50000,Number(category?.personalSpendings),30000,40000],
          
        // [  category?.savingInvestment ,
        //   category?.personalSpendings ,
        //   category?.essentialSpendings ,
        //   category?.debtPayments ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#6BC5C0', '#9966FF'],
      },
    ],
  };

  // const spendingTrends = {
  //   labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  //   datasets: [
  //     {
  //       label: 'Spending Trends',
  //       data: [1200, 1500, 900, 2000],
  //       fill: false,
  //       borderColor: '#36A2EB',
  //       tension: 0.1,
  //     },
  //   ],
  // };

  // const spendingComparison = {
  //   labels: ['January', 'February', 'March', 'April'],
  //   datasets: [
  //     {
  //       label: 'Spendings',
  //       data: [4000, 3000, 4500, 5000],
  //       backgroundColor: '#4BC0C0',
  //     },
  //   ],
  // };


  useEffect(() => {

const fetchMonthlyExoense=async()=>{
 try {
         if (user.user?.id) {
           const result = await getMonthly_Expense(user.user?.id);
           setResponse(result);
           const newresult= await getMonthlyCategoriseSpending(user.user.id)
           setCategory(newresult);
         } else {
           throw new Error("User ID is undefined");
         }
       }
       catch(err:any){
         throw new Error(err);
       }
       finally{
        setLoading(false);
       }
       
     }
 
     if (auth.isSignedIn) {
       fetchMonthlyExoense();
     }
   }, [user.user?.id, auth.isSignedIn]);
     
  if (!auth.isSignedIn || loading) {
    return <div>Loading....</div>;
  }

  return (
   
   <>    
   {
      auth.isSignedIn?
   
    <div className='flex bg-black'>
    <AsideDashboard/>
      <div className="min-h-screen w-10/12 bg-black text-white p-5">
        
      <h1 className="text-3xl font-bold text-center mb-6">Spendings Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    
        
        <div className="bg-gray-800 shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">Total Spendings This Month</h2>
          <p className="text-2xl font-bold text-red-600">{response?.totalMonthlyExpense}</p>
        </div>
        <div className="bg-gray-800 shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">Total Spendings This Week</h2>
          <p className="text-2xl font-bold text-red-600">{response?.totalWeeklyExpense}</p>
        </div>
        <div className="bg-gray-800 shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">Total Spendings This Year</h2>
          <p className="text-2xl font-bold text-red-600">{response?.totalYearlyExpense}</p>
        </div>
      </div> 
      
     
      
      
      
     
<div className="block left-2  max-h-screen w-full  mt-6 " >
       
      <div className="bg-gray-800 col-span-1 w-full   rounded-xl">
          
             <h3 className='text-center font-bold text-3xl mt-2'>Expenses by Categories </h3>
             <div className=' mx-auto p-6 border-white border-2 rounded-xl max-w-96 mt-6'>
             <div className="space-y-0">
    <h4 className="text-red-600 font-bold flex items-center gap-2 m-1">
      Maximum Spents on: 
      <span className="ml-2 inline-block w-32 border-b-2 border-red-600"> {category?.highest}</span>
    </h4>
    <h4 className="text-green-400 font-bold flex items-center gap-2 m-1">
      Minimum Spents on:
      <span className="ml-2 inline-block w-32 border-b-2 border-green-400">{category?.lowest} </span>
    </h4>
  </div>
             </div>
         
            <div className="flex justify-center  ">
              <div className="w-[500px] h-[500px] ">
                <Pie
                  data={spendingCategories}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                      legend: {
                        position: 'right',
                        labels: {
                          color: 'white'
                        }
                      }
                    }
                  }}
                /> </div>
                  </div> 
                </div> 
              </div>

<div className='bg-gray-800  min-h-96 w-full mt-6 rounded-xl'>
 <>
<ExpenseTable/>

</>
</div>
<div>
<ExpenseSubmitionForm/>
</div>


      </div>
    

     
      </div>
      :null}
    
    </>

  )
}

export default Spendings