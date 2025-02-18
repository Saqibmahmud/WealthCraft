'use client'
import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaDownload } from "react-icons/fa";
import axios from 'axios';
import * as XLSX from 'xlsx';
import { getExpenses, getIncomes } from '../../lib/transactions';
import { useUser } from '@clerk/nextjs';

interface Expense {
  transactionId: string;
  transactionDate: string; // Already formatted as YYYY-MM-DD
  description: string;
  transactionCategory: string;
  ammount: number;
}

const IncomeTable = () => {
  const { user } = useUser();

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [dateFilter, setDateFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  
  const exportToExcel = () => {
   
    const exportData = filteredExpenses.map(expense => ({
      'Transaction ID': expense.transactionId,
      'Date': new Date(expense.transactionDate).toLocaleDateString(),
      'Description': expense.description,
      'Category': expense.transactionCategory,
      'Amount (Tk)': Number(expense.ammount).toFixed(2)
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    
    // Create workbook and add worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Income_Transactions');
    
    // Generate and download Excel file
    XLSX.writeFile(workbook, `Income_Transactions_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        if (user?.id) {
          const data = await getIncomes(user.id);
          if (Array.isArray(data)) {
            
            const transformedData: Expense[] = data.map((expense: any) => ({
              transactionId: expense.transactionId,
              transactionDate: new Date(expense.transactionDate)
                .toISOString()
                .split('T')[0],
              description: expense.description,
              transactionCategory: expense.transactionCategory,
              ammount: expense.ammount,
            }));
            setExpenses(transformedData);
          } else {
            setError('No data received from server');
          }
        } else {
          setError('User ID is not available');
        }
      } catch (err) {
        console.error('Error fetching expenses:', err);
        setError('Failed to fetch expenses');
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [user?.id]);


  
  const filteredExpenses = expenses.filter(expense => {
    const matchesDate = dateFilter 
      ? expense.transactionDate.includes(dateFilter) 
      : true;
    const matchesCategory = categoryFilter 
      ? expense.transactionCategory === categoryFilter 
      : true;
    return matchesDate && matchesCategory;
  });

  
  const total = filteredExpenses.reduce((sum, expense) => sum + expense.ammount, 0);

  if (loading) {
    return (
      <div className="bg-gray-800 min-h-[24rem] w-full mt-6 rounded-xl p-6">
        <p className="text-white text-center">Loading expenses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 min-h-[24rem] w-full mt-6 rounded-xl p-6">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 min-h-[24rem] w-full mt-6 rounded-xl p-6">
      <div className="space-y-6">
        <legend className="text-white text-xl font-semibold mb-4">
          All Fields
        </legend>

        <button 
            onClick={exportToExcel}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors "
            disabled={filteredExpenses.length === 0}
          >
            <FaDownload /> Export to Excel
          </button>
        
    
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center">
            <FaSearch className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="date"
              className="bg-gray-700 text-white rounded-lg px-4 py-2"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
          
          <div className="flex items-center">
           
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
                <tr 
                  key={expense.transactionId} 
                  className="bg-gray-600 border-b border-gray-700 hover:bg-gray-500"
                >
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    {expense.transactionId}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(expense.transactionDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {expense.description}
                  </td>
                  <td className="px-6 py-4">
                    {expense.transactionCategory}
                  </td>
                  <td className="px-6 py-4">
                    {Number(expense.ammount).toFixed(2)} Tk
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
                  {Number(total).toFixed(2)} Tk
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IncomeTable;
