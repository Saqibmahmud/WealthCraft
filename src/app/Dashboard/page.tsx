'use client'

import { Chart as ChartJs } from 'chart.js';
ChartJs.register(...registerables);
import {registerables} from 'chart.js'
import { FaPiggyBank } from "react-icons/fa6";
import { Bar,Doughnut } from 'react-chartjs-2';
import React from 'react';
import { useUser } from '@clerk/nextjs';
import { IoIosSettings } from "react-icons/io";
import { MdCurrencyExchange } from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";
import { MdDashboard } from "react-icons/md";
import Feedback from '../../../Components/Feedback/page';


export default  function  Dashboard() {
  const user=  useUser();
  
  return (
    <>
    
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 max-h-738 rounded-md " >
        <div className="mb-10"> 
          <h1 className=" ml-11 text-2xl font-bold">{user.user?.username}</h1>
        </div>
        <ul >
          <li className="mb-4 m-11 text-lg  border-white border-2 rounded-3xl px-3 py-3 "><i className="fa-solid fa-house"></i><a href="/Dashboard" className='flex items-center space-x-2 '> <MdDashboard className='text-2xl flex-shrink-0'/><span className="truncate">Dashboard</span></a></li>
          <li className="mb-4 m-11 text-lg hover: border-white hover:border-2 hover:rounded-3xl hover:px-2 py-3 transition-all duration-100" ><a href="#" className='flex items-center space-x-2 '> <SiGoogleanalytics className='text-2xl flex-shrink-0' /><span>Analytics</span></a></li>
          <li className="mb-4 m-11 text-lg hover: border-white hover:border-2 hover:rounded-3xl hover:px-3 py-3 transition-all duration-100"><a href="#" className='flex items-center space-x-2 '><FaPiggyBank className='text-2xl flex-shrink-0'/><span>Savings</span></a></li>
          <li className="mb-4  m-11 text-lg  hover: border-white hover:border-2 hover:rounded-3xl hover:pl-2 hover:pr-12 py-3 transition-all duration-100"><a href="#" className='flex items-center space-x-2 '><MdCurrencyExchange  className='text-2xl flex-shrink-0'/><span className="truncate">Transactions</span></a></li>
          <li className=" m-11 text-lg hover: border-white hover:border-2 hover:rounded-3xl hover:px-3 py-3 transition-all duration-100"><a href="#" className='flex items-center space-x-2  ' ><IoIosSettings className='text-2xl flex-shrink-0' /><span>Settings</span></a></li>
        </ul>
      </aside>
      

      {/* Main Content */}
      <main className="flex-grow p-8">
     
        {/* Top Metrics */}
        <div className="grid grid-cols-4 gap-1 mb-6 bg-yellow-100 rounded-3xl h-28">
          <div className=" p-4 rounded-lg  bg-yellow-100  border-black border-2 ">
            <h3 className="text-lg  text-black font-medium">Available Balance</h3>
            <p className="text-xl text-black mt-5 font-bold">176438Tk</p>
          </div>
          <div className="p-4 rounded-lg  bg-yellow-100  border-black border-2">
            <h3 className="text-lg  text-black font-medium">Income</h3>
            <p className="text-xl text-black mt-5  font-bold">40000Tk</p>
          </div>
          <div className="p-4 rounded-lg  bg-yellow-100  border-black border-2">
            <h3 className="text-lg  text-black font-medium">Spent</h3>
            <p className="text-xl text-black  mt-5 font-bold">35787Tk</p>
          </div>
          <div className="p-4 rounded-lg  bg-yellow-100  border-black border-2">
            <h3 className="text-lg  text-black font-medium">Investment</h3>
            <p className="text-xl text-black mt-5 font-bold">40000Tk</p>
          </div>
        </div>
        
        {/* Income Analysis and Spendings */}
        <div className="grid grid-cols-2 gap-6 mb-6 ">
          
          <div className="bg-gray-800 p-6 rounded-3xl  mb-10 ">
            <h3 className="text-lg font-medium mb-4">Income Analysis</h3>
            <p>
              <Bar //self closing tag
              data={{
                labels:['Investing','Salary','Loan'] ,
                datasets:[{
                  label:'Income',
                  data:[200,300,500],// ekhane api theke  dtaa fetch kore boashno hobe pore
                  backgroundColor:[
                    'rgba(250,235,129,0.8)',
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
        <div className="grid grid-cols-2  mt-12">
          <div className="bg-gray-800 p-6 rounded">
            <h3 className="text-lg font-medium mb-4">Transactions</h3>
            <ul>
              <li className="mb-2">20000Tk - House Rent</li>
              <li className="mb-2">6000Tk - Book Bill</li>
              <li className="mb-2">4000Tk - Gas Bill</li>
              <li className="mb-2">10000Tk - Loan Payment</li>
            </ul>
          </div>
          <div className="bg-gray-800 p-6 rounded">
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

