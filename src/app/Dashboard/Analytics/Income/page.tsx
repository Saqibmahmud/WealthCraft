'use client'
import { Chart as ChartJs } from 'chart.js';
ChartJs.register(...registerables);
import {registerables} from 'chart.js'
import { useAuth } from '@clerk/nextjs'
import React, { useState } from 'react'
import { Bar,Doughnut, Pie } from 'react-chartjs-2';
import AsideDashboard from '../../../../../Components/Aside_Dashbar/page';
import ExpenseTable from '../../../../../Components/ExpenseTable/page';

import IncomeSubmitionForm from '../../../../../Components/IncomeSubmitionForm/page';


const Income = () => {
    let page='income'
     const auth= useAuth() ;
    if(!auth.isSignedIn){
        return null ;
    }


    const Income = {
        labels: ['Jan', 'February', 'March', 'Aprul', 'May'],
        datasets: [
          {
            data: [500, 200, 1200, 300, 100],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#6BC5C0', '#9966FF'],
          },
        ],
      };
  return (
    <>    
    
    <div className='flex bg-black'>
    <AsideDashboard/>
      <div className="min-h-screen w-10/12 bg-black text-white p-5">
        
      <h1 className="text-3xl font-bold text-center mb-6">Income Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    
        {/* Summary Cards */}
        <div className="bg-gray-800 shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">Total Income This Month</h2>
          <p className="text-2xl font-bold text-green-500">$5,200</p>
        </div>
        <div className="bg-gray-800 shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">Total Income This Week</h2>
          <p className="text-2xl font-bold text-green-500">$1,200</p>
        </div>
        <div className="bg-gray-800 shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">Total Income This Year</h2>
          <p className="text-2xl font-bold text-green-500">$52,000</p>
        </div>
      </div> 
      
     
      
      
      
     
<div className="block left-2  max-h-screen w-full  mt-6 " >
          {/* Doughnut Chart */}
      <div className="bg-gray-800 col-span-1 w-full   rounded-xl">
          
             <h3 className='text-center font-bold text-3xl mt-2'>Incomes  </h3>
             <div className=' mx-auto p-6 border-white border-2 rounded-xl max-w-96 mt-6'>
             <div className="space-y-0">
    <h4 className="text-red-600 font-bold flex items-center gap-2 m-1">
      Maximum Spents on: 
      <span className="ml-2 inline-block w-32 border-b-2 border-red-600"> thik</span>
    </h4>
    <h4 className="text-green-400 font-bold flex items-center gap-2 m-1">
      Minimum Spents on:
      <span className="ml-2 inline-block w-32 border-b-2 border-green-400"> thikache </span>
    </h4>
  </div>
             </div>
         
            <div className="flex justify-center  ">
              <div className="w-[500px] h-full mt-10 ">
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
<IncomeSubmitionForm/>
</div>


      </div>
    

     
      </div>
      
    
    </>

  )
  
}

export default Income