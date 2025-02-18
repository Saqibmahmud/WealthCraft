import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react';
import { FaPiggyBank } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { MdCurrencyExchange, MdDashboard } from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";
import { RiGeminiFill } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import { FaRegMoneyBillAlt } from "react-icons/fa";


const AsideDashboard = () => {
  const user = useUser();
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isSavingsOpen, setIsSavingsOpen] = useState(false);
  const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);
  //bg-gray-800

  return (
    <aside className=" w-64 bg-black p-6 max-h-738 text-gray-400 rounded-md">
      <div className="mb-10">
        <h1 className="ml-11 text-2xl font-bold text-white">{user.user?.username}</h1>
      </div>
      <ul>
        <li className="mb-4 m-11 text-lg text-gray-400 hover:px-3 py-3 transition-all duration-100">
          <a href="/Dashboard" className="flex items-center space-x-2">
            <MdDashboard className="text-2xl flex-shrink-0 text-blue-500" />
            <span>Dashboard</span>
          </a>
        </li>
        <li
          className="mb-4 m-11 text-lg hover:px-2 py-3 transition-all duration-100"
          onClick={() => setIsAnalyticsOpen(!isAnalyticsOpen)}
        >
          <p className="flex items-center space-x-2 cursor-pointer">
            <SiGoogleanalytics className="text-2xl flex-shrink-0 text-red-400" />
            <span className={isAnalyticsOpen ? 'text-white' : 'text-gray-400'}>Analytics</span>
          </p>
        </li>
        {isAnalyticsOpen && (
          <div className="pl-4">
            <a href="/Dashboard/Analytics/Spendings" className="block py-2 px-8 hover:bg-gray-600 rounded-xl text-gray-400 ">
              Spendings
            </a>
            <a href="/Dashboard/Analytics/Income" className="block py-2 px-8 hover:bg-gray-600 rounded-xl text-gray-400 ">
              Income Analysis
            </a>
            
            {/* <a href="/analytics/custom-reports" className="block py-2 px-8 hover:bg-gray-600 rounded-xl text-gray-400 ">
              Custom Reports
            </a> */}
            <a href="/Dashboard/Analytics/CurrencyConversion" className="block py-2 px-8 hover:bg-gray-600 rounded-xl text-gray-400 ">
              Currency Conversion
            </a>
          </div>
        )}
        <li
          className="mb-4 m-11 text-lg hover:px-3 py-3 transition-all duration-100"
          onClick={() => setIsSavingsOpen(!isSavingsOpen)}
        >
          <p className="flex items-center space-x-2 cursor-pointer">
            <FaPiggyBank className="text-2xl flex-shrink-0 text-pink-400" />
            <span className={isSavingsOpen ? 'text-white' : 'text-gray-400'}>Savings</span>
          </p>
        </li>
        {isSavingsOpen && (
          <div className="pl-4">
            <a href="" className="block py-2 px-8 hover:bg-gray-600 rounded-xl text-gray-400 ">
              Goal Tracking
            </a>
           
            <a href="/analytics/custom-reports" className="block py-2 px-8 hover:bg-gray-600 rounded-xl text-gray-400 ">
              Saving Accounts
            </a>
          </div>
        )}
       <a href='/Dashboard/Transactions'> <li
          className="mb-4 m-11 text-lg hover:pl-2 hover:pr-12 py-3 transition-all duration-100"
          onClick={() => setIsTransactionsOpen(!isTransactionsOpen)}
        >
          <p className="flex items-center space-x-2 cursor-pointer">
            <MdCurrencyExchange className="text-2xl flex-shrink-0 text-green-500" />
            <span className={isTransactionsOpen ? 'text-white' : 'text-gray-400'}>Transactions</span>
          </p>
        </li> </a>
        

        <li className="m-11 text-lg hover:px-3 py-3 transition-all duration-100">
          <a href="/Dashboard/Ask-Ai" className="flex items-center space-x-2">
          <RiGeminiFill  className="text-2xl flex-shrink-0 text-yellow-300" />
            <span>Ask AI</span>
          </a>
        </li>

        <li className="m-11 text-lg hover:px-3 py-3 transition-all duration-100">
          <a href="/Dashboard/Bill-Reminder" className="flex items-center space-x-2">
          <FaRegBell   className="text-2xl flex-shrink-0 text-yellow-500" />
            <span>Bill Reminder/Alerts</span>
          </a>
        </li>

        <li className="m-11 text-lg hover:px-3 py-3 transition-all duration-100">
          <a href="/Dashboard/Stock_Chart" className="flex items-center space-x-2">
          <AiOutlineStock    className="text-2xl flex-shrink-0 text-blue-600" />
            <span>Stock Chart</span>
          </a>
        </li>

        <li className="m-11 text-lg hover:px-3 py-3 transition-all duration-100">
          <a href="/Dashboard/Tax_Calculator" className="flex items-center space-x-2">
          <FaRegMoneyBillAlt    className="text-2xl flex-shrink-0 text-green-500" />
            <span>Tax calculator</span>
          </a>
        </li>




        <li className="m-11 text-lg hover:px-3 py-3 transition-all duration-100">
          <a href="/Dashboard/Settings" className="flex items-center space-x-2">
            <IoIosSettings className="text-2xl flex-shrink-0 text-gray-400" />
            <span>Settings</span>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default AsideDashboard;
