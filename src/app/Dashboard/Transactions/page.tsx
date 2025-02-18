'use client'
import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaDownload } from "react-icons/fa";
import axios from 'axios';
import * as XLSX from 'xlsx';
import { useUser } from '@clerk/nextjs';
import AsideDashboard from '../../../../Components/Aside_Dashbar/page';

interface Transaction {
  transactionId: string;
  transactionDate: string; 
  description: string;
  transactionCategory: string;
  transactionType?: 'income' | 'expense' ;
  ammount: number;
}

export async function allTransactions(userid: string) {
  const res = await axios.get('http://localhost:3001/budget-tracking/all', { params: { userid } });
  return res.data;
}

const TransactionTable = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [dateFilter, setDateFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState<'income' | 'expense' | ''>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const exportToExcel = () => {
    const exportData = filteredTransactions.map(transaction => ({
      'Transaction ID': transaction.transactionId,
      'Date': new Date(transaction.transactionDate).toLocaleDateString(),
      'Description': transaction.description,
      'Category': transaction.transactionCategory,
      'Type': transaction.transactionType || 'Unknown',
      'Amount (Tk)': Number(transaction.ammount).toFixed(2)
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'All_Transactions');
    
    XLSX.writeFile(workbook, `All_Transactions_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!isLoaded) {
          console.log('Authentication is still loading');
          return;
        }

        if (!isSignedIn) {
          setError('Please sign in to view transactions');
          setLoading(false);
          return;
        }

        if (!user || !user.id) {
          setError('User information is not available');
          setLoading(false);
          return;
        }

        const data = await allTransactions(user.id);
        
        if (Array.isArray(data)) {
          const transformedData: Transaction[] = data.map((transaction: any) => ({
            transactionId: transaction.transactionId || 'N/A',
            transactionDate: transaction.transactionDate 
              ? new Date(transaction.transactionDate).toISOString().split('T')[0]
              : new Date().toISOString().split('T')[0],
            description: transaction.description || 'No Description',
            transactionCategory: transaction.transactionCategory || 'Uncategorized',
            transactionType: 
              transaction.transactionType === 'income' || transaction.transactionType === 'expense' 
                ? transaction.transactionType 
                : null, // Ensure only valid types are set
            ammount: Number(transaction.ammount) || 0,
          }));
          setTransactions(transformedData);
        } else {
          setError('No data received from server');
        }
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [isLoaded, isSignedIn, user?.id]);

  const categories = transactions.length > 0 
    ? [...new Set(transactions.map(transaction => transaction.transactionCategory))]
    : [];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesDate = dateFilter 
      ? transaction.transactionDate.includes(dateFilter) 
      : true;
    const matchesCategory = categoryFilter 
      ? transaction.transactionCategory === categoryFilter 
      : true;
    const matchesType = typeFilter 
      ? transaction.transactionType === typeFilter 
      : true;
    return matchesDate && matchesCategory && matchesType;
  });

  const total = filteredTransactions.reduce((sum, transaction) => sum + transaction.ammount, 0);

  // Loading state
  if (!isLoaded) {
    return (
      <div className="bg-gray-800 min-h-[24rem] w-full mt-6 rounded-xl p-6">
        <p className="text-white text-center">Loading authentication...</p>
      </div>
    );
  }

  // Not signed in state
  if (!isSignedIn) {
    return (
      <div className="bg-gray-800 min-h-[24rem] w-full mt-6 rounded-xl p-6">
        <p className="text-red-500 text-center">Please sign in to view transactions</p>
      </div>
    );
  }

  // Loading transactions state
  if (loading) {
    return (
      <div className="bg-gray-800 min-h-[24rem] w-full mt-6 rounded-xl p-6">
        <p className="text-white text-center">Loading transactions...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gray-800 min-h-[24rem] w-full mt-6 rounded-xl p-6">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className='flex'>
      <AsideDashboard/>
    <div className="bg-gray-800 min-h-[24rem] w-10/12 max-w-full mt-6 rounded-xl p-6">
      <div className="space-y-6">
        <legend className="text-white text-xl font-semibold mb-4">
          All Transactions
        </legend>

        <button 
          onClick={exportToExcel}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          disabled={filteredTransactions.length === 0}
        >
          <FaDownload /> Export to Excel
        </button>
        
        {/* Search and Filter Section */}
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

          <div className="flex items-center">
            <FaFilter className="w-5 h-5 text-gray-400 mr-2" />
            <select
              className="bg-gray-700 text-white rounded-lg px-4 py-2"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as 'income' | 'expense' | '')}
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
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
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 rounded-tr-lg">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr 
                  key={transaction.transactionId} 
                  className={`border-b border-gray-700 hover:bg-gray-500 ${
                    transaction.transactionType === 'income' 
                      ? 'bg-green-800/20' 
                      : transaction.transactionType === 'expense'
                      ? 'bg-red-800/20'
                      : 'bg-gray-800/20'
                  }`}
                >
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    {transaction.transactionId}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(transaction.transactionDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4">
                    {transaction.transactionCategory}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      transaction.transactionType === 'income' 
                        ? 'bg-green-500/20 text-green-400' 
                        : transaction.transactionType === 'expense'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {transaction.transactionType 
                        ? transaction.transactionType.toUpperCase() 
                        : 'UNKNOWN'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {Number(transaction.ammount).toFixed(2)} Tk
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-700">
              <tr>
                <td colSpan={5} className="px-6 py-4 font-semibold text-right">
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
    </div>
  );
};

export default TransactionTable;