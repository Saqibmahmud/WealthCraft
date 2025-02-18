'use client'

import { Chart as ChartJs } from 'chart.js';
import { registerables } from 'chart.js'
ChartJs.register(...registerables);

import { Bar, Doughnut } from 'react-chartjs-2';
import React, { useEffect, useState, useMemo } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import AsideDashboard from '../../../Components/Aside_Dashbar/page';
import { lastThreetran, transactions } from '../../../lib/transactions';
import IncomeBarChart from '../../../Components/incomeBar/incomebar';

import Link from 'next/link';
import AdminTabletran from './AdminTranTable/page';
import AdminAsideDashboard from '../../../Components/Admin_Aside_Dashbar/page';
//import AdminUserTable from '../../../Components/AdminuserTable/page';

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
  interface Transaction {
    ammount: number;
    transactionCategory: string;
  }
  
  const [transaction, setTransaction] = useState<Transaction[]>([]);

  


  useEffect(() => {
    async function fetchtransactions(){
      try {
        if (user?.id) {
          const result = await transactions(user.id);
          setResponse(result);
          const transactionResponse=await lastThreetran(user.id) ;
          setTransaction(transactionResponse) ;
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
  const isAdmin = user?.username === 'admin';
  if (isAdmin) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
   

      <main className="relative z-10 flex flex-col items-center p-8  text-cente w-full">
        <h1 className="text-3xl font-bold mb-4">Hello Admin!!</h1>
        <p className="text-lg text-gray-300 max-w-md">
          Welcome to your dashboard. Manage and oversee your data efficiently.
        </p>
        <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
          <AdminAsideDashboard  />
        </div>
      </main>
    </div>
    );
  }
  
  return (
    
    <>
    
    <div className="min-h-screen bg-black text-white flex">
           <AsideDashboard/>
      
      <main className="flex-grow p-8">
    
     
          <div className="grid grid-cols-4 gap-1 mb-6 bg-yellow-100 rounded-3xl h-28">
          <div className="p-4 rounded-lg bg-yellow-100 border-black border-2">
            <h3 className="text-lg text-black font-medium">Available Balance</h3>
            <p className="text-xl text-black mt-5 font-bold"> {response?.net_income}</p>
          </div>
          <div className="p-4 rounded-lg bg-yellow-100 border-black border-2">
            <h3 className="text-lg text-black font-medium">Income</h3>
            <p className="text-xl text-black mt-5 font-bold">{response?.total_income}</p>
          </div>
          <div className="p-4 rounded-lg bg-yellow-100 border-black border-2">
            <h3 className="text-lg text-black font-medium">Spent</h3>
            <p className="text-xl text-black mt-5 font-bold">{response?.total_expense}</p>
          </div>
          <div className="p-4 rounded-lg bg-yellow-100 border-black border-2">
            <h3 className="text-lg text-black font-medium">Investment</h3>
            <p className="text-xl text-black mt-5 font-bold">{response?.total_investment}</p>
          </div>
        </div>
        
        {/* Income Analysis and Spendings */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-800 p-6 rounded-3xl mb-10">
            <h3 className="text-lg font-medium mb-4">Income Analysis</h3>
            <IncomeBarChart/>
          </div>
          <Link href='/Dashboard/Analytics/Spendings'>
            <div className="bg-gray-800 p-6 rounded-3xl cursor-pointer">
              <h3 className="text-lg font-medium mb-4">Spendings</h3>
              <Doughnut
                data={{
                  labels: ['Investing', 'Personal', 'Debt', 'Bill'],
                  datasets: [{
                    label: 'Expense',
                    data: [200, 300, 500, 300],
                    backgroundColor: [
                      'rgba(40,63,222,0.8)',
                      'rgba(255,12,196,0.8)',
                      'rgba(255,35,15,0.8)',
                      'rgba(95,235,15,0.8)'
                    ],
                    borderRadius: 4
                  }]
                }}
              />
            </div>
          </Link>
        </div>
       
        {/* Transactions and My Cards */}
        <div className="grid grid-cols-2 mt-12 gap-4">
        <div className="bg-gray-800 p-6 rounded-3xl mb-10 shadow-lg">
  <h3 className="text-lg font-semibold mb-4 text-white border-b-2 pb-2 border-gray-600">Transactions</h3>
  <ul className="space-y-3">
    {transaction.length > 0 ? (
      transaction.map((tran, index) => (
        <li
          key={index}
          className="mb-2 p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300 ease-in-out shadow-md"
        >
          <span className="text-green-400 font-bold">{tran.ammount}Tk</span>  
          <span className="text-gray-300 ml-2">- {tran.transactionCategory}</span>
        </li>
      ))
    ) : (
      <p className="text-gray-400 text-center mt-4 italic">No recent transactions available</p>
    )}
  </ul>
</div>

          <div className="bg-gray-800 p-6 rounded-3xl mb-10">
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
