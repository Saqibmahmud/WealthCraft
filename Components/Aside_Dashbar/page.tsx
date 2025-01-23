import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react';
import { FaPiggyBank } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { MdCurrencyExchange, MdDashboard } from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";

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
            <MdDashboard className="text-2xl flex-shrink-0" />
            <span>Dashboard</span>
          </a>
        </li>
        <li
          className="mb-4 m-11 text-lg hover:px-2 py-3 transition-all duration-100"
          onClick={() => setIsAnalyticsOpen(!isAnalyticsOpen)}
        >
          <p className="flex items-center space-x-2 cursor-pointer">
            <SiGoogleanalytics className="text-2xl flex-shrink-0" />
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
            <a href="/analytics/savings-trends" className="block py-2 px-8 hover:bg-gray-600 rounded-xl text-gray-400 ">
              Savings Trends
            </a>
            <a href="/analytics/custom-reports" className="block py-2 px-8 hover:bg-gray-600 rounded-xl text-gray-400 ">
              Custom Reports
            </a>
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
            <FaPiggyBank className="text-2xl flex-shrink-0" />
            <span className={isSavingsOpen ? 'text-white' : 'text-gray-400'}>Savings</span>
          </p>
        </li>
        {isSavingsOpen && (
          <div className="pl-4">
            <a href="" className="block py-2 px-8 hover:bg-gray-600 rounded-xl text-gray-400 ">
              Goal Tracking
            </a>
            <a href="/analytics/income-analysis" className="block py-2 px-8 hover:bg-gray-600 rounded-xl text-gray-400 ">
              Investment Tips
            </a>
            <a href="/analytics/custom-reports" className="block py-2 px-8 hover:bg-gray-600 rounded-xl text-gray-400 ">
              Saving Accounts
            </a>
          </div>
        )}
        <li
          className="mb-4 m-11 text-lg hover:pl-2 hover:pr-12 py-3 transition-all duration-100"
          onClick={() => setIsTransactionsOpen(!isTransactionsOpen)}
        >
          <p className="flex items-center space-x-2 cursor-pointer">
            <MdCurrencyExchange className="text-2xl flex-shrink-0" />
            <span className={isTransactionsOpen ? 'text-white' : 'text-gray-400'}>Transactions</span>
          </p>
        </li>
        {isTransactionsOpen && (
          <div className="pl-4">
            <a href="" className="block py-2 px-8 hover:bg-gray-600 rounded-xl text-gray-400 ">
              Add/Edit Transaction
            </a>
            <a href="/analytics/income-analysis" className="block py-2 px-8 hover:bg-gray-600 rounded-xl text-gray-400 ">
              Transaction History
            </a>
            <a href="/analytics/custom-reports" className="block py-2 px-8 hover:bg-gray-600 rounded-xl text-gray-400 ">
              Categories
            </a>
          </div>
        )}
        <li className="m-11 text-lg hover:px-3 py-3 transition-all duration-100">
          <a href="/settings" className="flex items-center space-x-2">
            <IoIosSettings className="text-2xl flex-shrink-0" />
            <span>Settings</span>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default AsideDashboard;
