'use client'
import { Chart as ChartJs } from 'chart.js';
import {registerables} from 'chart.js'
ChartJs.register(...registerables);
import { useAuth, useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import AsideDashboard from '../../../../../Components/Aside_Dashbar/page';
import ExpenseTable from '../../../../../Components/ExpenseTable/page';
import IncomeSubmitionForm from '../../../../../Components/IncomeSubmitionForm/page';
import { getLaastThreemonthIncome, getMonthlyIncomeTotals, getMonthNames } from '../../../../../lib/transactions';
import IncomeTable from '../../../../../Components/IncomeTable/page';

const Income = () => {
   interface newResult {
    currentMonth: number,
    previousMonth: number,
    lastMonth: number,
   }

   interface IncomeResponse {
    totalMonthlyIncome: number;
    totalWeeklyIncome: number;
    totalYearlyIncome: number;
   }

   
   const { isSignedIn } = useAuth();
   const { user } = useUser();
   const [loading, setLoading] = useState(true);
   const [response, setResponse] = useState<IncomeResponse | null>(null);
   const [newresult, setNewresult] = useState<newResult | null>(null);

   
   if (!isSignedIn) {
     return null;
   }

   const monthName = getMonthNames();

   useEffect(() => {
     const fetchMonthlyIncome = async () => {
       try {
         if (user?.id) {
           const result = await getMonthlyIncomeTotals(user.id);
           setResponse(result);
           
           const newResult = await getLaastThreemonthIncome(user.id);
           setNewresult(newResult);
         } else {
           console.error("User ID is undefined");
         }
       } catch (err) {
         console.error("Error fetching income data:", err);
       } finally {
         setLoading(false);
       }
     }

     fetchMonthlyIncome();
   }, [user?.id]); 

   
   if (loading) {
     return <div>Loading...</div>;
   }

   
   const Income = {
     labels: [monthName.twoMonthsAgo, monthName.previousMonth, monthName.currentMonth],
     datasets: [
       {
         data: [
           Number(newresult?.lastMonth || 0),
           Number(newresult?.previousMonth || 0),
           Number(newresult?.currentMonth || 0)
         ],
         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#6BC5C0', '#9966FF'],
       },
     ],
   };

   return (
     <div className='flex bg-black'>
       <AsideDashboard/>
       <div className="min-h-screen w-10/12 bg-black text-white p-5">
         <h1 className="text-3xl font-bold text-center mb-6">Income Dashboard</h1>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {/* Summary Cards */}
           <div className="bg-gray-800 shadow-md rounded-lg p-4">
             <h2 className="text-xl font-semibold">Total Income This Month</h2>
             <p className="text-2xl font-bold text-green-500">{response?.totalMonthlyIncome || 0}</p>
           </div>
           <div className="bg-gray-800 shadow-md rounded-lg p-4">
             <h2 className="text-xl font-semibold">Total Income This Week</h2>
             <p className="text-2xl font-bold text-green-500">{response?.totalWeeklyIncome || 0}</p>
           </div>
           <div className="bg-gray-800 shadow-md rounded-lg p-4">
             <h2 className="text-xl font-semibold">Total Income This Year</h2>
             <p className="text-2xl font-bold text-green-500">{response?.totalYearlyIncome || 0}</p>
           </div>
         </div>

         <div className="block left-2 max-h-screen w-full mt-6">
           <div className="bg-gray-800 col-span-1 w-full rounded-xl">
             <h3 className='text-center font-bold text-3xl mt-2'>Incomes</h3>
             <div className="flex justify-center">
               <div className="w-[500px] h-full mt-10">
                 <Bar
                   data={Income}
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
                 />
               </div>
             </div>
           </div>
         </div>

         <div className='bg-gray-800 min-h-96 w-full mt-6 rounded-xl'>
           <IncomeTable/>
         </div>
         
         <div>
           <IncomeSubmitionForm/>
         </div>
       </div>
     </div>
   )
}

export default Income