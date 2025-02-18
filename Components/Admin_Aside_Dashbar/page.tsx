import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { MdCurrencyExchange, MdDashboard } from "react-icons/md";

import { RiGeminiFill } from "react-icons/ri";



const AdminAsideDashboard = () => {
  const user = useUser();

  //bg-gray-800

  return (
    <aside className=" w-64 bg-black p-6 max-h-738 text-gray-400 rounded-md ">
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
       

        <li className="m-11 text-lg hover:px-3 py-3 transition-all duration-100">
          <a href="/Dashboard/AdminTranTable" className="flex items-center space-x-2">
          <MdCurrencyExchange className="text-2xl flex-shrink-0 text-green-500" />
            <span>All Transactions</span>
          </a>
        </li>

        <li className="m-11 text-lg hover:px-3 py-3 transition-all duration-100">
          <a href="https://dashboard.clerk.com/apps/app_2rU7lSbG93Del1nFSpET3hFMLkd/instances/ins_2rU7ldXd4seUzolpbStPTvPw7hs" className="flex items-center space-x-2" target='_blank'>
          <FaUser  className="text-2xl flex-shrink-0 text-yellow-300" />
            <span>User Management</span>
          </a>
        </li>



 <li className="m-11 text-lg hover:px-3 py-3 transition-all duration-100">
          <a href="/Dashboard/Feedbacks"className="flex items-center space-x-2" >
          <FaUser  className="text-2xl flex-shrink-0 text-yellow-300" />
            <span>Feedacks</span>
          </a>
        </li>
        
      </ul>
    </aside>
  );
};

export default AdminAsideDashboard;
