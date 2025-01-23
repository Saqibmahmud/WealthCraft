'use client'
import React, { useState } from 'react'
import { FaSearch,FaFilter} from "react-icons/fa";


    const ExpenseTable = () => {
        let  page:any ;
        // Sample data - replace with your actual data
        const initialExpenses = [
          {
            id: 'TXN001',
            date: '2024-01-15',
            description: 'Office Supplies',
            category: 'Business',
            amount: 250.00
          },
          {
            id: 'TXN002',
            date: '2024-01-16',
            description: 'Team Lunch',
            category: 'Food',
            amount: 120.50
          },
        ];
    const [expenses, setExpenses] = useState(initialExpenses);
  const [dateFilter, setDateFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

 const categories = [...new Set(initialExpenses.map(expense => expense.category))];
 
 const filteredExpenses = expenses.filter(expense => {
    const matchesDate = dateFilter ? expense.date.includes(dateFilter) : true;
    const matchesCategory = categoryFilter ? expense.category === categoryFilter : true;
    return matchesDate && matchesCategory;
  });
  const total = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
    return (
  
    
    <div className="bg-gray-800 min-h-96 w-full mt-6 rounded-xl p-6">
    <form className="space-y-6">
      <legend className="text-white text-xl font-semibold mb-4">{page==='income'?<p>All Incomes</p>:<p>All Expenses</p>} </legend>
      
      {/* Search and Filter Section */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex items-center">
          <FaSearch className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="date"
            className="bg-gray-700 text-white rounded-lg px-4 py-2"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            placeholder="Search by date..."
          />
        </div>
        
        <div className="flex items-center">
          <FaFilter className="w-5 h-5 text-gray-400 mr-2" />
          <select
            className="bg-gray-700 text-white rounded-lg px-4 py-2"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-200">
          <thead className="text-xs uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-tl-lg">
                Transaction ID
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3 rounded-tr-lg">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense.id} className="bg-gray-600 border-b border-gray-700 hover:bg-gray-500">
                <td className="px-6 py-4 font-medium whitespace-nowrap">
                  {expense.id}
                </td>
                <td className="px-6 py-4">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {expense.description}
                </td>
                <td className="px-6 py-4">
                  {expense.category}
                </td>
                <td className="px-6 py-4">
                  ${expense.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-700">
            <tr>
              <td colSpan={4} className="px-6 py-4 font-semibold text-right">
                Total:
              </td>
              <td className="px-6 py-4 font-semibold">
                ${total.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </form>
  </div>
);

    }






  
export default ExpenseTable