import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa";

const ExpenseSubmitionForm = () => {
function handleSubmit(){}









  return (
    <>
    <form onSubmit={handleSubmit} className="mt-8 space-y-4 bg-gray-700 p-6 rounded-lg">
          <h3 className="text-white text-lg font-semibold mb-4">Add New Expense </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
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
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <input
                type="text"
                required
                className="w-full bg-gray-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                //value={}
               // onChange={}
              />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                Category
             </label>
             <select
             required
                className="w-full bg-gray-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                    defaultValue="" >
                  
                   <option value="" disabled>
                Select a category
                 </option>
                   <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
                  <option value="category3">Category 3</option>
                 <option value="category4">Category 4</option>
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
               // value={}
                //onChange={}
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