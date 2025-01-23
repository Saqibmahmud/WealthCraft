'use client'

import { Chart as ChartJs } from 'chart.js';
import {registerables} from 'chart.js'
ChartJs.register(...registerables);

import { Bar,Doughnut } from 'react-chartjs-2';
import React, { useEffect, useState, useMemo } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import AsideDashboard from '../../../Components/Aside_Dashbar/page';
import { transactions } from '../../../lib/transactions';

export default function Dashboard() {
  const auth = useAuth();
  const { user } = useUser();

  interface TransactionResponse {
    net_income: number;
    total_income: number;
    total_expense: number;
    total_investment: number;
  }

  const [response, setResponse] = useState<TransactionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Move getLastThreeMonths inside useMemo
  const lastThreeMonths = useMemo(() => {
    const today = new Date();
    const months: string[] = []; 
    for (let i = 2; i >= 0; i--) {
      let monthIndex = today.getMonth() - i;
      if (monthIndex < 0) {
        monthIndex += 12;
      }

      const monthName = new Date(today.getFullYear(), monthIndex, 1).toLocaleString("default", {
        month: "long",
      });

      months.push(monthName);
    }
    return months;
  }, []);

  useEffect(() => {
    async function fetchtransactions(){
      try {
        if (user?.id) {
          const result = await transactions(user.id);
          setResponse(result);
        } else {
          throw new Error("User ID is undefined");
        }
      }
      catch(err:any){
        setError(err);
      }
      finally{
        setLoading(false);
      }
    }

    if (auth.isSignedIn) {
      fetchtransactions();
    }
  }, [user?.id, auth.isSignedIn]);

  
  if (!auth.isSignedIn || loading) {
    return <div>Loading....</div>;
  }
  
  return (
    
    <>
    
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <AsideDashboard/>
      
      

      {/* Main Content */}
      <main className="flex-grow p-8">
     
        {/* Top Metrics */}
        <div className="grid grid-cols-4 gap-1 mb-6 bg-yellow-100 rounded-3xl h-28">
          <div className=" p-4 rounded-lg  bg-yellow-100  border-black border-2 ">
            <h3 className="text-lg  text-black font-medium">Available Balance</h3>
            <p className="text-xl text-black mt-5 font-bold"> {response?.net_income }




            </p>
          </div>
          <div className="p-4 rounded-lg  bg-yellow-100  border-black border-2">
            <h3 className="text-lg  text-black font-medium">Income</h3>
            <p className="text-xl text-black mt-5  font-bold">{response?.total_income}</p>
          </div>
          <div className="p-4 rounded-lg  bg-yellow-100  border-black border-2">
            <h3 className="text-lg  text-black font-medium">Spent</h3>
            <p className="text-xl text-black  mt-5 font-bold">{response?.total_expense}</p>
          </div>
          <div className="p-4 rounded-lg  bg-yellow-100  border-black border-2">
            <h3 className="text-lg  text-black font-medium">Investment</h3>
            <p className="text-xl text-black mt-5 font-bold">{response?.total_investment}</p>
          </div>
        </div>
        
        {/* Income Analysis and Spendings */}
        <div className="grid grid-cols-2 gap-6 mb-6 ">
          
          <div className="bg-gray-800 p-6 rounded-3xl  mb-10 ">
            <h3 className="text-lg font-medium mb-4">Income Analysis</h3>
            <p>
              <Bar //self closing tag
              data={{
                labels: lastThreeMonths,
                datasets:[{
                  label:'Income',
                  data:[200,300,500],// ekhane api theke  dtaa fetch kore boashno hobe pore
                  backgroundColor:[
                    'rgba(128,50,128,0.9)',
                     //'rgba(250,192,19,0.8)',
                      //'rgba(253,135,135,0.8)'

                  ],
                  borderRadius:4
                }]


              }}/>

  
          </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-3xl ">
            <h3 className="text-lg font-medium mb-4">Spendings</h3>
            <p><Doughnut
              data={{
                labels:['Investing','Personal','Debt','Bill'] ,
                datasets:[{
                  label:'Expense',
                  data:[200,300,500,300],// ekhane api theke  dtaa fetch kore boashno hobe pore
                  backgroundColor:[
                    'rgba(40,63,222,0.8)',
                     'rgba(255,12,196,0.8)',
                      'rgba(255,35,15,0.8)',
                      'rgba(95,235,15,0.8)'
                  ],
                  borderRadius:4
                }]


              }}/>


                
              </p>
          </div>
        </div>
       
        {/* Transactions and My Cards */}
        <div className="grid grid-cols-2  mt-12  gap-4">
          <div className="bg-gray-800 p-6 rounded-3xl  mb-10">
            <h3 className="text-lg font-medium mb-4">Transactions</h3>
            <ul>
              <li className="mb-2">20000Tk - House Rent</li>
              <li className="mb-2">6000Tk - Book Bill</li>
              <li className="mb-2">4000Tk - Gas Bill</li>
              <li className="mb-2">10000Tk - Loan Payment</li>
            </ul>
          </div>
          <div className="bg-gray-800 p-6 rounded-3xl  mb-10">
            <h3 className="text-lg font-medium mb-4">My Cards</h3>
            <div className="bg-gray-700 p-4 rounded">
              <p className="text-lg font-medium">1437 6735 **** ****</p>
              <p className="text-sm">Al Mahmud</p>
              <p className="text-sm">Exp: 04/2027</p>
            </div>
            <button className="mt-4 w-full bg-purple-600 py-2 rounded">+ Add New Card</button>
          </div>
        </div>
       
      </main>
    </div> 
   
    </>
  );
}

