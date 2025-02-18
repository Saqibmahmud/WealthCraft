import { useUser } from '@clerk/nextjs';
import React, { useState, useEffect } from 'react'
import { FaPlus } from "react-icons/fa";
import { createNewIncome } from '../../lib/transactions';

const IncomeSubmitionForm = () => {
  const { user } = useUser();
  const [ammount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
   

    if (!user) {
      alert('Please log in to add income');
      return;
    }

    setIsSubmitting(true);

    try {
      const userId = user.id;
      const category = "Income";
      const response = await createNewIncome(description, ammount, userId, category);
      
      alert(response);
      
      // Reset form
      setAmount(0);
      setDescription('');
    } catch (error) {
      console.error('Error creating income:', error);
      alert('Failed to add income. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4 bg-gray-700 p-6 rounded-lg">
      <h3 className="text-white text-lg font-semibold mb-4">Add New Income</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Description
          </label>
          <input
            type="text"
            required
            className="w-full bg-gray-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Category
          </label>
          <select
            required
            className="w-full bg-gray-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
            defaultValue="Income"
          >
            <option value="Income">Income</option>
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
            value={ammount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          <FaPlus className="w-4 h-4" />
          Add Income
        </button>
      </div>
    </form>
  )
}

export default IncomeSubmitionForm