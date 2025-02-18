'use client'

import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa";
import { createNewExpense } from '../../lib/transactions';

const ExpenseSubmitionForm = () => {
  const { user } = useUser();
const [description, setDescription] = useState('');
const[category,setCategory]=useState('');
const[amount,setAmount]=useState(0);

const handleSubmit=async(event:React.FormEvent<HTMLFormElement>)=>{

if(!user){
  return;
}
try{
  //event.preventDefault();
const userId=user.id;
const response=await createNewExpense(description,amount,userId,category);
alert(response);

setAmount(0);
setCategory('');


}
catch(error){
  console.error('Error creating expense:', error);
  throw error;



}
}


  return (
    <>
    <form onSubmit={handleSubmit} className="mt-8 space-y-4 bg-gray-700 p-6 rounded-lg">
          <h3 className="text-white text-lg font-semibold mb-4">Add New Expense </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Date
              </label>
              <input
                type="date"
                required
                className="w-full bg-gray-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
              //  value={newExpense.date}
              //  onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
              />
            </div> */}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <input
                type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            
               
                className="w-full bg-gray-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                Category
             </label>
             <select
              required
              className="w-full bg-gray-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Savings&Investment">Savings & Investment</option>
              <option value="PersonalExpense">Personal Expense</option>
              <option value="Essentials">Essentials</option>
              <option value="Debt">Debt</option>
            </select>
          </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Amount
              </label>
              <input
                type="number"
                required
                step="0.01"
                min="0"
                className="w-full bg-gray-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                value={amount}
                onChange={(e)=>{setAmount(Number(e.target.value))}}
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="flex items-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              
            >
              <FaPlus  className="w-4 h-4" />
              Add Expense
            </button>
          </div>
        </form>
        </>
  )
}

export default ExpenseSubmitionForm